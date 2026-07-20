import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { HasUnsavedChanges } from '../../guards/unsaved-changes.guard';


@Component({
  selector: 'app-reactive-enrollment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment.component.html',
  styleUrl: './reactive-enrollment.component.css',
})
export class ReactiveEnrollmentFormComponent implements OnInit, HasUnsavedChanges {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Hands-On 5 Steps 49, 53, 55, 56: Building the reactive form
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '', 
        [Validators.required, Validators.email], 
        [this.simulateEmailCheck.bind(this)]
      ],
      courseId: [null, [Validators.required, this.noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // Hands-On 5 Step 57: Typed getter for FormArray
  /*
   * WHY A TYPED GETTER IS BETTER THAN CASTING IN TEMPLATE:
   *
   * 1. Type Safety: Returning 'FormArray' from the getter enables full TypeScript compilation checks
   *    and IDE auto-completion. Casting inside the HTML template (e.g. using 'as FormArray') is verbose, 
   *    un-typed, and easily prone to syntax/runtime errors.
   * 2. Clean Templates: It abstracts the underlying control retrieval path (i.e. .get('additionalCourses'))
   *    away from the template, keeping the template readable and simple.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Hands-On 5 Step 56: Add another course control to the FormArray
  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  // Hands-On 5 Step 56: Remove course control at specific index from the FormArray
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Hands-On 5 Step 53: Custom synchronous validator for course code
  noCourseCode(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && typeof value === 'string' && value.toUpperCase().startsWith('XX')) {
      return { noCourseCode: true };
    }
    // If it's a number, check if it starts with XX in string representation
    if (value && typeof value === 'number' && String(value).toUpperCase().startsWith('XX')) {
      return { noCourseCode: true };
    }
    return null;
  }

  // Hands-On 5 Step 55: Custom asynchronous validator simulating email check
  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const email = control.value;
        if (email && typeof email === 'string' && email.toLowerCase().includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
  }

  onSubmit(): void {
    /*
     * DIFFERENCE BETWEEN enrollForm.value AND enrollForm.getRawValue():
     *
     * - enrollForm.value retrieves the values of enabled controls only. If any control in the form group
     *   is disabled (e.g. control.disable()), its value is completely excluded from the resulting object.
     *
     * - enrollForm.getRawValue() retrieves the values of ALL controls inside the form group, 
     *   regardless of whether they are enabled or disabled. This is useful when you need to submit
     *   read-only or disabled input fields to the server.
     */
    console.log('enrollForm.value:', this.enrollForm.value);
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());
    console.log('enrollForm.valid:', this.enrollForm.valid);

    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  resetForm(): void {
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.additionalCourses.clear();
    this.submitted = false;
  }

  hasUnsavedChanges(): boolean {
    return this.enrollForm && this.enrollForm.dirty && !this.submitted;
  }
}
