import { enrollmentReducer, initialState, EnrollmentState } from './enrollment.reducer';
import * as EnrollmentActions from './enrollment.actions';

describe('enrollmentReducer', () => {
  it('should return initial state for an unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const state = enrollmentReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should add a courseId on enrollInCourse', () => {
    const action = EnrollmentActions.enrollInCourse({ courseId: 1 });
    const state = enrollmentReducer(initialState, action);
    expect(state.enrolledCourseIds).toContain(1);
    expect(state.enrolledCourseIds.length).toBe(1);
  });

  it('should not duplicate courseId on enrollInCourse', () => {
    const preState: EnrollmentState = { enrolledCourseIds: [1] };
    const action = EnrollmentActions.enrollInCourse({ courseId: 1 });
    const state = enrollmentReducer(preState, action);
    expect(state.enrolledCourseIds.length).toBe(1);
  });

  it('should remove a courseId on unenrollFromCourse', () => {
    const preState: EnrollmentState = { enrolledCourseIds: [1, 2, 3] };
    const action = EnrollmentActions.unenrollFromCourse({ courseId: 2 });
    const state = enrollmentReducer(preState, action);
    expect(state.enrolledCourseIds).not.toContain(2);
    expect(state.enrolledCourseIds.length).toBe(2);
  });

  it('should replace all courseIds on setEnrolledCourses', () => {
    const preState: EnrollmentState = { enrolledCourseIds: [1, 2] };
    const action = EnrollmentActions.setEnrolledCourses({ courseIds: [3, 4, 5] });
    const state = enrollmentReducer(preState, action);
    expect(state.enrolledCourseIds).toEqual([3, 4, 5]);
  });
});
