import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { EnrollmentFormComponent } from './pages/enrollment-form/enrollment-form.component';
import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment/reactive-enrollment.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  // Default home route
  { path: '', component: HomeComponent, title: 'Home | Student Portal' },

  // Courses with nested child routes (Hands-On 7)
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    title: 'Courses | Student Portal',
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent }
    ]
  },

  // Student Profile protected by AuthGuard
  {
    path: 'profile',
    component: StudentProfileComponent,
    canActivate: [authGuard],
    title: 'Profile | Student Portal'
  },

  // Template-driven enrollment form with CanDeactivate guard
  {
    path: 'enroll',
    component: EnrollmentFormComponent,
    title: 'Enroll | Student Portal'
  },

  // Reactive enrollment form
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentFormComponent,
    canDeactivate: [unsavedChangesGuard],
    title: 'Reactive Enroll | Student Portal'
  },

  // Wildcard 404 route — must always be last
  { path: '**', component: NotFoundComponent, title: '404 | Student Portal' }
];
