import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Util } from '../../providers/util';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  private rootPage;
  private isLogged = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util
  ) {
    this.rootPage = HomePage;
  }

  ionViewDidLoad() {
    if (this.util.getPreference(this.util.constants.logged)) {
      this.isLogged = true;
    }
  }

  openPage(p){

  }

}
