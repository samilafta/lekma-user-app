import { ResultsPage } from './../results/results';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { LoginPage } from './../login/login';
import { CommonProvider } from './../../providers/common/common';
import { NotificationPage } from './../notification/notification';
import { BookingPage } from './../booking/booking';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userInfo: any = {};

  constructor(public navCtrl: NavController, public common: CommonProvider,
     public firebaseService: FirebaseServiceProvider, public fireauth: AngularFireAuth,
     public firedb: AngularFireDatabase) {

      var userId = this.fireauth.auth.currentUser.uid;
      this.firedb.database.ref('/users/' + userId).once('value', userSnapShot => {
         this.userInfo = userSnapShot.val();
      });

  }

  openBooking(){
    this.navCtrl.push(BookingPage);
  }

  openNotifications() {
    this.navCtrl.push(NotificationPage);
  }

  openResults() {
    this.navCtrl.push(ResultsPage);
  }

  logout() {

    this.common.startLoading();

    this.firebaseService.signoutUser().then(() => {
       // this.setLoginKey(false);
      this.navCtrl.setRoot(LoginPage);
      this.common.stopLoading();

    },function(error) {
      this.common.stopLoading();
      this.common.alert(error);
    });



    // this.removeUserDetails();


  }

  // setLoginKey(status) {
  //   return new Promise(resolve => {
  //     this.storage
  //       .set("logged_in", status)
  //       .then(res => {
  //         resolve(true);
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         resolve(false);
  //       });
  //   });
  // }



}
