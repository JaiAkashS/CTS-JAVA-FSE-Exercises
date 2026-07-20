import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CourseEffects } from './course.effects';
import { CourseService } from '../../services/course.service';
import * as CourseActions from './course.actions';
import { Course } from '../../models/course.model';

describe('CourseEffects', () => {
  let effects: CourseEffects;
  let actions$: Observable<any>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CourseService', ['getCourses', 'getCoursesSnapshot', 'getCourseById', 'addCourse']);

    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockActions(() => actions$),
        { provide: CourseService, useValue: spy }
      ]
    });

    effects = TestBed.inject(CourseEffects);
    courseServiceSpy = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
  });

  it('should dispatch loadCoursesSuccess on successful load', (done) => {
    courseServiceSpy.getCourses.and.returnValue(of(mockCourses));
    actions$ = of(CourseActions.loadCourses());

    effects.loadCourses$.subscribe(result => {
      expect(result).toEqual(CourseActions.loadCoursesSuccess({ courses: mockCourses }));
      done();
    });
  });

  it('should dispatch loadCoursesFailure on error', (done) => {
    courseServiceSpy.getCourses.and.returnValue(throwError(() => new Error('Server error')));
    actions$ = of(CourseActions.loadCourses());

    effects.loadCourses$.subscribe(result => {
      expect(result).toEqual(CourseActions.loadCoursesFailure({ error: 'Server error' }));
      done();
    });
  });
});
