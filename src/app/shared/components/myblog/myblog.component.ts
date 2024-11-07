import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Blog } from '../../../core/models/blog.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../../core/pipe/truncate.pipe';



@Component({
  selector: 'app-myblog',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './myblog.component.html',
  styleUrl: './myblog.component.css',
})
export class MyblogComponent {
  @Input({ required: true }) blog!: Blog;
  @Output() blogDeleted = new EventEmitter<boolean>(); // Create EventEmitter


  constructor(private router: Router) {}
  onSelectblog() {
    console.log(this.blog, "jkhkkk");

    this.router.navigate(['/details', this.blog?._id]);
  }

  onEdit(){
    this.router.navigate(['/update/blog', this.blog?._id], { replaceUrl: true })
  }

  onDelete(){
      this.blogDeleted.emit(true);
  }

}
