import { Component, Input } from '@angular/core';
import { Blog } from '../../../core/models/blog.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.css',
})
export class DetailCardComponent {
  @Input({ required: true }) blog!: Blog;

  constructor(private router: Router) {}

  onSelectDetail() {
    console.log(this.blog._id, "hbjjjjjjjjjjjjj")
    this.router.navigate(['/details', this.blog?._id]);
  }


}
