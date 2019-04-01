import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Util } from '../../providers/util';
import { LoginPage } from '../login/login';
import { HelpPage } from "../help/help";
import { OptionsPage } from "../options/options";
import { InformationPage } from "../information/information";
import { FindPromotiosPage } from "../find-promotios/find-promotios";
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
  private optionsPage;
  private isLogged = false;
  private user:any = null;
  private points:string;
  private version='';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: Util,
    public menuCtrl: MenuController
  ) {
    this.rootPage = HomePage;
    this.loginPage = LoginPage;
    this.homePage = MenuPage;
    this.informationPage = InformationPage;
    this.helpPage = HelpPage;
    this.optionsPage = OptionsPage;
  }

  ionViewWillEnter() {
    if (this.util.getPreference(this.util.constants.logged)) {
      this.isLogged = true;
      this.user = JSON.parse(this.util.getPreference(this.util.constants.user));
      this.points = this.util.getPreference(this.util.constants.points);
      if(!this.points){
        this.points='0';
      }
    }
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
    //this.rootPage = WelcomePage;
    // this.navCtrl.setRoot(WelcomePage);
    this.menuCtrl.close();
    window.location.reload();
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

  go_home(){
    console.log("going home");
    this.navCtrl.setRoot(MenuPage);
  }

  go_login(){

  }

  update(){
    console.log("updating");
    this.points = this.util.getPreference(this.util.constants.points);
    if(!this.points){
      this.points='0';
    }
  }

}
