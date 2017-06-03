import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import { TranslateService } from '@ngx-translate/core';
import { Util } from '../../providers/util';
import {MainPage} from "../pages";



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

  constructor(
    public navCtrl: NavController,
    public menu: MenuController, translate: TranslateService,
    public util : Util
  ) {
    //Valido si ya vio o no el tutorial
      if (!this.util.getPreference(this.util.constants.tutorial)) {
        translate.get(["TUTORIAL_SLIDE1_TITLE",
          "TUTORIAL_SLIDE1_DESCRIPTION",
          "TUTORIAL_SLIDE2_TITLE",
          "TUTORIAL_SLIDE2_DESCRIPTION",
          "TUTORIAL_SLIDE3_TITLE",
          "TUTORIAL_SLIDE3_DESCRIPTION",
        ]).subscribe(
          (values) => {
            console.log('Loaded values', values);
            this.slides = [
              {
                title: values.TUTORIAL_SLIDE1_TITLE,
                description: values.TUTORIAL_SLIDE1_DESCRIPTION,
                image: 'assets/img/logo.png',
              },
              {
                title: values.TUTORIAL_SLIDE2_TITLE,
                description: values.TUTORIAL_SLIDE2_DESCRIPTION,
                image: 'assets/img/ica-slidebox-img-2.png',
              },
              {
                title: values.TUTORIAL_SLIDE3_TITLE,
                description: values.TUTORIAL_SLIDE3_DESCRIPTION,
                image: 'assets/img/ica-slidebox-img-3.png',
              }
            ];
          });
      }else{
        if (this.util.getPreference(this.util.constants.logged)) {
          this.navCtrl.setRoot(MainPage, {}, {
            animate: true,
            direction: 'forward'
          });
        }else{
          this.startApp();
        }

      }
  }

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.util.savePreference(this.util.constants.tutorial, true);
    this.menu.enable(true);
  }

}
