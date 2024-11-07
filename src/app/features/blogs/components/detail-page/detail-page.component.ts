import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../../../../core/models/blog.model';
import { CommonModule } from '@angular/common';
import { EditBlogComponent } from '../../../../shared/components/edit-blog/edit-blog.component';
import { DeleteAlertComponent } from '../../../../shared/components/delete-alert/delete-alert.component';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, EditBlogComponent,
     DeleteAlertComponent, PageLoaderComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css',
})

export class DetailPageComponent {
  @Input() blogId!: string;
  isEditable: boolean = false;
  isLoading: boolean = false;
  blog!: Blog;
  showDeleteModal: boolean = false;

  constructor(
    private router: Router,
    private blogservice: BlogService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (this.blogId) {
      this.loadBlogDetails(this.blogId);
    }
    console.log(this.blogId, "hjbbhjbjb")
  }
  loadBlogDetails(blogId: string) {
    this.isLoading = true;
    this.blogservice.getBlogDetail(blogId).subscribe({
      next: (res) => {
        this.blog = res.data?.blog as Blog;
        this.isLoading = false;
        if (res?.data?.user?.id === this.blog.author._id) {
          this.isEditable = true;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(
          err.error?.message ?? 'Something went wrong. Please try later'
        );
      },
    });
  }

  toggleEditblog() {
    this.router.navigate(['/update/blog', this.blog._id], {
      replaceUrl: true,
    });
  }

  // Handle save profile details
  onSaveblog() {
    this.toggleEditblog();
  }

  onEditedblog(data: Blog) {
    this.blog = data;
  }

  onDelete() {
    this.showDeleteModal = true;
  }

  onDeleteConfirm(isDeleted: boolean) {
    if (isDeleted) {
      this.deleteBlog(this.blog?._id || '');
    } else {
      console.log('Cancel to delete the Blog.');
    }
    this.showDeleteModal = false;
  }

  deleteBlog(blogId: string) {
    if (blogId) {
      this.blogservice.deleteBlog(blogId).subscribe({
        next: (res) => {
          this.toastr.success('Successfully Deleted the Blog');
        },
        error: (err) => {
          this.toastr.error(
            err.error?.message ?? 'Something went wrong. Please try later'
          );
        },
      });
    }
  }
}
