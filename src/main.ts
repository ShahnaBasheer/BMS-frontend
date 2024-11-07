import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { mergeApplicationConfig } from '@angular/core';
import { authConfig } from './app/features/auth/auth.config';
import { blogConfig } from './app/features/blogs/blogs.config';

const mergedConfig = mergeApplicationConfig(appConfig, authConfig, blogConfig);



bootstrapApplication(AppComponent, mergedConfig)
  .catch((err) => console.error(err));
