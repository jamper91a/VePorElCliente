import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import { TranslateService } from '@ngx-translate/core';
import { Util } from '../../providers/util';
import { HomePage } from '../home/home';
import {MenuPage} from "../menu/menu";
import {User} from "../../providers/user";



export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  private account: { username: string, password: string, push_code: string } = {
    username: '',
    password: '',
    push_code: ''
  };
  private messages;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController, translate: TranslateService,
    public util : Util,
    public user: User,
  ) {
    this.util.savePreference(this.util.constants.language,navigator.language.split('-')[0]);
    //Valido si ya vio o no el tutorial
      if (!this.util.getPreference(this.util.constants.tutorial)) {
        translate.get(["TUTORIAL_SLIDE1_TITLE",
          "TUTORIAL_SLIDE1_DESCRIPTION",
          "TUTORIAL_SLIDE2_TITLE",
          "TUTORIAL_SLIDE2_DESCRIPTION",
          "TUTORIAL_SLIDE3_TITLE",
          "TUTORIAL_SLIDE3_DESCRIPTION",
          'LOGIN_ERROR', 'SERVER_ERROR','validando_informacion'
        ]).subscribe(
          (values) => {
            this.messages=values;
            this.slides = [
              {
                title: values.TUTORIAL_SLIDE1_TITLE,
                description: values.TUTORIAL_SLIDE1_DESCRIPTION,
                image: 'assets/img/tuto/tuto_1.png',
              },
              {
                title: values.TUTORIAL_SLIDE2_TITLE,
                description: values.TUTORIAL_SLIDE2_DESCRIPTION,
                image: 'assets/img/tuto/tuto_2.png',
              },
              {
                title: values.TUTORIAL_SLIDE3_TITLE,
                description: values.TUTORIAL_SLIDE3_DESCRIPTION,
                image: 'assets/img/tuto/tuto_3.png',
              },
              {
                title: values.TUTORIAL_SLIDE3_TITLE,
                description: values.TUTORIAL_SLIDE3_DESCRIPTION,
                image: 'assets/img/tuto/tuto_4.png',
              },
              {
                title: values.TUTORIAL_SLIDE3_TITLE,
                description: values.TUTORIAL_SLIDE3_DESCRIPTION,
                image: 'assets/img/tuto/tuto_5.png',
              },
              {
                title: values.TUTORIAL_SLIDE3_TITLE,
                description: values.TUTORIAL_SLIDE3_DESCRIPTION,
                image: 'assets/img/tuto/tuto_6.png',
              }
            ];
          });
      }else{
        if (this.util.getPreference(this.util.constants.logged)) {
          this.navCtrl.setRoot(HomePage, {}, {
            animate: true,
            direction: 'forward'
          });
        }else{
          this.startApp();
        }

      }
  }



  startApp() {
    this.doLogin();
    /*this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });*/
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.util.savePreference(this.util.constants.tutorial, true);
    this.menu.enable(true);
  }

  doLogin() {

    let dialog = this.util.show_dialog(this.messages.validando_informacion);
    let self=this;
    this.account.username="demo@veporel.com";
    this.account.password="demo123";
    this.user.login(this.account).subscribe((resp) => {
      dialog.dismiss();
      self.util.savePreference(self.util.constants.logged, true);
      self.navCtrl.setRoot(MenuPage);
    }, (err) => {
      dialog.dismiss();
      try {
        let body = JSON.parse(err._body);
        if (body.code==-1) {
          self.util.show_toast(self.messages.LOGIN_ERROR);
        }else if(body.code==-2){
          self.util.show_toast("error_20");
        }else if(body.code==-3){
          self.util.show_toast("error_21");
        }
      } catch (e) {
        self.util.show_toast(self.messages.SERVER_ERROR);
      }

    });
  }

}
