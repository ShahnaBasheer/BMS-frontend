import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { DetailCardComponent } from '../../../../shared/components/detail-card/detail-card.component';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { Blog } from '../../../../core/models/blog.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ DetailCardComponent, CommonModule, PageLoaderComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  blogs: Blog[] = [];
  isLoading: boolean = false;
  constructor(
    private blogservice: BlogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.blogservice.getDashboard().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.blogs = res.data?.blogs || [];

      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(
          err.error?.message ?? 'Something went wrong.Please Try Later'
        );
      },
    });
  }


}
