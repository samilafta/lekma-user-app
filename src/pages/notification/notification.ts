import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { CommonProvider } from './../../providers/common/common';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  notifications: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commom: CommonProvider, public firebaseService: FirebaseServiceProvider) {

      this.commom.startLoading();
      this.notifications = firebaseService.getNotifications().valueChanges();
      console.log(this.notifications);
      this.commom.stopLoading();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }



}
