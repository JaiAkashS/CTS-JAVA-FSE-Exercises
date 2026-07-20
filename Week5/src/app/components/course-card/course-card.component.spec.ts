import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let store: MockStore;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  const initialState = {
    course: { courses: [], loading: false, error: null },
    enrollment: { enrolledCourseIds: [] }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  // Step 102
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103
  it('should render course name from @Input', () => {
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(headerEl.textContent).toContain('Data Structures');
  });

  // Step 104
  it('should emit enrollRequested when Enroll button is clicked', () => {
    fixture.detectChanges();
    spyOn(component.enrollRequested, 'emit');
    spyOn(store, 'dispatch').and.callThrough();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBeGreaterThan(0);
    buttons[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Step 105
  it('should call ngOnChanges and log course changes', () => {
    spyOn(console, 'log');

    const prevCourse: Course = { id: 1, name: 'Old Course', code: 'CS100', credits: 3, gradeStatus: 'pending' };
    const newCourse: Course = { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' };

    component.ngOnChanges({
      course: new SimpleChange(prevCourse, newCourse, false)
    });

    expect(console.log).toHaveBeenCalled();
  });

  it('should show badge-passed for passed course', () => {
    fixture.detectChanges();
    const badge = fixture.debugElement.query(By.css('.badge-passed'));
    expect(badge).toBeTruthy();
  });
});
