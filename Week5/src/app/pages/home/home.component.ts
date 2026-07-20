import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';


@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit, OnDestroy {
  // Interpolation binding property
  portalName = 'Student Course Portal';
  
  // Property binding property
  isPortalActive = true;
  
  // Event binding output message
  message = '';
  
  // Two-way binding property
  searchTerm = '';
  
  // Stats (hardcoded initially, will be driven by service later)
  coursesCount = 0;
  enrolledCount = 0;
  gpa = 3.8;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  /*
   * DIFFERENCE BETWEEN [property] AND [(ngModel)]:
   *
   * [property] is one-way data binding (component -> DOM). 
   * It binds a component property to an HTML element's property. 
   * Changes in the component update the DOM, but user inputs in the DOM do not update the component.
   *
   * [(ngModel)] is two-way data binding (DOM <-> component).
   * It combines property binding and event binding (shorthand for [ngModel]="prop" (ngModelChange)="prop=$event").
   * Changes in the component update the DOM, and user inputs/actions in the DOM automatically 
   * update the component property in real-time.
   */

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  ngOnInit(): void {
    this.coursesCount = this.courseService.getCoursesSnapshot().length;
    this.enrolledCount = this.enrollmentService.getEnrolledCount();
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }
}
