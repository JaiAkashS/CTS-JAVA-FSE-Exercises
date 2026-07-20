import { selectAllCourses, selectCoursesLoading, selectCoursesError } from './course.selectors';
import { CourseState } from './course.reducer';
import { Course } from '../../models/course.model';


describe('Course Selectors', () => {
  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' }
  ];

  const mockState = {
    course: {
      courses: mockCourses,
      loading: true,
      error: 'Some error'
    }
  };

  it('selectAllCourses should return the courses array', () => {
    const result = selectAllCourses.projector(mockState.course as CourseState);
    expect(result).toEqual(mockCourses);
  });

  it('selectCoursesLoading should return loading state', () => {
    const result = selectCoursesLoading.projector(mockState.course as CourseState);
    expect(result).toBeTrue();
  });

  it('selectCoursesError should return error string', () => {
    const result = selectCoursesError.projector(mockState.course as CourseState);
    expect(result).toBe('Some error');
  });
});
