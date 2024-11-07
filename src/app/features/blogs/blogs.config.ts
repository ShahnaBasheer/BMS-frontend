import { ApplicationConfig } from "@angular/core";
import { BlogService } from "./services/blog.service";



export const blogConfig: ApplicationConfig = {
  providers: [
    BlogService
  ],
};
