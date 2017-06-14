import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { FindPromotiosPage } from '../pages/find-promotios/find-promotios';
import { CategoriesPage } from '../pages/categories/categories';
import { SubcategoriesPage } from '../pages/subcategories/subcategories';
import { OfferPage } from '../pages/offer/offer';
import { MapOfferPage } from '../pages/map-offer/map-offer';
import { CalificationPage } from '../pages/calification/calification';
import { InformationPage } from '../pages/information/information';
import { HelpPage } from '../pages/help/help';

import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/settings';
import { User } from '../providers/user';
import { Util } from '../providers/util';
import { VePorEl } from '../providers/veporel';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Geolocation } from '@ionic-native/geolocation';

import { IonicImageLoader } from 'ionic-image-loader';
import { MomentModule } from 'angular2-moment';
import { Ionic2RatingModule } from 'ionic2-rating';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}


/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  MyApp,
  LoginPage,
  MapPage,
  MenuPage,
  SignupPage,
  TutorialPage,
  WelcomePage,
  HomePage,
  FindPromotiosPage,
  CategoriesPage,
  SubcategoriesPage,
  OfferPage,
  MapOfferPage,
  CalificationPage,
  InformationPage,
  HelpPage
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Api,
    Items,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    Util,
    VePorEl,
    Geolocation,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot(),
    MomentModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
