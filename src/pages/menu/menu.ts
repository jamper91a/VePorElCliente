import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Util } from '../../providers/util';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  private rootPage;
  private loginPage;
  private homePage;
  private isLogged = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util
  ) {
    this.rootPage = HomePage;
    this.loginPage = LoginPage;
    this.homePage = HomePage;
  }

  ionViewDidLoad() {
    if (this.util.getPreference(this.util.constants.logged)) {
      this.isLogged = true;
    }
  }

  openPage(p){
    this.rootPage = p;
  }

}
