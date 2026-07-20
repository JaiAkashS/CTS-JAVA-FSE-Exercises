import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable()
export class NotificationService {
  /*
   * WHY Injectable() WITHOUT providedIn: 'root':
   *
   * NotificationService is decorated with @Injectable() but does NOT use providedIn: 'root'.
   * This means it is NOT registered in the root injector automatically — it must be explicitly
   * provided in a component's @Component.providers array (or in a module's providers array).
   *
   * This makes it a component-scoped service: each component that provides it in its @Component.providers
   * gets its own separate instance. This is the right choice when the service holds local UI state
   * (like notifications) that should NOT be shared globally across the app.
   */
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.notificationSubject.next({ message, type });
    setTimeout(() => this.clear(), 4000);
  }

  clear(): void {
    this.notificationSubject.next(null);
  }
}
