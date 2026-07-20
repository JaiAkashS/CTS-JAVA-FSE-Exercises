import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  // Hands-On 6 Step 67: Local component-level provider
  /*
   * COMPONENT-LEVEL PROVIDER EXPLANATION:
   *
   * By declaring NotificationService in the component's 'providers' array, we register
   * it at the component level. This tells Angular's Dependency Injection framework to
   * instantiate a NEW, separate instance of NotificationService specifically for this
   * component (and its children).
   *
   * This instance is completely isolated from any other NotificationService instances 
   * in the application. It also lifecycle-binds with this component, meaning it is
   * garbage collected when the component is destroyed.
   */
  providers: [NotificationService]
})
export class NotificationComponent implements OnInit {
  currentNotification: Notification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notif => {
      this.currentNotification = notif;
    });

    // Show a welcome notification on load
    this.notificationService.show('Welcome to the Student Course Portal!', 'info');
  }

  showInfo(msg: string): void {
    this.notificationService.show(msg, 'info');
  }

  showSuccess(msg: string): void {
    this.notificationService.show(msg, 'success');
  }

  showError(msg: string): void {
    this.notificationService.show(msg, 'error');
  }

  close(): void {
    this.notificationService.clear();
  }
}
