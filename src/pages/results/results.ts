import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CommonProvider } from '../../providers/common/common';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';


@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  results: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commom: CommonProvider, public firebaseService: FirebaseServiceProvider) {

      this.commom.startLoading();
      this.results = firebaseService.getResults().valueChanges();
      console.log(this.results);
      this.commom.stopLoading();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

}
