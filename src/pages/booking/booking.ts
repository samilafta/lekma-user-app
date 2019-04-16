import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { CommonProvider } from './../../providers/common/common';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  bookData = {
    "book_date": "",
    "book_session": "",
    "lab_type": ""
  }

  bDate: any = "";
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public common: CommonProvider, public firebaseService: FirebaseServiceProvider,
    public fireauth: AngularFireAuth, public firedb: AngularFireDatabase) {

      var userId = this.fireauth.auth.currentUser.uid;
      this.firedb.database.ref('/users/' + userId).once('value', userSnapShot => {
        this.userInfo = userSnapShot.val();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  submitBooking(first_name, last_name, phone) {

    this.bookData['user_name'] = first_name + " " + last_name;
    this.bookData['user_phone'] = phone;

    this.firebaseService.addRequest(this.bookData)
    .then(() => {
      // successfull
      this.common.stopLoading();
      this.common.showAlert("Request Sent To Lab Technicians. Check your Notifications for update.");
      this.bookData.book_date = "";
      this.bookData.book_session = "";
      this.bookData.lab_type = "";

    }, (err) => {
      this.common.stopLoading();
      this.common.showAlert(err);
    });


  }

}
