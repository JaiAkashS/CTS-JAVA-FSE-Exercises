import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCount(): number {
    return this.enrolledCourseIds.length;
  }

  getEnrolledCourses(): Course[] {
    const allCourses = this.courseService.getCoursesSnapshot();
    return allCourses.filter(course => this.enrolledCourseIds.includes(course.id));
  }
}
