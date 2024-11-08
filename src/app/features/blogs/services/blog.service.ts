import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Blog,
  BlogFormData,
  BlogResponse,
} from '../../../core/models/blog.model';

@Injectable()
export class  BlogService {
  constructor(private http: HttpClient) {}

  getDashboard(item: string): Observable<{ data: { blogs: Blog[], user: string, interests: string[] }, message: string }> {
    return this.http.get<{ data: { blogs: Blog[], user: string, interests: string[]}, message: string }>(`${environment.userUrl}/dashboard` ,{
      params: { interest: item },
      withCredentials: true,
    });
  }

  createBlog(data: BlogFormData): Observable<BlogResponse> {
    const formData = new FormData();
    formData.append('title', data?.title);
    formData.append('category', data?.category);
    formData.append('content', data?.content);
    formData.append('description', data?.description);

    const coverpic = data?.image;
    if (coverpic instanceof File) {
      formData.append('image', coverpic);
    }
    return this.http.post<BlogResponse>(
      `${environment.userUrl}/blog`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  getMyBlogs(): Observable<{ data: { blogs: Blog[], user: string}, message: string }> {
    return this.http.get<{ data: { blogs: Blog[], user: string}, message: string }>(`${environment.userUrl}/myblogs`, {
      withCredentials: true,
    });
  }

  getBlogDetail(blogId: string): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${environment.userUrl}/details/${blogId}`, {
      withCredentials: true,
    });
  }

  editBlog(data: BlogFormData): Observable<BlogResponse> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('category', data.category);
    formData.append('content', data.content);
    formData.append('description', data.description);
    formData.append('blogId', data?.blogId || '');

    const coverpic = data.image;
    if (coverpic instanceof File) {
      formData.append('image', coverpic);
    }
    return this.http.patch<BlogResponse>(
      `${environment.userUrl}/blog`,
      formData,
      {
        withCredentials: true,
      }
    );
  }

  deleteBlog(blogId: string): Observable<BlogResponse> {
    return this.http.delete<BlogResponse>(
      `${environment.userUrl}/blog/${blogId}`,
      {
        withCredentials: true,
      }
    );
  }
}
