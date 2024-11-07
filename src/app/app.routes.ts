import { Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UserComponent } from './shared/components/user/user.component';
import { DashboardComponent } from './features/blogs/components/dashboard/dashboard.component';
import { DetailPageComponent } from './features/blogs/components/detail-page/detail-page.component';
import { CreateComponent } from './features/blogs/components/create/create.component';
import { MyblogspageComponent } from './features/blogs/components/myblogspage/myblogspage.component';
import { OtpVerificationComponent } from './features/auth/components/otp-verification/otp-verification.component';
import { InterestedTopicsComponent } from './features/blogs/components/interested-topics/interested-topics.component';
import { ProfileComponent } from './features/auth/components/profile/profile.component';
import { AuthGuard } from './core/guards/auth.guard';
import { EditBlogComponent } from './shared/components/edit-blog/edit-blog.component';



export const routes: Routes = [
  { path: '', component: UserComponent, canActivateChild: [ AuthGuard ], children: [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'details/:blogId', component: DetailPageComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'myblogs', component: MyblogspageComponent},
    { path: 'create', component: CreateComponent },
    { path: 'update/blog/:blogId', component: EditBlogComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'interested/topics', component: InterestedTopicsComponent, canActivate: [AuthGuard] },
  { path: 'otp-verification', component: OtpVerificationComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];



