import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import {IonicApp, IonicModule, IonicErrorHandler, IonicPageModule} from 'ionic-angular';

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
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { OptionsPage } from '../pages/options/options';
import { DirectoryPage } from '../pages/directory/directory';
import { CompaniesPage } from '../pages/companies/companies';
import { CompanyPage } from '../pages/company/company';
import { ResentEmailPage } from '../pages/resent-email/resent-email';
import { ExportersPage } from '../pages/exporters/exporters';
import { ExporterPage } from '../pages/exporter/exporter';

import { Api } from '../providers/api';
import { User } from '../providers/user';
import { Util } from '../providers/util';
import { VePorEl } from '../providers/veporel';

import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Geolocation } from '@ionic-native/geolocation';
import { Push } from '@ionic-native/push';


import { IonicImageLoader } from 'ionic-image-loader';
import { MomentModule } from 'angular2-moment';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { QRCodeModule } from 'angular2-qrcode';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SpeechRecognition} from '@ionic-native/speech-recognition'
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { IsDebug } from '@ionic-native/is-debug';
import { HTTP } from '@ionic-native/http';

import { Pro } from '@ionic/pro';
import { Injectable, Injector } from '@angular/core';




// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
  HelpPage,
  ForgetPasswordPage,
  OptionsPage,
  DirectoryPage,
  CompaniesPage,
  CompanyPage,
  ResentEmailPage,
  ExportersPage,
  ExporterPage
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
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    InAppBrowser,
    Util,
    VePorEl,
    Geolocation,
    Facebook,
    SocialSharing,
    NativeGeocoder,
    GoogleAnalytics,
    ScreenOrientation,
    Diagnostic,
    SpeechRecognition,
    LaunchNavigator,
    Push,
    IsDebug,
    HTTP,
    IonicErrorHandler,
    //[{ provide: ErrorHandler, useClass: MyErrorHandler }]
  ];
}

Pro.init('961c5b67', {
  appVersion: '2.7.0'
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    //Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    //this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    //IonicModule.forRoot(MyApp),
    HttpModule,
    IonicPageModule.forChild(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp,{
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
    }),
    IonicImageLoader.forRoot(),
    MomentModule,
    Ionic2RatingModule,
    QRCodeModule

  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
