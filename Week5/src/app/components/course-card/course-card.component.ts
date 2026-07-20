import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe, HighlightDirective, RouterLink],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Input() isEnrolledOverride: boolean | null = null;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded: boolean = false;
  enrolledIds$: Observable<number[]>;

  // Injecting NgRx Store (Hands-On 9 Step 100)
  constructor(private store: Store) {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log('CourseCardComponent course changed:', {
        previous: prev,
        current: curr
      });
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnroll(): void {
    // Dispatch action to toggle enrollment status in the NgRx store
    this.enrolledIds$.pipe(take(1)).subscribe(ids => {
      const isEnrolled = ids.includes(this.course.id);
      if (isEnrolled) {
        this.store.dispatch(EnrollmentActions.unenrollFromCourse({ courseId: this.course.id }));
      } else {
        this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
      }
      this.enrollRequested.emit(this.course.id);
    });
  }

  get cardClasses() {
    // We can evaluate classes dynamically or using async pipe in template
    return {
      'card-full-credits': this.course && this.course.credits >= 4
    };
  }
}
