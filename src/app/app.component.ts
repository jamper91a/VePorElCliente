import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MenuPage } from '../pages/menu/menu';

import { TranslateService } from '@ngx-translate/core'
import { Util } from '../providers/providers';
import { WelcomePage } from '../pages/welcome/welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage:any;

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private util: Util
  ) {
    this.initTranslate();
    let self = this;
    if (this.util.getPreference(this.util.constants.logged)) {
      self.rootPage = MenuPage;
    }else{
      self.rootPage = WelcomePage;
    }
  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('es'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }
}
