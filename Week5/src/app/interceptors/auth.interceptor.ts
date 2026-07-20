import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieve the auth token from localStorage (or cookie in production)
  const token = localStorage.getItem('auth_token') ?? 'demo-token-12345';

  // Clone the request and attach the Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  console.log('[AuthInterceptor] Attaching token to request:', authReq.url);
  return next(authReq);
};
