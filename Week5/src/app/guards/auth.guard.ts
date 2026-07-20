import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  /*
   * DIFFERENCE BETWEEN CanActivate AND CanDeactivate:
   *
   * CanActivate (this guard) is called BEFORE navigation enters a route.
   * It determines whether the user is ALLOWED to navigate TO a specific route.
   * Use cases: protecting routes from unauthenticated/unauthorized users (login gate).
   *
   * CanDeactivate is called BEFORE navigation LEAVES a route.
   * It determines whether the user is ALLOWED to navigate AWAY from the current route.
   * Use cases: warning a user about unsaved form changes before navigating away.
   */

  // Simulate checking login status via localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    return true;
  }

  // Redirect to home if not logged in, and store the attempted URL
  console.warn('[AuthGuard] Not logged in. Redirecting to home...');
  return router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
};
