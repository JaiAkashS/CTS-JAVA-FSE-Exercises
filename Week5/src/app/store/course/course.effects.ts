import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import * as CourseActions from './course.actions';

@Injectable()
export class CourseEffects {
  /*
   * WHY inject() INSTEAD OF CONSTRUCTOR INJECTION:
   *
   * Class field initializers (like 'loadCourses$ = createEffect(...)') run BEFORE
   * the constructor body. When using constructor-parameter injection, the injected
   * values (this.actions$, this.courseService) are not yet assigned when the field
   * initializer executes, causing "this.actions$ is undefined".
   *
   * Using inject() resolves dependencies at field-initialization time (not constructor
   * time), so they are available when createEffect() runs.
   */
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );
}
