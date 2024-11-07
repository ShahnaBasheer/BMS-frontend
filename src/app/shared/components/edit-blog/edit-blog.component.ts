import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { isFieldInvalidator } from '../../../core/validators/forms.validator';
import { Blog, BlogFormData } from '../../../core/models/blog.model';
import { QuillModule } from 'ngx-quill';
import { Router } from '@angular/router';
import { PageLoaderComponent } from '../page-loader/page-loader.component';
import { BlogService } from '../../../features/blogs/services/blog.service';

@Component({
  selector: 'app-edit-Blog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule,
    PageLoaderComponent,
  ],
  templateUrl: './edit-Blog.component.html',
  styleUrl: './edit-Blog.component.css',
})
export class EditBlogComponent {
  blog!: Blog;
  @Input({ required: true }) isOpen: boolean = false;
  @Input({ required: true }) blogId: string = '';
  @Output() close = new EventEmitter<void>();
  isLoading: boolean = false;

  @Output() profileEmitter = new EventEmitter<Blog>();

  editBlogForm!: FormGroup;

  imageUrl: string | ArrayBuffer | null = null; // Store the uploaded image URL
  categories = [
    { label: 'Technology', value: 'Technology' },
    { label: 'Health', value: 'Health' },
    { label: 'Business', value: 'Business' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Lifestyle', value: 'Lifestyle' },
    { label: 'Education', value: 'Education' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Food', value: 'Food' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Science', value: 'Science' },
    { label: 'Politics', value: 'Politics' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Fashion', value: 'Fashion' },
  ];

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'], // remove formatting button
      ['link'],
    ],
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private blogservice: BlogService
  ) {
    this.editBlogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(400),
        ],
      ],
      category: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(200)]],
      image: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.blogservice.getBlogDetail(this.blogId).subscribe({
      next: (res) => {
        this.blog = res.data?.blog as Blog;
        this.imageUrl = this.blog.image;
        this.editBlogForm.patchValue(this.blog);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(
          err.error?.message ?? 'Something went wrong. Please try later'
        );
      },
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.editBlogForm, fieldName);
  }

  closeModal() {
    this.close.emit();
  }

  onCancel() {
    this.router.navigate(['/details', this.blogId], { replaceUrl: true });
  }

  onSave() {
    if (this.editBlogForm.invalid) {
      this.editBlogForm.markAsTouched();
      return;
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input?.files && input?.files?.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.editBlogForm.get('image')?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const controls = this.editBlogForm.controls;
    if (this.editBlogForm.valid) {
      this.isLoading = true;
      const formValue: BlogFormData = this.editBlogForm
        .value as BlogFormData;
      console.log(this.blogId, "ujjjjjjjjjjjjjjjj")
      formValue.blogId = this.blogId;
      this.blogservice.editBlog(formValue).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.toastr.success(res?.message);
          this.router.navigate(['/details', this.blogId], {
            replaceUrl: true,
          });
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error(
            err.error?.message ?? 'Something went wrong. Please try later!'
          );
        },
      });
    } else {
      this.editBlogForm.markAllAsTouched();
    }
  }
}
