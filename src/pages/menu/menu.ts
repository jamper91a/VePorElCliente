import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Util } from '../../providers/util';
import { LoginPage } from '../login/login';
import { WelcomePage } from "../welcome/welcome";
import { HelpPage } from "../help/help";
import { OptionsPage } from "../options/options";
import { InformationPage } from "../information/information";
import { FindPromotiosPage } from "../find-promotios/find-promotios";
import { MenuController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

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
  private optionsPage;
  private isLogged = false;
  private user:any;
  private version='';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public menuCtrl: MenuController,
    private appVersion: AppVersion
  ) {
    this.rootPage = HomePage;
    this.loginPage = LoginPage;
    this.homePage = MenuPage;
    this.informationPage = InformationPage;
    this.helpPage = HelpPage;
    this.optionsPage = OptionsPage;
  }

  ionViewDidLoad() {
    if (this.util.getPreference(this.util.constants.logged)) {
      this.isLogged = true;
      this.user = JSON.parse(this.util.getPreference(this.util.constants.user));
    }

    this.version= '1.8.0'
  }

  public pushPage(p){

    this.menuCtrl.close();
    this.navCtrl.push(p);
  }

  public openPage(p){
    this.menuCtrl.close();
    //this.rootPage = p;
    this.navCtrl.setRoot(p);
  }

  logout(){
    this.util.clearAllData();
    this.rootPage = WelcomePage;
    // this.navCtrl.setRoot(WelcomePage);
    this.menuCtrl.close();
  }

  go_to_offers(){
    this.navCtrl.push(FindPromotiosPage,{
      "type_find_promotio": this.util.constants.find_promotion_by_user_id
    })
  }
  go_to_information_page(option){
    this.navCtrl.push(this.informationPage,{
      "option": option
    })
  }

}
