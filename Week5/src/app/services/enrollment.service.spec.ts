import { TestBed } from '@angular/core/testing';
import { EnrollmentService } from './enrollment.service';
import { CourseService } from './course.service';

describe('EnrollmentService', () => {
  let service: EnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrollmentService, CourseService]
    });
    service = TestBed.inject(EnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no enrollments', () => {
    expect(service.getEnrolledCount()).toBe(0);
  });

  it('should enroll a course', () => {
    service.enroll(1);
    expect(service.isEnrolled(1)).toBeTrue();
    expect(service.getEnrolledCount()).toBe(1);
  });

  it('should not enroll the same course twice', () => {
    service.enroll(1);
    service.enroll(1);
    expect(service.getEnrolledCount()).toBe(1);
  });

  it('should unenroll a course', () => {
    service.enroll(1);
    service.unenroll(1);
    expect(service.isEnrolled(1)).toBeFalse();
    expect(service.getEnrolledCount()).toBe(0);
  });

  it('should return enrolled course objects', () => {
    service.enroll(1);
    service.enroll(3);
    const enrolledCourses = service.getEnrolledCourses();
    expect(enrolledCourses.length).toBe(2);
    expect(enrolledCourses.map(c => c.id)).toEqual([1, 3]);
  });

  it('should return empty array when no courses enrolled', () => {
    const courses = service.getEnrolledCourses();
    expect(courses).toEqual([]);
  });
});
