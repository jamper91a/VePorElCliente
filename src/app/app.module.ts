import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

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

import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
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
import { Facebook } from '@ionic-native/facebook';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ScreenOrientation } from '@ionic-native/screen-orientation';





// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
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
    Facebook,
    SocialSharing,
    NativeGeocoder,
    GoogleAnalytics,
    ScreenOrientation,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '5bbdb51b'
  }
};

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
    IonicModule.forRoot(MyApp,{
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
    }),
    IonicImageLoader.forRoot(),
    MomentModule,
    Ionic2RatingModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
