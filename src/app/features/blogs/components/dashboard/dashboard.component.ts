import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { DetailCardComponent } from '../../../../shared/components/detail-card/detail-card.component';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { Blog } from '../../../../core/models/blog.model';
import { HeaderComponent } from "../../../../shared/components/header/header.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DetailCardComponent, CommonModule, PageLoaderComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent {
  blogs: Blog[] = [];
  interests: string[] = [];
  intrst: string = '';
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
  onSelectInterest(item: string){
      this.intrst = item;
      this.page = 1;
      this.size = 10;
      this.blogs = [];
      this.hasMoreBlogs = true;
      this.loadMoreBlogs();
  }


  loadMoreBlogs() {
    this.isLoading = true;

    this.blogservice.getDashboard(this.intrst, this.page, this.size).subscribe({
      next: (res) => {
        if (res.data?.blogs?.length > 0) {
          this.blogs.push(...res.data?.blogs)
          this.interests = res.data?.interests || [];
          this.page++;
        } else {
          this.hasMoreBlogs = false; // No more blogs to load
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(
          err.error?.message ?? 'Something went wrong.Please Try Later'
        );
      }
    })
  }
}




