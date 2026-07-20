import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // In-memory data store — represents the mock back-end (Hands-On 6 & 9)
  private courses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Introduction to Database Systems', code: 'CS102', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Object-Oriented Programming', code: 'CS103', credits: 3, gradeStatus: 'passed' },
    { id: 4, name: 'Web Application Development', code: 'CS104', credits: 4, gradeStatus: 'pending' },
    { id: 5, name: 'Software Engineering Principles', code: 'CS105', credits: 3, gradeStatus: 'failed' }
  ];

  /**
   * Returns all courses as an Observable<Course[]>.
   * A 300ms delay simulates a real HTTP call and works with NgRx Effects.
   * For synchronous access, subscribe or use .pipe(take(1)).
   */
  getCourses(): Observable<Course[]> {
    return of(this.courses).pipe(delay(300));
  }

  /** Synchronous snapshot — used by services or helpers that don't use the store. */
  getCoursesSnapshot(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
