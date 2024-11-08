import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})

export class UserComponent {
  selected = '';
  menues = [
    { name: 'Dashboard', icon: 'fas fa-home', path: '/dashboard' },
    { name: 'Profile', icon: 'fas fa-user', path: '/profile' },
    { name: 'My Blogs', icon: 'fa-solid fa-newspaper', path: '/myblogs' },
    { name: 'Create', icon: 'fa-solid fa-circle-plus', path: '/create' },
    { name: 'Logout', icon: 'fas fa-sign-out-alt', path: '/logout' },
  ];
  isSidebarOpen: boolean = false;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(){
    this.selected = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.selected = event.url;
      });
  }

  onMenuClick(menu: { name: string, icon: string, path: string },) {
    if (menu.path === '/logout') {
      this.authservice.logout().subscribe({
        next: (res) => {
          this.toastr.success(res?.message);
          this.router.navigate(['/login'], { replaceUrl: true });
        },
        error: (err) => {
          this.toastr.error(
            err.error?.message ?? 'Something went wrong. Please Try Later!'
          );
        },
      });
    } else {
      this.router.navigate([menu.path]); // Navigate to the selected path
    }
    this.isSidebarOpen = false;
    this.selected = menu.path;
  }

  // Close sidebar when clicking outside of it on mobile
  // @HostListener('document:click', ['$event'])
  // closeSidebar(event: Event) {
  //   const target = event.target as HTMLElement;
  //   const sidebarElement = document.getElementById('sidebar');
  //   const buttonElement = target.closest('button');

  //   if (sidebarElement && buttonElement === null && !sidebarElement.contains(target) && window.innerWidth < 1024) {
  //     this.isSidebarOpen = false;
  //   }
  // }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
