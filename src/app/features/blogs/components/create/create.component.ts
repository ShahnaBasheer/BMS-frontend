import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { isFieldInvalidator } from '../../../../core/validators/forms.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  Blog,
  BlogFormData,
} from '../../../../core/models/blog.model';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { BlogService } from '../../services/blog.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    QuillModule,
    CommonModule,
    PageLoaderComponent,
    HeaderComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  blogForm!: FormGroup;
  isLoading: boolean = false;
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
    private blogservice: BlogService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
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

  // Handle file input change

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input?.files && input?.files?.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.blogForm.get('image')?.patchValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    return isFieldInvalidator(this.blogForm, fieldName);
  }

  onReset() {
    this.blogForm.reset();
  }

  onSubmit() {
    const controls = this.blogForm.controls;
    if (this.blogForm.valid) {
      this.isLoading = true;
      // Cast the form value as a Partial<User> since not all fields might be sent
      const formValue: BlogFormData = this.blogForm
        .value as BlogFormData;

      this.blogservice.createBlog(formValue).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.toastr.success(res?.message);
          this.router.navigate(['/myblogs']);
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error(
            err.error?.message ?? 'Something went wrong. Please try later!'
          );
        },
      });
    } else {
      this.blogForm.markAllAsTouched();
    }
  }
}
