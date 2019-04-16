import { HomePage } from './../home/home';
import { FirebaseServiceProvider } from './../../providers/firebase-service/firebase-service';
import { CommonProvider } from './../../providers/common/common';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private opt: string = 'signin';
  userData = {
    "email": "",
    "password": ""
  };

  regData = {
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "phone": "",
    "created_at": Date.now()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController, public common: CommonProvider,
    public firebaseService: FirebaseServiceProvider, public store: Storage,
    public fireauth: AngularFireAuth, public firedb: AngularFireDatabase) {

    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {

    this.common.startLoading();
    this.firebaseService.signinUser(this.userData).then((authData) => {
      // success
      var userId = this.fireauth.auth.currentUser.uid;
      this.firedb.database.ref('/users/' + userId).once('value', userSnapShot => {

        let response = JSON.parse(JSON.stringify(userSnapShot.val()));
        this.saveDetails(response);

      });
      this.setLoginKey(true);
      this.common.stopLoading();
      this.navCtrl.setRoot(HomePage);

    }, error => {
      this.common.stopLoading();
      this.common.showAlert(error);

    });

  }

  register() {

    if(this.regData.first_name == "" && this.regData.last_name == "" && this.regData.email &&
    this.regData.phone == "" && this.regData.password == ""){

      this.common.showAlert("All fields are required.");

    } else {

      this.common.startLoading();

      this.firebaseService.registerUser(this.regData).then((authData) => {
        // successful
        var userId = this.fireauth.auth.currentUser.uid;
        this.firedb.database.ref('/users/' + userId).once('value', userSnapShot => {
          let response = JSON.parse(JSON.stringify(userSnapShot.val()));
          this.saveDetails(response);
        });
        this.setLoginKey(true);
        // this.common.stopLoading();
        // this.navCtrl.setRoot(HomePage);
        this.common.presentToast("Successfully Registered. Please Login");

      }, error => {
        //error occrred
        this.common.stopLoading();
        this.common.showAlert(error);
      });

    }

  }

  setLoginKey(status) {
    return new Promise(resolve => {
      this.store
        .set("logged_in", status)
        .then(res => {
          resolve(true);
        })
        .catch(err => {
          console.error(err);
          resolve(false);
        });
    });
  }

  saveDetails(data: any) {

    this.store.set("user_details", data);
    // return new Promise(resolve => {

    //     // .then(res => {
    //     //   console.log("##########################");
    //     //   console.log(res);
    //     //   resolve(true);
    //     // })
    //     // .catch(err => {
    //     //   console.error(err);
    //     //   resolve(false);
    //     // });
    // });

  }


}
