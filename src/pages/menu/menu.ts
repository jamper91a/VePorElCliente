import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Util } from '../../providers/util';
import { LoginPage } from '../login/login';
import { WelcomePage } from "../welcome/welcome";
import { HelpPage } from "../help/help";
import { InformationPage } from "../information/information";
import { MenuController } from 'ionic-angular';

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
  private informationPage;
  private helpPage;
  private isLogged = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public menuCtrl: MenuController,
  ) {
    this.rootPage = HomePage;
    this.loginPage = LoginPage;
    this.homePage = HomePage;
    this.informationPage = InformationPage;
    this.helpPage = HelpPage;
  }

  ionViewDidLoad() {
    if (this.util.getPreference(this.util.constants.logged)) {
      this.isLogged = true;
    }
  }

  public pushPage(p){
    this.menuCtrl.close();
    this.navCtrl.push(p);
  }

  public openPage(p){
    this.menuCtrl.close();
    this.rootPage = p;
  }

  logout(){

    this.util.clearAllData();
    this.rootPage = WelcomePage;
    this.menuCtrl.close();
  }

}
