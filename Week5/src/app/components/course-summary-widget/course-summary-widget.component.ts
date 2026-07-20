import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { selectAllCourses } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import * as CourseActions from '../../store/course/course.actions';

interface WidgetStats {
  totalCourses: number;
  totalCredits: number;
  enrolledCount: number;
}

@Component({
  selector: 'app-course-summary-widget',
  imports: [CommonModule],
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css',
})
export class CourseSummaryWidgetComponent {
  stats$: Observable<WidgetStats>;

  constructor(private store: Store) {
    // Combine multiple store slices into a single stats observable
    this.stats$ = combineLatest([
      this.store.select(selectAllCourses),
      this.store.select(selectEnrolledIds)
    ]).pipe(
      map(([courses, enrolledIds]) => ({
        totalCourses: courses.length,
        totalCredits: courses.reduce((sum, c) => sum + c.credits, 0),
        enrolledCount: enrolledIds.length
      }))
    );
  }

  addNewDemoCourse(): void {
    // Dispatching a load action triggers the effect to refresh courses
    this.store.dispatch(CourseActions.loadCourses());
  }
}
