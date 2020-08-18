import { Component } from '@angular/core';
import { Plugins, LocalNotificationPendingList } from '@capacitor/core';
import * as moment from 'moment';

const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public notificationsList: INotification[];

  private delaySlotMinutes = 10;

  constructor() {
    this.notificationsList = [];
  }

  public async scheduleNotifications(): Promise<void> {
    this.notificationsList = [];

    // Add some local notifications to schedule
    for (let i = 0; i < 4; i++) {
      const at: Date = i === 0
        ? moment().add(20, 'second').toDate()
        : moment().add(this.delaySlotMinutes * i, 'minute').toDate();
      const notification: INotification = {
        id: i,
        title: `Title ${i}`,
        body: `Close me without open the app`,
        priority: 2,
        vibrate: true,
        silent: false,
        foreground: true,
        sound: 'default',
        schedule: { at }
      };

      this.notificationsList.push(notification);

      // Request permissions
      await LocalNotifications.requestPermission();

      // Remove old notifications
      const pendingNotifications: LocalNotificationPendingList = await LocalNotifications.getPending();

      if (pendingNotifications.notifications.length > 0) {
        await LocalNotifications.cancel(pendingNotifications);
      }

      // Schedule new notifications
      await LocalNotifications.schedule({ notifications: this.notificationsList });
    }
  }

  public buildDate(date: Date): string {
    return moment(date).format('hh:mm:ss');
  }
}

interface ISchedule {
  at: Date;
}

interface INotification {
  id: number;
  title: string;
  body: string;
  priority: number;
  vibrate: boolean;
  silent: boolean;
  foreground: boolean;
  sound: string;
  schedule: ISchedule;
}
