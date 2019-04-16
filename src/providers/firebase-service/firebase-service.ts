import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseServiceProvider {

  userInfo: any;
  constructor(public firedb: AngularFireDatabase, public fireauth: AngularFireAuth) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

 //function to register new user to firebase database
 registerUser(data: any) {
  return this.fireauth.auth.createUserWithEmailAndPassword(data['email'], data['password']).then((user) => {
    // sign in user
    this.fireauth.auth.signInWithEmailAndPassword(data['email'], data['password']).then((authenticatedUser) => {
      // add user details to database
      // var userId = this.fireauth.auth.currentUser.uid;
      data['uid'] = authenticatedUser.user.uid;
      this.firedb.database.ref('users').child(authenticatedUser.user.uid).set(data);
      // send sms to user for successful registration
      // this.sendSms("Tow App", msg);

    });
  });
}

// function to sign in user
signinUser(data) {
  return this.fireauth.auth.signInWithEmailAndPassword(data['email'], data['password']).then((auth) => {
  });
}

// function to log out user
signoutUser() {
  return this.fireauth.auth.signOut();
}

// create request between user and driver
addRequest(data: any) {
  var userId = this.fireauth.auth.currentUser.uid;

  return this.firedb.database.ref("requests").push({
    user_id: userId,
    user_name: data['user_name'],
    user_phone: data['user_phone'],
    book_date: data['book_date'],
    book_session: data['book_session'],
    lab_type: data['lab_type'],
    status: "pending",
    created_at: Date.now()
  });

}

getNotifications() {
  var userId = this.fireauth.auth.currentUser.uid;
  return this.firedb.list("/requests", ref => ref.orderByChild("user_id").equalTo(userId));
}

getResults() {
  var userId = this.fireauth.auth.currentUser.uid;
  return this.firedb.list("/lab_results", ref => ref.orderByChild("user_id").equalTo(userId));
}



}


// "rxjs": "^5.5.12",
