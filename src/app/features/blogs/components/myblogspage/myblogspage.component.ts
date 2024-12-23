import { Component } from '@angular/core';
import { Blog } from '../../../../core/models/blog.model';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DeleteAlertComponent } from '../../../../shared/components/delete-alert/delete-alert.component';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { MyblogComponent } from '../../../../shared/components/myblog/myblog.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-myblogspage',
  standalone: true,
  imports: [
    MyblogComponent,
    CommonModule,
    HeaderComponent,
    DeleteAlertComponent,
    PageLoaderComponent,
  ],
  templateUrl: './myblogspage.component.html',
  styleUrl: './myblogspage.component.css',
})
export class MyblogspageComponent {
  blogs: Blog[] = [];
  showDeleteModal: boolean = false;
  deleteIndex: number = -1;
  categories: string[] = [];
  category: string = '';
  isLoading: boolean = false;
  page: number = 1;
  size: number = 10;
  hasMoreBlogs = true;

  constructor(
    private blogservice: BlogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMoreBlogs();
  }

  onSelectInterest(item: string) {
    this.category = item;
    this.page = 1;
    this.size = 10;
    this.blogs = [];
    this.hasMoreBlogs = true;
    this.loadMoreBlogs();
  }

  onDeleteConfirm(isDeleted: boolean) {
    if (isDeleted) {
      const blog = this.blogs[this.deleteIndex];
      this.deleteblog(blog?._id || '');
    } else {
      console.log('Cancel to delete the blog.');
    }
    this.showDeleteModal = false;
  }

  onDeleteAlert(data: boolean, index: number) {
    this.showDeleteModal = true;
    this.deleteIndex = index;
  }

  deleteblog(blogId: string) {
    if (blogId) {
      this.blogservice.deleteBlog(blogId).subscribe({
        next: (res) => {
          this.blogs.splice(this.deleteIndex, 1);
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

  loadMoreBlogs() {
    this.isLoading = true;
    this.blogservice.getMyBlogs(this.category, this.page, this.size).subscribe({
      next: (res) => {
        this.categories = res.data?.categories;
        if (res.data?.blogs?.length > 0) {
          this.blogs.push(...res.data?.blogs);
          this.page++;
        } else {
          this.hasMoreBlogs = false; // No more blogs to load
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(
          err.error?.message ?? 'Something went wrong! Try again Later'
        );
      },
    });
  }
}
