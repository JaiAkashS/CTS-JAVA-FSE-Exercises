import { courseReducer, initialState, CourseState } from './course.reducer';
import * as CourseActions from './course.actions';
import { Course } from '../../models/course.model';

describe('courseReducer', () => {
  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Databases', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  it('should return the initial state for an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const state = courseReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should set loading=true on loadCourses', () => {
    const action = CourseActions.loadCourses();
    const state = courseReducer(initialState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should set courses and loading=false on loadCoursesSuccess', () => {
    const loadingState: CourseState = { ...initialState, loading: true };
    const action = CourseActions.loadCoursesSuccess({ courses: mockCourses });
    const state = courseReducer(loadingState, action);
    expect(state.courses.length).toBe(2);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set error and loading=false on loadCoursesFailure', () => {
    const loadingState: CourseState = { ...initialState, loading: true };
    const action = CourseActions.loadCoursesFailure({ error: 'Network Error' });
    const state = courseReducer(loadingState, action);
    expect(state.loading).toBeFalse();
    expect(state.error).toBe('Network Error');
    expect(state.courses.length).toBe(0);
  });
});
