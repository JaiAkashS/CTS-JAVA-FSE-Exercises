import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { take } from 'rxjs/operators';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 5 courses via observable', (done) => {
    service.getCourses().pipe(take(1)).subscribe(courses => {
      expect(courses.length).toBe(5);
      done();
    });
  });

  it('should return courses synchronously via getCoursesSnapshot()', () => {
    const courses = service.getCoursesSnapshot();
    expect(courses.length).toBe(5);
    expect(courses[0].name).toBe('Data Structures & Algorithms');
  });

  it('should find a course by id', () => {
    const course = service.getCourseById(1);
    expect(course).toBeDefined();
    expect(course?.name).toBe('Data Structures & Algorithms');
  });

  it('should return undefined for an invalid id', () => {
    const course = service.getCourseById(9999);
    expect(course).toBeUndefined();
  });

  it('should add a new course', () => {
    const newCourse: Course = { id: 99, name: 'Test Course', code: 'TC01', credits: 2, gradeStatus: 'pending' };
    service.addCourse(newCourse);
    const courses = service.getCoursesSnapshot();
    expect(courses.length).toBe(6);
    expect(courses.find(c => c.id === 99)).toBeTruthy();
  });
});
