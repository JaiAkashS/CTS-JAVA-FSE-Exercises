import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';


@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, CreditLabelPipe, RouterLink],

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent implements OnInit {
  courseId: number = 0;
  
  // Mock data - in Hands-On 8 this will be fetched from CourseService via HTTP
  course: Course | null = null;
  
  private mockCourses: Course[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Introduction to Database Systems', code: 'CS102', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Object-Oriented Programming', code: 'CS103', credits: 3, gradeStatus: 'passed' },
    { id: 4, name: 'Web Application Development', code: 'CS104', credits: 4, gradeStatus: 'pending' },
    { id: 5, name: 'Software Engineering Principles', code: 'CS105', credits: 3, gradeStatus: 'failed' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Hands-On 7 Step 75: Reading a route parameter
    this.route.params.subscribe(params => {
      this.courseId = Number(params['id']);
      this.course = this.mockCourses.find(c => c.id === this.courseId) ?? null;
    });

    // Hands-On 7: Reading a query parameter
    this.route.queryParams.subscribe(query => {
      console.log('Query params:', query);
    });
  }
}
