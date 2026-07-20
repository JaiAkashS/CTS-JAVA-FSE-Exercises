import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let userMessage = 'An unexpected error occurred.';

      if (error.status === 0) {
        // Network error or server is not reachable
        userMessage = '⚠️ Cannot connect to server. Please check your connection.';
      } else if (error.status === 401) {
        userMessage = '🔒 Unauthorized. Please log in again.';
      } else if (error.status === 403) {
        userMessage = '🚫 Access denied. You do not have permission.';
      } else if (error.status === 404) {
        userMessage = '🔍 Resource not found.';
      } else if (error.status >= 500) {
        userMessage = '🔥 Server error. Please try again later.';
      }

      console.error('[ErrorHandlerInterceptor]', userMessage, error);

      // Re-throw as a new error for downstream handlers
      return throwError(() => new Error(userMessage));
    })
  );
};
