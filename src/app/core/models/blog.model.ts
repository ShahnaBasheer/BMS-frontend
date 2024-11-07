

// shared/models/Blog.model.ts

import { User } from "./user.model";


interface Blog {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: User;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}


interface BlogFormData {
  title: string;
  category: string;
  content: string;
  description: string;
  blogId?: string;
  image?: File; // Optional if an image is not always provided
}


interface BlogResponse {
  message: string;
  data: {
    blog?: Blog;
    user?: User;
  }

}


export type { Blog, BlogFormData, BlogResponse };
