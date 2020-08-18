import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public notificationsList: INotification[];

  private delaySlotMinutes = 5;

  constructor() {
    this.notificationsList = [];
  }

  public scheduleNotifications(): void {
    this.notificationsList = [];

    // Schedule some local notifications
    for (let i = 0; i < 4; i++) {
      const notification: INotification = {
        id: i,
        title: `Title ${i}`,
        body: `Close me without open the app`,
        priority: 2,
        vibrate: true,
        silent: false,
        foreground: true,
        sound: 'default',
        schedule: {
          at: moment().add(this.delaySlotMinutes * (i + 1), 'minute').toDate()
        }
      };

      this.notificationsList.push(notification);
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
