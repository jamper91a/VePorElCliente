webpackJsonp([0],{

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapOfferPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__calification_calification__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__company_company__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_pro__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_pro___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__ionic_pro__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MapOfferPage = /** @class */ (function () {
    function MapOfferPage(googleMaps, navParams, navCtrl, platform, geolocation, veporel, util, actionSheetCtrl, translate, launchnavigator) {
        this.googleMaps = googleMaps;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.geolocation = geolocation;
        this.veporel = veporel;
        this.util = util;
        this.actionSheetCtrl = actionSheetCtrl;
        this.translate = translate;
        this.launchnavigator = launchnavigator;
        this.directionsService = new google.maps.DirectionsService();
    }
    MapOfferPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var self = this;
        //Determino el tipo de busqueda, si es de una promocion o de un negocio
        this.kind_map = this.navParams.get(this.util.constants.kind_map);
        if (this.kind_map == this.util.constants.map_offer) {
            this.offers_user = this.navParams.get(this.util.constants.offers_user);
            this.offer = this.navParams.get('offer');
            this.geolocation.getCurrentPosition().then(function (resp) {
                //Agrego la ubicación del local
                self.latLngOrigin = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
                self.latLngDestination = new google.maps.LatLng(_this.offer.latitude, _this.offer.longitude);
                _this.loadMap(resp.coords.latitude, resp.coords.longitude);
                self.calcRoute();
            }).catch(function (error) {
                __WEBPACK_IMPORTED_MODULE_9__ionic_pro__["Pro"].monitoring.exception(error);
            });
        }
        else {
            this.branch = this.navParams.get(this.util.constants.branch);
            this.geolocation.getCurrentPosition().then(function (resp) {
                //Agrego la ubicación del local
                self.latLngOrigin = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
                self.latLngDestination = new google.maps.LatLng(_this.branch.location.y, _this.branch.location.x);
                _this.loadMap(resp.coords.latitude, resp.coords.longitude);
                self.calcRoute();
            }).catch(function (error) {
                __WEBPACK_IMPORTED_MODULE_9__ionic_pro__["Pro"].monitoring.exception(error);
            });
        }
    };
    MapOfferPage.prototype.loadMap = function (latitude, longitude) {
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        var latLng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.directionsDisplay.setMap(this.map);
    };
    MapOfferPage.prototype.calcRoute = function () {
        var self = this;
        var request = {
            origin: this.latLngOrigin,
            destination: this.latLngDestination,
            travelMode: 'DRIVING'
        };
        this.directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                result.routes[0].legs[0].start_address = "Mi ubicación";
                if (self.kind_map == self.util.constants.map_offer)
                    result.routes[0].legs[0].end_address = self.offer.name;
                else
                    result.routes[0].legs[0].end_address = self.branch.name;
                self.directionsDisplay.setDirections(result);
            }
        });
    };
    MapOfferPage.prototype.show_options = function () {
        var _this = this;
        var self = this;
        this.translate.get(["opciones",
            "google_maps",
            "ver_mi_oferta",
            "waze",
            "lo_reclame",
            "no_lo_reclame",
            "informacion_del_negocio"
        ]).subscribe(function (values) {
            var opt;
            if (self.kind_map == self.util.constants.map_offer) {
                opt = [
                    // {
                    //   text: values.ver_mi_oferta,
                    //   icon: !this.platform.is('ios') ? 'search' : null,
                    //   handler: () => {
                    //   }
                    // },
                    {
                        icon: !_this.platform.is('ios') ? 'happy' : null,
                        text: values.lo_reclame,
                        handler: function () {
                            self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__calification_calification__["a" /* CalificationPage */], {
                                reclamed: 1,
                                id: self.offer.id
                            });
                        }
                    },
                    {
                        text: values.no_lo_reclame,
                        icon: !_this.platform.is('ios') ? 'sad' : null,
                        handler: function () {
                            self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__calification_calification__["a" /* CalificationPage */], {
                                reclamed: 2,
                                id: self.offer.id
                            });
                        }
                    },
                    {
                        text: values.google_maps,
                        icon: !_this.platform.is('ios') ? 'compass' : null,
                        handler: function () {
                            self.open_maps(self.launchnavigator.APP.GOOGLE_MAPS);
                        }
                    },
                    {
                        text: values.waze,
                        icon: !_this.platform.is('ios') ? 'compass' : null,
                        handler: function () {
                            self.open_maps(self.launchnavigator.APP.Waze);
                        }
                    }
                ];
            }
            else {
                opt = [
                    {
                        text: values.informacion_del_negocio,
                        icon: !_this.platform.is('ios') ? 'ios-information-circle' : null,
                        handler: function () {
                            self.open_company();
                        }
                    },
                    {
                        text: values.google_maps,
                        icon: !_this.platform.is('ios') ? 'compass' : null,
                        handler: function () {
                            self.open_maps(self.launchnavigator.APP.GOOGLE_MAPS);
                        }
                    },
                    {
                        text: values.waze,
                        icon: !_this.platform.is('ios') ? 'compass' : null,
                        handler: function () {
                            self.open_maps(self.launchnavigator.APP.WAZE);
                        }
                    }
                ];
            }
            var actionSheet = _this.actionSheetCtrl.create({
                title: values.opciones,
                buttons: opt
            });
            actionSheet.present();
        });
    };
    MapOfferPage.prototype.open_maps = function (app_name) {
        var self = this;
        var destination = this.latLngDestination.lat() + ',' + this.latLngDestination.lng();
        /*if(this.platform.is('ios')){
          window.open('maps://?q=' + destination, '_system');
        } else {
          let label = encodeURI('My Label');
          window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
        }*/
        this.launchnavigator.isAppAvailable(app_name).then(function (isAvailable) {
            var app;
            if (isAvailable) {
                app = app_name;
            }
            else {
                self.util.show_toast('error_10');
                app = self.launchnavigator.APP.USER_SELECT;
            }
            self.launchnavigator.navigate(destination, {
                app: app
            });
        });
    };
    MapOfferPage.prototype.open_company = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__company_company__["a" /* CompanyPage */], {
            company: this.branch
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MapOfferPage.prototype, "mapElement", void 0);
    MapOfferPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map-offer',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/map-offer/map-offer.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <div #map id="map"></div>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <p *ngIf="kind_map== util.constants.map_branch" text-center="">\n      <b>{{\'en_ruta\'|translate}}</b>{{branch.name}} -{{branch.address}}\n    </p>\n    <p *ngIf="kind_map== util.constants.map_offer" text-center="">\n      <b>{{\'promocion\'|translate}}: </b>{{offer.name}}: {{offer.address}}\n    </p>\n    <button ion-button block (click)="show_options()">\n      {{\'opciones\' | translate}}\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/map-offer/map-offer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_4__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__["a" /* LaunchNavigator */]])
    ], MapOfferPage);
    return MapOfferPage;
}());

//# sourceMappingURL=map-offer.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_menu__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forget_password_forget_password__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resent_email_resent_email__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_util__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, user, navParams, util, translateService, formBuilder) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.user = user;
        this.navParams = navParams;
        this.util = util;
        this.translateService = translateService;
        this.formBuilder = formBuilder;
        // The account fields for the login form.
        // If you're using the username field with or without email, make
        // sure to add it to the type
        this.account = {
            username: '',
            password: '',
            push_code: ''
        };
        this.account.username = this.navParams.get('username');
        this.account.password = this.navParams.get('password');
        if (!this.util.getPreference(this.util.constants.logged)) {
            this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR', 'validando_informacion']).subscribe(function (values) {
                _this.messages = values;
            });
            this.account.username = this.navParams.get('username');
            this.account.password = this.navParams.get('password');
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]);
        }
        this.validations_form = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].email
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
        });
    }
    // Attempt to login in through our User service
    LoginPage.prototype.doLogin = function () {
        var dialog = this.util.show_dialog(this.messages.validando_informacion);
        var self = this;
        this.user.login(this.account).subscribe(function (resp) {
            dialog.dismiss();
            self.util.savePreference(self.util.constants.logged, true);
            self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]);
        }, function (err) {
            dialog.dismiss();
            try {
                var body = JSON.parse(err._body);
                if (body.code == -1) {
                    self.util.show_toast(self.messages.LOGIN_ERROR);
                }
                else if (body.code == -2) {
                    self.util.show_toast("error_20");
                }
                else if (body.code == -3) {
                    self.util.show_toast("error_21");
                }
            }
            catch (e) {
                self.util.show_toast(self.messages.SERVER_ERROR);
            }
        });
    };
    LoginPage.prototype.olvide_contrasena = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__forget_password_forget_password__["a" /* ForgetPasswordPage */]);
    };
    LoginPage.prototype.resent_confirmation_email = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__resent_email_resent_email__["a" /* ResentEmailPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/login/login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'LOGIN_TITLE\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form [formGroup]="validations_form">\n    <ion-list>\n\n      <ion-item>\n        <ion-label fixed>{{ \'EMAIL\' | translate }}</ion-label>\n        <ion-input required type="email" formControlName="username" [(ngModel)]="account.username" name="username" placeholder="email@email.com"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label fixed>{{ \'PASSWORD\' | translate }}</ion-label>\n        <ion-input required type="password" formControlName="password" [(ngModel)]="account.password" name="password" placeholder="{{ \'PASSWORD\' | translate }}"></ion-input>\n      </ion-item>\n\n      <div padding>\n        <button ion-button color="primary" block (click)="doLogin(validations_form.value)" [disabled]="!validations_form.valid">{{ \'LOGIN_BUTTON\' | translate }}</button><br>\n        <button ion-button color="primary" block (click)="olvide_contrasena()">{{ \'olvide_la_contraseña\' | translate }}</button>\n        <button ion-button color="primary" block (click)="resent_confirmation_email()">{{ \'sent_email\' | translate }}</button>\n      </div>\n\n    </ion-list>\n\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user__["a" /* User */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__providers_util__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 138:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 138;

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfferPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_offer_map_offer__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var OfferPage = /** @class */ (function () {
    function OfferPage(navCtrl, navParams, veporel, util, loadingCtrl, toastCtrl, translate, socialSharing) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.socialSharing = socialSharing;
        var self = this;
        this.offer_id = this.navParams.get(this.util.constants.offer_id);
        this.branch_id = this.navParams.get(this.util.constants.branch_id);
        this.company_name = this.navParams.get(this.util.constants.company_name);
        self.veporel.get_offer_by_id(this.offer_id, this.branch_id).subscribe(function (result) {
            if (result != null) {
                var body = JSON.parse(result._body);
                self.offer = body.offer;
                self.offers_user = body.offers_user;
                self.cantidad = body.cantidad;
                if (self.cantidad > 0 && !self.offers_user) {
                    _this.translate.get(["opciones",
                        "uso_bloqueado"
                    ]).subscribe(function (values) {
                        var toast = _this.toastCtrl.create({
                            message: values.uso_bloqueado,
                            position: 'bottom',
                            duration: 3000
                        });
                        toast.present();
                    });
                }
                else if (self.offers_user && self.offers_user.state > 0) {
                    _this.translate.get(["opciones",
                        "oferta_ya_reclamada"
                    ]).subscribe(function (values) {
                        var toast = _this.toastCtrl.create({
                            message: values.oferta_ya_reclamada,
                            position: 'bottom',
                            duration: 3000
                        });
                        toast.present();
                    });
                }
            }
        }, function (error) {
        });
    }
    OfferPage.prototype.ionViewDidLoad = function () {
    };
    OfferPage.prototype.calculate_saving = function (regular_price, price) {
        return regular_price - price;
    };
    OfferPage.prototype.calculate_time = function (finish) {
        var a = __WEBPACK_IMPORTED_MODULE_4_moment___default()(finish);
        var b = __WEBPACK_IMPORTED_MODULE_4_moment___default()();
        var days = a.diff(b, 'days');
        var hours = a.diff(b, 'hours');
        var minutes = a.diff(b, 'minutes');
        if (days > 1)
            days = days + " dias, ";
        else if (days == 1)
            days = days + " dia, ";
        else
            days = "";
        if (hours > 24)
            hours = (hours % 24);
        if (hours > 1)
            hours = hours + " horas y ";
        else if (hours == 1)
            hours = hours + " hora y ";
        else
            hours = "";
        if (minutes > 60)
            minutes = (minutes % 60);
        if (minutes > 1)
            minutes = minutes + " minutos";
        else if (minutes == 1)
            minutes = minutes + " minuto";
        else
            minutes = "";
        return days + hours + minutes;
    };
    OfferPage.prototype.go_back = function () {
        this.navCtrl.pop();
    };
    OfferPage.prototype.take_offer = function () {
        var self = this;
        var loader = this.loadingCtrl.create({
            content: "Reservando ..."
        });
        loader.present();
        self.veporel.take_offer(this.offer_id, this.branch_id).subscribe(function (result) {
            if (result != null) {
                loader.dismiss();
                self.go_to_offer();
            }
        }, function (error) {
            try {
                var body = JSON.parse(error._body);
                loader.dismiss();
                var toast = self.toastCtrl.create({
                    message: body.message,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
                self.go_back();
            }
            catch (e) {
                loader.dismiss();
                var toast = self.toastCtrl.create({
                    message: "Error al intentar reservar, por favor intentalo mas tarde",
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        });
    };
    OfferPage.prototype.go_to_offer = function () {
        var self = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__map_offer_map_offer__["a" /* MapOfferPage */], {
            offers_user: self.offers_user,
            offer: self.offer,
            kind_map: self.util.constants.map_offer
        });
    };
    OfferPage.prototype.share = function () {
        var _this = this;
        var self = this;
        this.translate.get('mensaje_compartir_offer', { offer: self.offer.name, company: this.company_name }).subscribe(function (res) {
            _this.socialSharing.share(res, 'VePorEl', [], 'http://veporel.com').then(function () {
            }).catch(function (e) {
                alert(e);
            });
        });
    };
    OfferPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-offer',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/offer/offer.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content padding >\n  <div *ngIf="offer">\n    <h2 text-center>{{\'producto_encotrado\' | translate}}</h2>\n    <p text-center *ngIf="offers_user">{{\'codigo_oferta\' | translate}} CO-{{offers_user.id}}</p>\n    <div *ngIf="offers_user" align="center">\n      <qr-code [value]="offer.hash" [size]="150"></qr-code>\n    </div>\n    <img-loader *ngIf="!offers_user" src="{{util.url}}{{offer.url_photo}}" useImg fallback="assets/img/logo_horizontal.png"></img-loader>\n\n    <ion-list >\n      <ion-item>\n        <b>{{\'nombre\' | translate}}</b>\n        <p item-end>{{offer.name}}</p>\n      </ion-item>\n      <ion-item>\n        <b>{{\'producto\' | translate}}</b>\n        <p item-end>{{offer.product_name}} </p>\n      </ion-item>\n      <ion-item>\n        <b>{{\'precio_normal\' | translate}}</b>\n        <p item-end>{{offer.regular_price | currency:\'USD\':true:\'1.0-0\'}}</p>\n      </ion-item>\n      <ion-item>\n        <b>{{\'precio_veporel\' | translate}}</b>\n        <p item-end>{{offer.price | currency:\'USD\':true:\'1.0-0\'}}</p>\n\n      </ion-item>\n      <ion-item>\n        <b>{{\'ahorro\' | translate}}</b>\n        <p item-end> {{calculate_saving(offer.regular_price,offer.price) | currency:\'USD\':true:\'1.0-0\'}} </p>\n      </ion-item>\n      <ion-item>\n        <b>{{\'tiempo_oferta\' | translate}}</b>\n        <div item-end>\n          <p>{{calculate_time(offer.finish)}}</p>\n        </div>\n      </ion-item>\n      <ion-item>\n        <b>{{\'calificacion_negocio\' | translate}}</b>\n        <rating item-end [(ngModel)]="offer.calification" readOnly="true">\n        </rating>\n      </ion-item>\n      <ion-item  *ngIf="!offers_user" text-wrap>\n        <p [innerHtml]="\'mensaje_disponibilidad\' | translate: {value: offer.amount}" text-center></p>\n      </ion-item>\n    </ion-list>\n  </div>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-5-auto>\n        <button ion-button block (click)="take_offer()" *ngIf="!offers_user"  [disabled]="cantidad>0">\n          {{\'app_name\' | translate}}\n        </button>\n        <button ion-button block (click)="go_to_offer()" *ngIf="offers_user" [disabled]="offers_user.state>0">\n          {{\'reclamar\' | translate}}\n        </button>\n      </ion-col>\n      <ion-col col-5-auto>\n        <button ion-button block (click)="go_back()">\n          {{\'nueva_busqueda\' | translate}}\n        </button>\n      </ion-col>\n      <ion-col col-auto>\n        <button ion-button block (click)="share()" color="gray" no-padding text-wrap>\n          <img src="assets/img/button_compartir_icon.png"/>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/offer/offer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], OfferPage);
    return OfferPage;
}());

//# sourceMappingURL=offer.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_menu__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CalificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CalificationPage = /** @class */ (function () {
    function CalificationPage(navCtrl, navParams, veporel, util, toastCtrl, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.reclaimOn = false;
        this.reclaimOn = false;
        this.body = {
            id: this.navParams.get("id"),
            calification: 3,
            reason: '',
            reclamed: this.navParams.get("reclamed")
        };
    }
    CalificationPage.prototype.send_calification = function () {
        var _this = this;
        var self = this;
        this.veporel.send_calification(this.body).subscribe(function (result) {
            _this.translate.get(["opciones",
                "calificacion_exitosa"
            ]).subscribe(function (values) {
                var toast = _this.toastCtrl.create({
                    message: values.calificacion_exitosa,
                    position: 'bottom',
                    duration: 3000
                });
                toast.present();
                self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]);
            });
        }, function (error) {
            _this.translate.get(["opciones",
                "error_10"
            ]).subscribe(function (values) {
                var toast = _this.toastCtrl.create({
                    message: values.error_10,
                    position: 'bottom',
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    CalificationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-calification',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/calification/calification.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content padding >\n  <h2 text-center>{{\'muchas_gracias\' | translate}}</h2>\n  <div *ngIf="body.reclamed==2">\n    <ion-list>\n        <ion-item>\n          <ion-textarea [(ngModel)]="body.reason" placeholder="{{\'razon_por_no_reclamar\' | translate}}" clearInput></ion-textarea>\n        </ion-item>\n    </ion-list>\n  </div>\n\n  <p text-center>{{\'deseas_calificar\' | translate}}</p>\n  <rating text-center [(ngModel)]="body.calification"></rating>\n  <p text-center>{{\'info_calificar\' | translate}}</p>\n\n    <button ion-button block (click)="send_calification()">\n      {{\'enviar_calificacion\' | translate}}\n    </button>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/calification/calification.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], CalificationPage);
    return CalificationPage;
}());

//# sourceMappingURL=calification.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__find_promotios_find_promotios__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CompanyPage = /** @class */ (function () {
    function CompanyPage(navCtrl, navParams, veporel, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.mas_info = false;
        this.company_id = this.navParams.get(this.util.constants.company).id;
        this.branch = this.navParams.get(this.util.constants.company);
    }
    CompanyPage.prototype.ionViewDidLoad = function () {
        var self = this;
        this.veporel.get_company_by_id(this.company_id, this.branch.b_id).subscribe(function (result) {
            if (result != null) {
                var body = JSON.parse(result._body);
                //Analizo la columna de la imagen de la foto, para determinar si hay varias
                var url_photo = body.company.url_photo;
                if (url_photo)
                    self.photos = url_photo.split(";");
                else
                    self.photos = [];
                self.company = body.company;
                self.branch = body.branch;
            }
        });
    };
    CompanyPage.prototype.go_to_offers = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__find_promotios_find_promotios__["a" /* FindPromotiosPage */], {
            "type_find_promotio": this.util.constants.find_promotion_by_user_id
        });
    };
    CompanyPage.prototype.show_mas_info = function () {
        this.mas_info = true;
        this.content.scrollToBottom(200);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], CompanyPage.prototype, "content", void 0);
    CompanyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-company',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/company/company.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon"/>\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center"/>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <div *ngIf="company">\n    <div *ngIf="company.suscripcion==0">\n      <div text-center>\n        <img-loader class="logo_company" src="assets/img/logo_horizontal.png" useImg\n                    fallback="assets/img/logo_horizontal.png" text-center></img-loader>\n      </div>\n      <h2 text-center> {{company.name}}</h2>\n\n      <ion-grid>\n        <ion-row>\n          <ion-col text-center>\n            <ion-icon name="call" item-start></ion-icon>\n          </ion-col>\n          <ion-col text-center>\n            <ion-icon name="mail" item-start></ion-icon>\n          </ion-col>\n\n          <ion-col text-center>\n            <ion-icon name="globe" item-start></ion-icon>\n          </ion-col>\n          <ion-col text-center>\n            <ion-icon name="logo-facebook" item-start></ion-icon>\n          </ion-col>\n          <ion-col text-center>\n            <ion-icon name="logo-instagram" item-start></ion-icon>\n          </ion-col>\n\n\n\n        </ion-row>\n        <ion-row *ngIf="!mas_info">\n          <ion-col>\n            <button ion-button block (click)="show_mas_info()">\n              {{\'mas_info\' | translate}}\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n\n      <ion-grid *ngIf="mas_info">\n        <ion-row>\n          <ion-col col-12-auto>\n            <ion-item>\n              {{\'direccion\' | translate}}\n              <p item-end>{{branch.address}}</p>\n            </ion-item>\n\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-item>\n              <b>{{\'calificacion_negocio\' | translate}}</b>\n              <rating item-end [(ngModel)]="branch.rating" readOnly="true">\n              </rating>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-6>\n            <button ion-button block (click)="go_to_offers()" *ngIf="company.cantidad>0">\n              {{\'mis_ofertas\' | translate}}\n            </button>\n          </ion-col>\n          <ion-col col-6>\n            <a href="https://www.veporel.com.co/admin/pages/login" target="_blank" ion-button block>\n              {{\'mejorar_anuncio\' | translate}}\n            </a>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    <div *ngIf="company.suscripcion==1">\n      <h2 text-center> {{brach.name}}</h2>\n      <div text-center id="logo">\n          <div *ngIf="photos.length>1">\n          <ion-slides #pager autoplay="5000" pager="true" loop="true" speed="300">\n            <ion-slide *ngFor="let photo of photos">\n              <img-loader *ngIf="util.isUrlValid(photo)" src="{{photo}}" useImg\n                          fallback="assets/img/logo_horizontal.png" class="logo_company"></img-loader>\n              <img-loader *ngIf="!util.isUrlValid(photo)" src="{{util.url}}{{photo}}" useImg\n                          fallback="assets/img/logo_horizontal.png" class="logo_company"></img-loader>\n            </ion-slide>\n          </ion-slides>\n          </div>\n          <div *ngIf="photos.length==1">\n            <div *ngIf="util.isUrlValid(company.url_photo)">\n              <img-loader class="logo_company" src="{{company.url_photo}}" useImg\n                          fallback="assets/img/logo_horizontal.png" text-center></img-loader>\n            </div>\n            <div *ngIf="!util.isUrlValid(company.url_photo)">\n              <img-loader class="logo_company" src="{{util.url}}{{company.url_photo}}" useImg\n                          fallback="assets/img/logo_horizontal.png" text-center></img-loader>\n            </div>\n          </div>\n      </div>\n      <ion-grid>\n        <ion-row id="accesos_directos">\n          <ion-col text-center>\n            <div *ngIf="branch.telephone">\n              <a href="tel:{{branch.telephone}}" target="_blank" item-end>\n                <ion-icon name="call" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!branch.telephone">\n              <ion-icon name="call" item-start></ion-icon>\n            </div>\n\n          </ion-col>\n          <ion-col text-center>\n            <div *ngIf="company.email">\n              <a href="mailto:{{company.email}}" target="_blank" item-end>\n                <ion-icon name="mail" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!company.email">\n              <ion-icon name="mail" item-start></ion-icon>\n            </div>\n\n          </ion-col>\n          <ion-col text-center>\n            <div *ngIf="branch.website && util.isUrlValid(branch.website)">\n              <a href="{{branch.website}}" target="_blank" item-end>\n                <ion-icon name="globe" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!branch.website || !util.isUrlValid(branch.website)">\n              <ion-icon name="globe" item-start></ion-icon>\n            </div>\n          </ion-col>\n          <ion-col text-center>\n            <div *ngIf="branch.fanpage && util.isUrlValid(branch.fanpage)">\n              <a href="{{branch.fanpage}}" target="_blank" item-end>\n                <ion-icon name="logo-facebook" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!branch.fanpage || !util.isUrlValid(branch.fanpage)">\n              <ion-icon name="logo-facebook" item-start></ion-icon>\n            </div>\n          </ion-col>\n\n          <ion-col text-center>\n            <div *ngIf="branch.instagram && util.isUrlValid(branch.instagram)">\n              <a href="{{branch.instagram}}" target="_blank" item-end>\n                <ion-icon name="logo-instagram" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!branch.instagram || !util.isUrlValid(branch.instagram)">\n              <ion-icon name="logo-instagram" item-start></ion-icon>\n            </div>\n          </ion-col>\n\n        </ion-row>\n        <ion-row *ngIf="!mas_info">\n          <ion-col>\n            <button ion-button block (click)="show_mas_info()">\n              {{\'mas_info\' | translate}}\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n      <ion-grid id="mas_informacion" *ngIf="mas_info">\n        <ion-row>\n          <ion-col>\n            <ion-item text-wrap text-justify>\n              <p text-wrap text-justify>{{company.description}}</p>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n        <ion-row id="informacion">\n          <ion-col col-12-auto>\n            <ion-item *ngIf="company.domicilios">\n              <p>\n                <b>{{\'domicilio\' | translate}}: </b>\n                {{company.domicilios?\'Si\':\'No\'}}\n              </p>\n            </ion-item>\n            <ion-item text-wrap text-justify>\n              <p text-wrap text-justify>\n                <b>{{\'direccion\' | translate}}: </b>\n                {{branch.address}}\n              </p>\n            </ion-item>\n            <ion-item text-wrap text-justify>\n              <p text-wrap text-justify>\n                <b>{{\'ciudad\' | translate}}: </b>\n                {{branch.location.name}}, {{branch.location.country_code}}</p>\n            </ion-item>\n            <ion-item text-wrap text-justify>\n              <p>\n                <b>{{\'horario\' | translate}}: </b>\n                {{branch.schedule}}</p>\n            </ion-item>\n\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-item>\n              <b>{{\'calificacion_negocio\' | translate}}</b>\n              <rating item-end [(ngModel)]="branch.rating" readOnly="true">\n              </rating>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n\n      <ion-grid>\n        <ion-row>\n          <ion-col col-12>\n            <button ion-button block (click)="go_to_offers()" *ngIf="company.cantidad>0">\n              {{\'mis_ofertas\' | translate}}\n            </button>\n          </ion-col>\n          <!--<ion-col col-6>\n            <a href="https://www.veporel.com.co/admin/pages/login" target="_blank" ion-button block>\n              {{\'editar_mi_negocio\' | translate}}\n            </a>\n          </ion-col>-->\n        </ion-row>\n      </ion-grid>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/company/company.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */]])
    ], CompanyPage);
    return CompanyPage;
}());

//# sourceMappingURL=company.js.map

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_is_debug__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Created by Usuario on 02/06/2017.
 */
var Util = /** @class */ (function () {
    function Util(toastCtrl, translateService, loadingCtrl, isDebug) {
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.isDebug = isDebug;
        var self = this;
        this.constants = {
            logged: 'logged',
            tutorial: 'tutorial',
            user: 'user',
            token: 'token',
            latitude: 'latitude',
            longitude: 'longitude',
            type_find_promotio: 'type_find_promotio',
            find_promotio_by_location: 'find_promotio_by_location',
            find_promotion_by_category: 'find_promotion_by_category',
            category_name: 'category_name',
            city_name: 'city_name',
            address: 'address',
            subcategory_id: 'subcategory_id',
            subcategory_name: 'subcategory_name',
            offer_id: 'offer_id',
            branch_id: 'branch_id',
            offers_user: 'offers_user',
            offer: 'offer',
            kind_map: 'kind_map',
            map_offer: 'map_offer',
            map_branch: 'map_branch',
            branch: 'branch',
            company: 'company',
            country_code: 'country_code',
            country_name: 'country_name',
            find_promotion_by_user_id: 'find_promotion_by_user_id',
            find_promotion_by_subcategory_name: 'find_promotion_by_subcategory_name',
            language: 'language',
            push_code: 'push_code',
            topics: 'topics',
            company_name: 'company_name',
            get_location_first_time: 'get_location_first_time',
            logs: 'logs',
            find_business: 'find_business',
            find_exporters: 'find_exporters',
            exporter: 'exporter'
        };
        this.isDebug.getIsDebug()
            .then(function (isDebug) {
            if (isDebug == false)
                self.url = "https://backend.veporel.com.co:85/";
            else {
                //self.url = "https://backend.veporel.com.co:85/";
                self.url = "http://192.168.1.65:1337/";
            }
        })
            .catch(function (error) {
            //self.url = "https://backend.veporel.com.co:85/";
            self.url = "http://192.168.1.65:1337/";
        });
        this.google_api_key = "AIzaSyDvZFVr2cdCCVyLmMBg0-8MaJTJDaHD8pE";
        this.version = "2.6.6";
    }
    Util.prototype.savePreference = function (key, value) {
        localStorage.setItem(key, value);
    };
    Util.prototype.getPreference = function (key) {
        return localStorage.getItem(key);
    };
    Util.prototype.clearAllData = function () {
        var push_code = this.getPreference(this.constants.push_code);
        localStorage.clear();
        this.savePreference(this.constants.push_code, push_code);
    };
    Util.prototype.show_toast = function (message, position) {
        var _this = this;
        this.translateService.get(message).subscribe(function (value) {
            if (!position)
                position = 'bottom';
            var toast = _this.toastCtrl.create({
                message: value,
                duration: 3000,
                position: position
            });
            toast.present();
            return toast;
        });
    };
    Util.prototype.show_dialog = function (message) {
        var loading = this.loadingCtrl.create({
            content: message,
            dismissOnPageChange: false
        });
        loading.present();
        return loading;
    };
    Util.prototype.isUrlValid = function (userInput) {
        if (userInput != null) {
            var res = userInput.match(/http(s)?:\/\/.?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if (res == null)
                return false;
            else
                return true;
        }
        else {
            return false;
        }
    };
    Util.prototype.removeDiacritics = function (str) {
        var defaultDiacriticsRemovalMap = [
            { 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
            { 'base': 'AA', 'letters': /[\uA732]/g },
            { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g },
            { 'base': 'AO', 'letters': /[\uA734]/g },
            { 'base': 'AU', 'letters': /[\uA736]/g },
            { 'base': 'AV', 'letters': /[\uA738\uA73A]/g },
            { 'base': 'AY', 'letters': /[\uA73C]/g },
            { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
            { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
            { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
            { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g },
            { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g },
            { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
            { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
            { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
            { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
            { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
            { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
            { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
            { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
            { 'base': 'LJ', 'letters': /[\u01C7]/g },
            { 'base': 'Lj', 'letters': /[\u01C8]/g },
            { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
            { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
            { 'base': 'NJ', 'letters': /[\u01CA]/g },
            { 'base': 'Nj', 'letters': /[\u01CB]/g },
            { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
            { 'base': 'OI', 'letters': /[\u01A2]/g },
            { 'base': 'OO', 'letters': /[\uA74E]/g },
            { 'base': 'OU', 'letters': /[\u0222]/g },
            { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
            { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
            { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
            { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
            { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
            { 'base': 'TZ', 'letters': /[\uA728]/g },
            { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
            { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
            { 'base': 'VY', 'letters': /[\uA760]/g },
            { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
            { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
            { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
            { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
            { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
            { 'base': 'aa', 'letters': /[\uA733]/g },
            { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g },
            { 'base': 'ao', 'letters': /[\uA735]/g },
            { 'base': 'au', 'letters': /[\uA737]/g },
            { 'base': 'av', 'letters': /[\uA739\uA73B]/g },
            { 'base': 'ay', 'letters': /[\uA73D]/g },
            { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
            { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
            { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
            { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g },
            { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
            { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
            { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
            { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
            { 'base': 'hv', 'letters': /[\u0195]/g },
            { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
            { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
            { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
            { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g },
            { 'base': 'lj', 'letters': /[\u01C9]/g },
            { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
            { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g },
            { 'base': 'nj', 'letters': /[\u01CC]/g },
            { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
            { 'base': 'oi', 'letters': /[\u01A3]/g },
            { 'base': 'ou', 'letters': /[\u0223]/g },
            { 'base': 'oo', 'letters': /[\uA74F]/g },
            { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
            { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
            { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g },
            { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g },
            { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g },
            { 'base': 'tz', 'letters': /[\uA729]/g },
            { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
            { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
            { 'base': 'vy', 'letters': /[\uA761]/g },
            { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
            { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
            { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g },
            { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }
        ];
        for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
            str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
        }
        return str;
    };
    Util.prototype.setLogs = function (msn) {
        var logs = this.getPreference(this.constants.logs);
        if (logs)
            logs = logs + "\n" + msn + ";";
        else
            logs = msn + ";";
        this.savePreference(this.constants.logs, logs);
    };
    Util.prototype.clearLogs = function () {
        this.savePreference(this.constants.logs, "");
    };
    Util.prototype.getLogs = function () {
        return this.getPreference(this.constants.logs);
    };
    Util = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ToastController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* LoadingController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_is_debug__["a" /* IsDebug */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_is_debug__["a" /* IsDebug */]) === "function" && _d || Object])
    ], Util);
    return Util;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=util.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__companies_companies__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_analytics__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_speech_recognition__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__exporters_exporters__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_pro__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_pro___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__ionic_pro__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var DirectoryPage = /** @class */ (function () {
    function DirectoryPage(navCtrl, navParams, util, veporel, geolocation, ga, diagnostic, translateService, platform, alertCtrl, speech) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.veporel = veporel;
        this.geolocation = geolocation;
        this.ga = ga;
        this.diagnostic = diagnostic;
        this.translateService = translateService;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.speech = speech;
        this.city_name = "";
        this.country_name = "";
        this.language = "";
        this.speechList = [];
        this.data = {
            country_name: "",
            country_code: "",
            departament_name: "",
            city_name: "",
            name: "",
            latitude: 0,
            longitude: 0,
            pagetoken: "",
            type: ""
        };
        this.all_dialogs = [];
        var self = this;
        this.data.type = this.navParams.get('type');
        translateService.get('LANG').subscribe(function (lang) {
            self.language = lang;
        });
        this.get_messages();
    }
    DirectoryPage.prototype.get_messages = function () {
        var self = this;
        self.translateService.get([
            'obteniendo_tu_ubicacion',
            'registrando',
            "ubicacion",
            "error_22",
            "reintentar",
            "salir"
        ]).subscribe(function (value) {
            self.messages = value;
        }, function (err) {
            alert(err);
        });
    };
    DirectoryPage.prototype.ionViewWillLeave = function () {
        this.all_dialogs.forEach(function (dialog) {
            try {
                dialog.dismissAll();
            }
            catch (e) {
            }
        });
    };
    DirectoryPage.prototype.ionViewDidLoad = function () {
        this.get_location();
    };
    DirectoryPage.prototype.get_location = function () {
        var self = this;
        self.util.setLogs("Obteniendo ubicación...");
        var options = JSON.parse(this.util.getPreference("options"));
        if (!options) {
            options = {
                notifications: true,
                range: 2,
                debug: false
            };
        }
        self.util.setLogs("Options: " + JSON.stringify(options));
        if (!options.debug) {
            var dialog_1 = self.util.show_dialog(self.messages.obteniendo_tu_ubicacion);
            self.veporel.get_coordenates(dialog_1).subscribe(function (location) {
                self.util.setLogs(JSON.stringify(location));
                switch (location.code) {
                    case 1:
                        self.data.latitude = location.lat;
                        self.data.longitude = location.lon;
                        self.veporel.get_address(location.lat, location.lon, true).subscribe(function (result) {
                            dialog_1.dismiss();
                            self.util.setLogs("Results 1: " + JSON.stringify(result));
                            if (!result.countryName || !result.countryCode || !result.locality) {
                                self.util.show_toast('error_17');
                                self.navCtrl.pop();
                            }
                            else {
                                self.country_name = result.countryName;
                                self.data.country_name = result.countryName;
                                self.data.country_code = result.countryCode;
                                self.data.city_name = result.locality;
                                self.city_name = result.locality;
                                self.util.savePreference(self.util.constants.latitude, self.data.latitude);
                                self.util.savePreference(self.util.constants.longitude, self.data.longitude);
                                self.util.savePreference(self.util.constants.city_name, self.data.city_name);
                                self.util.savePreference(self.util.constants.country_code, self.data.country_code);
                                self.util.savePreference(self.util.constants.country_name, self.data.country_name);
                            }
                        }, function (error) {
                            dialog_1.dismiss();
                            self.util.setLogs(JSON.stringify(error));
                            var confirm = self.alertCtrl.create({
                                title: self.messages.ubicacion,
                                message: self.messages.error_22,
                                buttons: [
                                    {
                                        text: self.messages.salir,
                                        handler: function () {
                                            if (self.platform.is('android')) {
                                                self.platform.exitApp();
                                            }
                                            else {
                                                self.util.show_toast('error_22');
                                            }
                                        }
                                    },
                                    {
                                        text: self.messages.reintentar,
                                        handler: function () {
                                            self.get_location();
                                        }
                                    }
                                ]
                            });
                            confirm.present();
                        });
                        break;
                    case 6:
                        self.get_location();
                        break;
                    case 3:
                        self.navCtrl.pop();
                        self.diagnostic.switchToLocationSettings();
                        break;
                }
            }, function (err) {
                dialog_1.dismiss();
                self.util.setLogs(JSON.stringify(err));
                switch (err.code) {
                    case 3:
                    case 5:
                    case 7:
                        self.util.show_toast('error_16');
                        self.navCtrl.pop();
                        break;
                    case 1:
                    case 2:
                        var confirm_1 = self.alertCtrl.create({
                            title: self.messages.ubicacion,
                            message: self.messages.error_22,
                            buttons: [
                                {
                                    text: self.messages.salir,
                                    handler: function () {
                                        self.navCtrl.pop();
                                    }
                                },
                                {
                                    text: self.messages.reintentar,
                                    handler: function () {
                                        self.get_location();
                                    }
                                }
                            ]
                        });
                        confirm_1.present();
                        break;
                    default:
                        self.util.show_toast(err.message);
                        break;
                }
            });
        }
        else {
            self.util.setLogs("Esta en debug, obteniendo datos ...");
            self.data.latitude = self.util.getPreference(self.util.constants.latitude);
            self.data.longitude = self.util.getPreference(self.util.constants.longitude);
            self.util.setLogs("Latitude: " + self.data.latitude);
            self.util.setLogs("Longitude: " + self.data.longitude);
            self.veporel.get_address(self.data.latitude, self.data.longitude, true).subscribe(function (result) {
                self.util.setLogs("Results: " + JSON.stringify(result));
                //dialog.dismiss();
                if (!result.countryName || !result.countryCode || !result.locality) {
                    self.util.show_toast('error_17');
                    self.navCtrl.pop();
                }
                else {
                    self.country_name = result.countryName;
                    self.data.country_name = result.countryName;
                    self.data.country_code = result.countryCode;
                    self.data.city_name = result.locality;
                    self.city_name = result.locality;
                    self.util.savePreference(self.util.constants.latitude, self.data.latitude);
                    self.util.savePreference(self.util.constants.longitude, self.data.longitude);
                    self.util.savePreference(self.util.constants.city_name, self.data.city_name);
                    self.util.savePreference(self.util.constants.country_code, self.data.country_code);
                    self.util.savePreference(self.util.constants.country_name, self.data.country_name);
                }
            }, function (err) {
                self.util.setLogs("Error obteniendo la ubicación: " + err);
                self.country_name = self.util.getPreference(self.util.constants.country_name);
                self.data.country_name = self.util.getPreference(self.util.constants.country_name);
                self.data.country_code = self.util.getPreference(self.util.constants.country_code);
                self.data.city_name = self.util.getPreference(self.util.constants.city_name);
                self.city_name = self.util.getPreference(self.util.constants.city_name);
            });
        }
    };
    DirectoryPage.prototype.find = function (name) {
        if (name)
            this.data.name = name;
        //Valido el termino de busqueda
        if (!this.data.name) {
            this.util.show_toast('error_18');
        }
        else {
            //Agrego el nombre de la ciudad al campo de busqueda
            this.data.city_name = this.city_name;
            this.data.pagetoken = "";
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__companies_companies__["a" /* CompaniesPage */], this.data);
        }
    };
    DirectoryPage.prototype.find_exporters = function (name) {
        if (name)
            this.data.name = name;
        //Valido el termino de busqueda
        if (!this.data.name) {
            this.util.show_toast('error_18');
        }
        else {
            //Agrego el nombre de la ciudad al campo de busqueda
            this.data.city_name = this.city_name;
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__exporters_exporters__["a" /* ExportersPage */], this.data);
        }
    };
    DirectoryPage.prototype.isSpeechSupported = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isAvailable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.speech.isRecognitionAvailable()];
                    case 1:
                        isAvailable = _a.sent();
                        return [2 /*return*/, isAvailable];
                }
            });
        });
    };
    DirectoryPage.prototype.getPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permission, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.speech.requestPermission()];
                    case 1:
                        permission = _a.sent();
                        return [2 /*return*/, permission];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DirectoryPage.prototype.hasPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permission, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.speech.hasPermission()];
                    case 1:
                        permission = _a.sent();
                        return [2 /*return*/, permission];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DirectoryPage.prototype.getSupportedLanguages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var languages, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.speech.getSupportedLanguages()];
                    case 1:
                        languages = _a.sent();
                        return [2 /*return*/, languages];
                    case 2:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DirectoryPage.prototype.listenForSpeech = function () {
        var self = this;
        this.isSpeechSupported().then(function (isSupported) {
            if (isSupported) {
                self.hasPermission().then(function (hasPermission) {
                    if (hasPermission) {
                        self.androidOptions = {
                            prompt: 'Cual producto deseas buscarle ofertas',
                            language: 'es-MX'
                        };
                        self.iosOptions = {
                            language: 'es-MX'
                        };
                        if (self.platform.is('android')) {
                            self.speech.startListening(self.androidOptions).subscribe(function (data) {
                                var confirm = self.alertCtrl.create({
                                    title: "Buscar ofertas",
                                    message: "Deseas buscar ofertas del producto " + data[0] + "?",
                                    buttons: [
                                        {
                                            text: "Cancelar",
                                            handler: function () {
                                            }
                                        },
                                        {
                                            text: "Buscar",
                                            handler: function () {
                                                self.data.pagetoken = "";
                                                self.data.name = data[0];
                                                self.find();
                                            }
                                        }
                                    ]
                                });
                                confirm.present();
                            }, function (error) { __WEBPACK_IMPORTED_MODULE_10__ionic_pro__["Pro"].monitoring.exception(error); });
                        }
                        else if (self.platform.is('ios')) {
                            self.speech.startListening(self.iosOptions).subscribe(function (data) { return self.speechList = data; }, function (error) { __WEBPACK_IMPORTED_MODULE_10__ionic_pro__["Pro"].monitoring.exception(error); });
                        }
                    }
                    else {
                        self.getPermission();
                    }
                });
            }
            else {
            }
        });
    };
    DirectoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-directory',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/directory/directory.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <form *ngIf="data.type==util.constants.find_business">\n    <ion-list>\n      <ion-item>\n        <ion-label stacked>{{ \'pais\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="data.country_name" name="country_name" [disabled]=true value="{{data.country_name}}"></ion-input>\n      </ion-item>\n      <ion-item *ngIf="country_name">\n        <ion-label stacked>{{ \'ciudad\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="data.city_name" name="city_name" [disabled]=true value="{{data.city_name}}"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>{{ \'key_word_directory\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="data.name" name="key_word" required="true"></ion-input>\n      </ion-item>\n      <div padding>\n        <ion-row>\n          <ion-col>\n            <img (click)="find(\'Comida\')" src="assets/iconos/ic_comida.png"/>\n          </ion-col>\n          <ion-col>\n            <img (click)="find(\'Belleza\')" src="assets/iconos/ic_belleza.png"/>\n          </ion-col>\n          <ion-col>\n            <img src="assets/iconos/ic_vestuario.png" (click)="find(\'Vestuario\')"/>\n          </ion-col>\n          <ion-col>\n            <img src="assets/iconos/ic_domicilios.png" (click)="find(\'Domicilio\')"/>\n          </ion-col>\n          <ion-col>\n            <img src="assets/iconos/ic_drogeria.png" (click)="find(\'Droguería\')"/>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <img src="assets/iconos/ic_educacion.png" (click)="find(\'Educación\')"/>\n          </ion-col>\n          <ion-col>\n            <img src="assets/iconos/ic_diversion.png" (click)="find(\'Entretenimiento\')"/>\n          </ion-col>\n          <ion-col>\n            <img src="assets/iconos/ic_tecnologia.png" (click)="find(\'Tecnología\')"/>\n          </ion-col>\n          <ion-col>\n            <img src="assets/iconos/ic_hotel.png" (click)="find(\'Hotel\')"/>\n          </ion-col>\n          <ion-col>\n            <img src="assets/iconos/ic_gimnasio.png" (click)="find(\'Gimnasio\')"/>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-10>\n            <button ion-button color="primary" block (click)="find()">{{ \'buscar\' | translate }}</button>\n          </ion-col>\n          <ion-col col-2>\n            <button ion-button block icon-only (click)="listenForSpeech()" color="primary">\n              <ion-icon name="mic"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n\n\n      </div>\n\n    </ion-list>\n  </form>\n  <form *ngIf="data.type==util.constants.find_exporters">\n    <ion-list>\n      <ion-item>\n        <ion-label stacked>{{ \'product\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="data.name" name="key_word" required="true"></ion-input>\n      </ion-item>\n      <div padding>\n        <ion-row>\n          <ion-col col-10>\n            <button ion-button color="primary" block (click)="find_exporters()">{{ \'buscar\' | translate }}</button>\n          </ion-col>\n          <ion-col col-2>\n            <button ion-button block icon-only (click)="listenForSpeech()" color="primary">\n              <ion-icon name="mic"></ion-icon>\n            </button>\n          </ion-col>\n        </ion-row>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/directory/directory.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_speech_recognition__["a" /* SpeechRecognition */]])
    ], DirectoryPage);
    return DirectoryPage;
}());

//# sourceMappingURL=directory.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompaniesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_offer_map_offer__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CompaniesPage = /** @class */ (function () {
    function CompaniesPage(navCtrl, navParams, veporel, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.page = 0;
    }
    CompaniesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var self = this;
        this.veporel.get_companies_by_city_categorie_and_name(this.navParams.data, this.page).subscribe(function (result) {
            if (result != null) {
                var body = JSON.parse(result._body);
                try {
                    _this.navParams.data.pagetoken = body.pagetoken;
                }
                catch (e) {
                    _this.navParams.data.pagetoken = "";
                }
                self.branchs = body.branchs;
                if (self.branchs.length == 0) {
                    _this.navCtrl.pop();
                    _this.util.show_toast('error_13');
                }
                else {
                    self.get_banners();
                }
            }
        }, function (error) {
            _this.navCtrl.pop();
            _this.util.show_toast('error_13');
        });
    };
    CompaniesPage.prototype.go_to_map = function (branch) {
        var self = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__map_offer_map_offer__["a" /* MapOfferPage */], {
            kind_map: self.util.constants.map_branch,
            branch: branch
        });
    };
    CompaniesPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        var self = this;
        this.page = this.page + 20;
        this.veporel.get_companies_by_city_categorie_and_name(this.navParams.data, this.page).subscribe(function (result) {
            infiniteScroll.complete();
            if (result != null) {
                var body = JSON.parse(result._body);
                try {
                    _this.navParams.data.pagetoken = body.pagetoken;
                }
                catch (e) {
                    _this.navParams.data.pagetoken = "";
                }
                var new_Branchs = body.branchs;
                if (new_Branchs == 0) {
                }
                else {
                    self.branchs = self.branchs.concat(new_Branchs);
                }
            }
        });
    };
    CompaniesPage.prototype.transform_distance = function (distance) {
        var d = parseInt((distance * 1).toFixed(0));
        if (d < 1000) {
            return d + " Mts";
        }
        else {
            return (d / 1000).toFixed(0) + " Kms";
        }
    };
    CompaniesPage.prototype.valid_photo = function (branch) {
        if (branch && branch.url_photo) {
            branch.url_photo = branch.url_photo.split(";")[0];
            return this.util.isUrlValid(branch.url_photo);
        }
        else
            return false;
    };
    CompaniesPage.prototype.get_banners = function () {
        var city_name = this.util.getPreference(this.util.constants.city_name);
        var self = this;
        //Obtengo los banners
        this.veporel.get_banners(city_name, 3).subscribe(function (result) {
            var body = result._body;
            if (body != null) {
                self.banners = JSON.parse(body);
            }
            else {
            }
        }, function (error) {
        });
    };
    CompaniesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-companies',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/companies/companies.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content>\n\n  <ion-list>\n    <ion-item *ngFor="let branch of branchs" (click)="go_to_map(branch)">\n      <ion-thumbnail item-start>\n          <img-loader *ngIf="valid_photo(branch)" src="{{branch.url_photo}}" object-fit useImg fallback="assets/img/logo_horizontal.png"></img-loader>\n          <img-loader *ngIf="!valid_photo(branch)" src="{{util.url}}{{branch.url_photo}}" object-fit useImg fallback="assets/img/logo_horizontal.png"></img-loader>\n      </ion-thumbnail>\n      <h2>{{branch.name}}</h2>\n      <p>{{transform_distance(branch.distance)}}</p>\n      <div *ngIf="branch.suscripcion>0">\n        <p><ion-icon name="star" color="primary"></ion-icon>Premium</p>\n      </div>\n    </ion-item>\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar no-border>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-12>\n          <ion-slides *ngIf="banners && banners.length" autoplay="5000" pager="true"   loop="true" speed="300">\n            <ion-slide *ngFor="let banner of banners">\n              <a href="{{banner.url_destination}}" target="_blank">\n                <img-loader *ngIf="util.isUrlValid(banner.url_photo)" src="{{banner.url_photo}}" style="object-fit: contain" useImg fallback="assets/img/logo_horizontal.png" class="slide-image"></img-loader>\n                <img-loader *ngIf="!util.isUrlValid(banner.url_photo)" src="{{util.url}}{{banner.url_photo}}" style="object-fit: contain" useImg fallback="assets/img/logo_horizontal.png" class="slide-image"></img-loader>\n              </a>\n            </ion-slide>\n          </ion-slides>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/companies/companies.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */]])
    ], CompaniesPage);
    return CompaniesPage;
}());

//# sourceMappingURL=companies.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExportersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__exporter_exporter__ = __webpack_require__(362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ExportersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ExportersPage = /** @class */ (function () {
    function ExportersPage(navCtrl, navParams, veporel, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.page = 0;
    }
    ExportersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var self = this;
        this.veporel.get_exporter_by_product(this.navParams.data, this.page).subscribe(function (result) {
            if (result != null) {
                var body = JSON.parse(result._body);
                self.data = body;
                if (self.data.length == 0) {
                    _this.navCtrl.pop();
                    _this.util.show_toast('error_13');
                }
                else {
                    self.get_banners();
                }
            }
        }, function () {
            _this.navCtrl.pop();
            _this.util.show_toast('error_13');
        });
    };
    ExportersPage.prototype.doInfinite = function (infiniteScroll) {
        var self = this;
        this.page = this.page + 20;
        this.veporel.get_exporter_by_product(this.navParams.data, this.page).subscribe(function (result) {
            infiniteScroll.complete();
            if (result != null) {
                var body = JSON.parse(result._body);
                var new_data = body.data;
                if (new_data) {
                }
                else {
                    self.data = self.data.concat(new_data);
                }
            }
        });
    };
    ExportersPage.prototype.go_to_exporter = function (exporter) {
        console.log(exporter);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__exporter_exporter__["a" /* ExporterPage */], {
            exporter: exporter
        });
    };
    ExportersPage.prototype.valid_photo = function (branch) {
        if (branch && branch.url_photo) {
            branch.photo = branch.url_photo.split(";")[0];
            return this.util.isUrlValid(branch.photo);
        }
        else
            return false;
    };
    ExportersPage.prototype.get_banners = function () {
        var city_name = this.util.getPreference(this.util.constants.city_name);
        var self = this;
        //Obtengo los banners
        this.veporel.get_banners(city_name, 4).subscribe(function (result) {
            var body = result._body;
            if (body != null) {
                self.banners = JSON.parse(body);
            }
            else {
            }
        }, function (error) {
        });
    };
    ExportersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-exporters',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/exporters/exporters.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content>\n\n  <ion-list>\n    <ion-item *ngFor="let exporter of data" (click)="go_to_exporter(exporter)">\n      <ion-thumbnail item-start>\n        <img-loader *ngIf="valid_photo(exporter)" src="{{exporter.photo}}" object-fit useImg fallback="assets/img/logo_horizontal.png"></img-loader>\n        <img-loader *ngIf="!valid_photo(exporter)" src="{{util.url}}{{exporter.photo}}" object-fit useImg fallback="assets/img/logo_horizontal.png"></img-loader>\n      </ion-thumbnail>\n      <h2>{{exporter.name}}</h2>\n      <div *ngIf="exporter.suscripcion>0">\n        <p><ion-icon name="star" color="primary"></ion-icon>Premium</p>\n      </div>\n    </ion-item>\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar no-border>\n    <ion-grid>\n      <ion-row>\n        <ion-col col-12>\n          <ion-slides *ngIf="banners && banners.length" autoplay="5000" pager="true"   loop="true" speed="300">\n            <ion-slide *ngFor="let banner of banners">\n              <a href="{{banner.url_destination}}" target="_blank">\n                <img-loader *ngIf="util.isUrlValid(banner.url_photo)" src="{{banner.url_photo}}" style="object-fit: contain" useImg fallback="assets/img/logo_horizontal.png" class="slide-image"></img-loader>\n                <img-loader *ngIf="!util.isUrlValid(banner.url_photo)" src="{{util.url}}{{banner.url_photo}}" style="object-fit: contain" useImg fallback="assets/img/logo_horizontal.png" class="slide-image"></img-loader>\n              </a>\n            </ion-slide>\n          </ion-slides>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/exporters/exporters.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */]])
    ], ExportersPage);
    return ExportersPage;
}());

//# sourceMappingURL=exporters.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExporterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ExporterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ExporterPage = /** @class */ (function () {
    function ExporterPage(navCtrl, navParams, veporel, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.mas_info = false;
        var self = this;
        this.data = this.navParams.get(this.util.constants.exporter);
        var url_photo = this.data.url_photo;
        if (url_photo)
            self.photos = url_photo.split(";");
        else
            self.photos = [];
    }
    ExporterPage.prototype.ionViewDidLoad = function () {
    };
    ExporterPage.prototype.show_mas_info = function () {
        this.mas_info = true;
        this.content.scrollToBottom(200);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], ExporterPage.prototype, "content", void 0);
    ExporterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-exporter',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/exporter/exporter.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon"/>\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center"/>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <div *ngIf="data">\n    <div *ngIf="data.suscripcion==0">\n      <div text-center>\n        <img-loader class="logo_data" src="assets/img/logo_horizontal.png" useImg\n                    fallback="assets/img/logo_horizontal.png" text-center></img-loader>\n      </div>\n      <h2 text-center> {{data.name}}</h2>\n\n      <ion-grid>\n        <ion-row>\n          <ion-col text-center>\n            <ion-icon name="call" item-start></ion-icon>\n          </ion-col>\n          <ion-col text-center>\n            <ion-icon name="mail" item-start></ion-icon>\n          </ion-col>\n\n          <ion-col text-center>\n            <ion-icon name="globe" item-start></ion-icon>\n          </ion-col>\n          <ion-col text-center>\n            <ion-icon name="logo-facebook" item-start></ion-icon>\n          </ion-col>\n          <ion-col text-center>\n            <ion-icon name="logo-instagram" item-start></ion-icon>\n          </ion-col>\n\n\n        </ion-row>\n        <ion-row *ngIf="!mas_info">\n          <ion-col>\n            <button ion-button block (click)="show_mas_info()">\n              {{\'mas_info\' | translate}}\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n\n      <ion-grid *ngIf="mas_info">\n        <ion-row>\n          <ion-col col-12-auto>\n            <ion-item>\n              {{\'direccion\' | translate}}\n              <p item-end>{{data.address}}</p>\n            </ion-item>\n\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    <div *ngIf="data.suscripcion==1">\n      <h2 text-center> {{data.name}}</h2>\n      <div text-center id="logo">\n        <div *ngIf="photos.length>1">\n          <ion-slides #pager autoplay="5000" pager="true" loop="true" speed="300">\n            <ion-slide *ngFor="let photo of photos">\n              <img-loader *ngIf="util.isUrlValid(photo)" src="{{photo}}" useImg\n                          fallback="assets/img/logo_horizontal.png" class="logo_company"></img-loader>\n              <img-loader *ngIf="!util.isUrlValid(photo)" src="{{util.url}}{{photo}}" useImg\n                          fallback="assets/img/logo_horizontal.png" class="logo_company"></img-loader>\n            </ion-slide>\n          </ion-slides>\n        </div>\n        <div *ngIf="photos.length==1">\n          <div *ngIf="util.isUrlValid(data.url_photo)">\n            <img-loader class="logo_company" src="{{data.url_photo}}" useImg\n                        fallback="assets/img/logo_horizontal.png" text-center></img-loader>\n          </div>\n          <div *ngIf="!util.isUrlValid(data.url_photo)">\n            <img-loader class="logo_company" src="{{util.url}}{{data.url_photo}}" useImg\n                        fallback="assets/img/logo_horizontal.png" text-center></img-loader>\n          </div>\n        </div>\n      </div>\n      <ion-grid>\n        <ion-row id="accesos_directos">\n          <ion-col text-center>\n            <div *ngIf="data.cellphone">\n              <a href="tel:{{data.cellphone}}" target="_blank" item-end>\n                <ion-icon name="call" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!data.cellphone">\n              <ion-icon name="call" item-start></ion-icon>\n            </div>\n\n          </ion-col>\n          <ion-col text-center>\n            <div *ngIf="data.email">\n              <a href="mailto:{{data.email}}" target="_blank" item-end>\n                <ion-icon name="mail" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!data.email">\n              <ion-icon name="mail" item-start></ion-icon>\n            </div>\n\n          </ion-col>\n          <ion-col text-center>\n            <div *ngIf="data.webpage && util.isUrlValid(data.webpage)">\n              <a href="{{data.webpage}}" target="_blank" item-end>\n                <ion-icon name="globe" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!data.webpage || !util.isUrlValid(data.webpage)">\n              <ion-icon name="globe" item-start></ion-icon>\n            </div>\n          </ion-col>\n          <ion-col text-center>\n            <div *ngIf="data.fanpage && util.isUrlValid(data.fanpage)">\n              <a href="{{data.fanpage}}" target="_blank" item-end>\n                <ion-icon name="logo-facebook" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!data.fanpage || !util.isUrlValid(data.fanpage)">\n              <ion-icon name="logo-facebook" item-start></ion-icon>\n            </div>\n          </ion-col>\n\n          <ion-col text-center>\n            <div *ngIf="data.instagram && util.isUrlValid(data.instagram)">\n              <a href="{{data.instagram}}" target="_blank" item-end>\n                <ion-icon name="logo-instagram" item-start [color]="primary"></ion-icon>\n              </a>\n            </div>\n            <div *ngIf="!data.instagram || !util.isUrlValid(data.instagram)">\n              <ion-icon name="logo-instagram" item-start></ion-icon>\n            </div>\n          </ion-col>\n\n        </ion-row>\n        <ion-row *ngIf="!mas_info">\n          <ion-col>\n            <button ion-button block (click)="show_mas_info()">\n              {{\'mas_info\' | translate}}\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n      <ion-grid id="mas_informacion" *ngIf="mas_info">\n        <ion-row>\n          <ion-col>\n            <ion-item text-wrap text-justify>\n              <p text-wrap text-justify>{{data.description}}</p>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n        <ion-row id="informacion">\n          <ion-col col-12-auto>\n            <ion-item text-wrap text-justify>\n              <p text-wrap text-justify>\n                <b>{{\'direccion\' | translate}}: </b>\n                {{data.address}}\n              </p>\n            </ion-item>\n            <ion-item text-wrap text-justify>\n              <p text-wrap text-justify>\n                <b>{{\'ciudad\' | translate}}: </b>\n                {{data.location.name}}, {{data.location.country_code}}</p>\n            </ion-item>\n            <ion-item text-wrap text-justify>\n              <p>\n                <b>{{\'horario\' | translate}}: </b>\n                {{data.schedule}}</p>\n            </ion-item>\n\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/exporter/exporter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */]])
    ], ExporterPage);
    return ExporterPage;
}());

//# sourceMappingURL=exporter.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MapPage = /** @class */ (function () {
    function MapPage(googleMaps, navCtrl, platform, geolocation, veporel, util, diagnostic, translateService, alertCtrl) {
        this.googleMaps = googleMaps;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.geolocation = geolocation;
        this.veporel = veporel;
        this.util = util;
        this.diagnostic = diagnostic;
        this.translateService = translateService;
        this.alertCtrl = alertCtrl;
        this.marker = null;
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.util.savePreference(this.util.constants.address, '');
        this.get_location();
    };
    MapPage.prototype.get_location = function () {
        var self = this;
        var options = JSON.parse(this.util.getPreference("options"));
        if (!options) {
            options = {
                notifications: true,
                range: 2,
                debug: false
            };
        }
        if (!options.debug) {
            if (this.platform.is('cordova')) {
                self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
                    var _this = this;
                    if (isAuthorized) {
                        self.diagnostic.isLocationEnabled().then(function (isAvailable) {
                            var _this = this;
                            if (isAvailable) {
                                self.geolocation.getCurrentPosition().then(function (resp) {
                                    self.loadMap(resp.coords.latitude, resp.coords.longitude);
                                }).catch(function (error) {
                                    _this.util.show_toast('error_22');
                                    self.navCtrl.pop();
                                });
                            }
                            else {
                                self.translateService.get(["ubicacion", "activar_ubicacion", "salir", "activar"]).subscribe(function (res) {
                                    var confirm = self.alertCtrl.create({
                                        title: res.ubicacion,
                                        message: res.activar_ubicacion,
                                        buttons: [
                                            {
                                                text: res.salir,
                                                handler: function () {
                                                    if (self.platform.is('android')) {
                                                        self.platform.exitApp();
                                                    }
                                                    else {
                                                        self.navCtrl.pop();
                                                        self.util.show_toast('error_16');
                                                    }
                                                }
                                            },
                                            {
                                                text: res.activar,
                                                handler: function () {
                                                    self.diagnostic.switchToLocationSettings();
                                                }
                                            }
                                        ]
                                    });
                                    confirm.present();
                                }, function () {
                                    _this.util.show_toast('error_22');
                                    self.navCtrl.pop();
                                });
                            }
                        }).catch(function (error) {
                            _this.util.show_toast('error_22');
                            self.navCtrl.pop();
                        });
                    }
                    else {
                        self.translateService.get(["ubicacion", "mensaje_ubicacion", "salir", "activar"]).subscribe(function (res) {
                            var confirm = self.alertCtrl.create({
                                title: res.ubicacion,
                                message: res.mensaje_ubicacion,
                                buttons: [
                                    {
                                        text: res.salir,
                                        handler: function () {
                                            if (self.platform.is('android')) {
                                                self.platform.exitApp();
                                            }
                                            else {
                                                self.navCtrl.pop();
                                                self.util.show_toast('error_16');
                                            }
                                        }
                                    },
                                    {
                                        text: res.activar,
                                        handler: function () {
                                            self.diagnostic.requestLocationAuthorization().then(function (status) {
                                                if (status == 'GRANTED' || status == 'authorized_when_in_use' || status == 'authorized') {
                                                    self.get_location();
                                                }
                                                else {
                                                    if (self.platform.is('android')) {
                                                        self.platform.exitApp();
                                                    }
                                                    else {
                                                        self.navCtrl.pop();
                                                        self.util.show_toast('error_16');
                                                    }
                                                }
                                            }).catch(function (error) {
                                            });
                                        }
                                    }
                                ]
                            });
                            confirm.present();
                        }, function () {
                            _this.util.show_toast('error_22');
                            self.navCtrl.pop();
                        });
                    }
                }).catch(function () {
                    this.util.show_toast('error_22');
                    self.navCtrl.pop();
                });
            }
            else {
                //Obtengo las coordenadas actuales
                var latitude = self.util.getPreference(self.util.constants.latitude);
                var longitude = self.util.getPreference(self.util.constants.longitude);
                self.loadMap(latitude, longitude);
            }
        }
        else {
            var latitude = self.util.getPreference(self.util.constants.latitude);
            var longitude = self.util.getPreference(self.util.constants.longitude);
            self.loadMap(latitude, longitude);
        }
    };
    MapPage.prototype.loadMap = function (latitude, longitude) {
        var self = this;
        var latLng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.map.addListener('click', function (e) {
            self.addMarket(e.latLng);
        });
        this.addMarket(latLng);
    };
    MapPage.prototype.addMarket = function (myLatlng) {
        if (this.marker != null)
            this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            position: myLatlng,
            animation: google.maps.Animation.DROP,
            map: this.map
        });
        this.get_address(myLatlng.lat(), myLatlng.lng());
    };
    MapPage.prototype.get_address = function (latitude, longitude) {
        var self = this;
        this.latitude = latitude;
        this.longitude = longitude;
        this.veporel.get_address(latitude, longitude).subscribe(function (result) {
            if (result != null) {
                //var aux = result.street + " "+ result.houseNumber;
                self.city_name = result.locality;
                self.address = "";
                self.country_code = result.countryCode;
                self.country_name = result.countryName;
                // let body = JSON.parse(result._body);
                // var aux = body.results[0].formatted_address;
                // self.city_name = body.results[0].address_components[5].short_name;
                // self.address = aux;
                self.txt_adress.setFocus();
            }
        }, function (error) {
            self.util.show_toast(error);
        });
    };
    MapPage.prototype.return_new_address = function () {
        var parameters = {
            address: this.address,
            latitude: this.latitude,
            longitude: this.longitude,
            city_name: this.city_name,
            country_code: this.country_code,
            country_name: this.country_name
        };
        this.util.savePreference(this.util.constants.address, "true");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */], parameters);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], MapPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('txt_adress'),
        __metadata("design:type", Object)
    ], MapPage.prototype, "txt_adress", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/map/map.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n	<div #map id="map"></div>\n</ion-content>\n\n<ion-footer>\n	<ion-toolbar>\n		<ion-list>\n			<ion-item>\n				<ion-label stacked>{{\'address\' | translate}}</ion-label>\n				<ion-input #txt_adress type="text" [(ngModel)]="city_name" placeholder="{{\'obteniendo_direccion\' | translate}}" text-center disable="true" readonly></ion-input>\n			</ion-item>\n		</ion-list>\n		<button ion-button block (click)="return_new_address()">\n			{{\'aceptar\' | translate}}\n		</button>\n	</ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/map/map.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_4__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_4__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ForgetPasswordPage = /** @class */ (function () {
    function ForgetPasswordPage(navCtrl, navParams, util, veporel) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.veporel = veporel;
        this.account = {
            email: '',
            temp_password: 0,
            new_password: '',
            new_password_r: ''
        };
        this.step = 1;
        //Determino si ya existe algún usuario
        this.account.email = this.util.getPreference("email_temp");
    }
    ForgetPasswordPage.prototype.send_temp_password = function () {
        var _this = this;
        if (this.account.email) {
            this.veporel.recovery_password(this.account.email).subscribe(function (result) {
                _this.util.savePreference("email_temp", _this.account.email);
                _this.util.show_toast('envio_contrasena_temporal');
                _this.next_step();
            }, function (err) {
                _this.util.show_toast('error_12');
            });
        }
        else {
            this.util.show_toast('error_1');
        }
    };
    ForgetPasswordPage.prototype.next_step = function () {
        this.step = 2;
    };
    ForgetPasswordPage.prototype.reset_password = function () {
        var _this = this;
        if (this.account.temp_password) {
            if (this.account.new_password) {
                if (this.account.new_password == this.account.new_password_r) {
                    this.veporel.reset_password(this.account.email, this.account.temp_password, this.account.new_password).subscribe(function (result) {
                        _this.util.savePreference("email_temp", "");
                        _this.util.show_toast('reset_password_ok');
                        _this.next_step();
                    }, function (err) {
                        try {
                            var body = JSON.parse(err._body);
                            _this.util.show_toast(body.message);
                        }
                        catch (e) {
                            _this.util.show_toast('error_12');
                        }
                    });
                }
                else {
                    this.util.show_toast('error_3');
                }
            }
            else {
                this.util.show_toast('error_4');
            }
        }
        else {
            this.util.show_toast('error_2');
        }
    };
    ForgetPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-forget-password',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/forget-password/forget-password.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'recuperar_contrasena\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div *ngIf="step==1">\n      <ion-list>\n        <ion-item>\n          <ion-label stacked>{{ \'email\' | translate }}</ion-label>\n          <ion-input type="email" [(ngModel)]="account.email" name="username" placeholder="email@email.com"></ion-input>\n        </ion-item>\n        <div padding>\n          <button ion-button color="primary" block (click)="send_temp_password()">{{ \'recibir_contrasena_temp\' | translate }}</button>\n          <button ion-button color="primary" block (click)="next_step()">{{ \'ya_tengo_contrasena_temp\' | translate }}</button>\n        </div>\n      </ion-list>\n    </div>\n    <div *ngIf="step==2">\n      <ion-list>\n        <ion-item>\n          <ion-label stacked>{{ \'contrasena_temporal\' | translate }}</ion-label>\n          <ion-input type="number" [(ngModel)]="account.temp_password" name="contrasena_temporal" placeholder="{{\'contrasena_temporal\' | translate }}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label stacked>{{ \'nueva_contrasena\' | translate }}</ion-label>\n          <ion-input type="password" [(ngModel)]="account.new_password" name="password" placeholder="{{ \'nueva_contrasena\' | translate }}"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label stacked>{{ \'repetir_contrasena\' | translate }}</ion-label>\n          <ion-input type="password" [(ngModel)]="account.new_password_r" name="password" placeholder="{{ \'repetir_contrasena\' | translate }}"></ion-input>\n        </ion-item>\n        <div padding>\n          <button ion-button color="primary" block (click)="reset_password()">{{ \'finalizar\' | translate }}</button>\n        </div>\n      </ion-list>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/forget-password/forget-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */]])
    ], ForgetPasswordPage);
    return ForgetPasswordPage;
}());

//# sourceMappingURL=forget-password.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResentEmailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResentEmailPage = /** @class */ (function () {
    function ResentEmailPage(navCtrl, navParams, util, veporel) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.veporel = veporel;
        this.account = {
            email: ''
        };
        //Determino si ya existe algún usuario
        this.account.email = this.util.getPreference("email_temp");
    }
    ResentEmailPage.prototype.resent_email = function () {
        var _this = this;
        if (this.account.email) {
            this.veporel.resent_email(this.account.email).subscribe(function (result) {
                _this.util.show_toast('email_sent');
                _this.navCtrl.pop();
            }, function (err) {
                _this.util.show_toast('error_12');
            });
        }
        else {
            this.util.show_toast('error_1');
        }
    };
    ResentEmailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-resent-email',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/resent-email/resent-email.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'resent\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>\n    <ion-list>\n      <ion-item>\n        <ion-label stacked>{{ \'email\' | translate }}</ion-label>\n        <ion-input type="email" [(ngModel)]="account.email" name="username" placeholder="email@email.com"></ion-input>\n      </ion-item>\n      <div padding>\n        <button ion-button color="primary" block (click)="resent_email()">{{ \'resent\' | translate }}</button>\n      </div>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/resent-email/resent-email.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */]])
    ], ResentEmailPage);
    return ResentEmailPage;
}());

//# sourceMappingURL=resent-email.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__welcome_welcome__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, user, navParams, translateService, geolocation, util, veporel, diagnostic, platform, alertCtrl, translate) {
        this.navCtrl = navCtrl;
        this.user = user;
        this.navParams = navParams;
        this.translateService = translateService;
        this.geolocation = geolocation;
        this.util = util;
        this.veporel = veporel;
        this.diagnostic = diagnostic;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.account = {
            username: "",
            password: "",
            names: "",
            last_name: "",
            cellphone: "",
            push_code: "",
            notifications: 0,
            birthday: "",
            sex: "",
            subcategories: [],
            country_name: "",
            country_code: "",
            departament_name: "",
            city_name: "",
            r_password: "",
            refer_code: ""
        };
        this.signup_by_facebook = false;
        this.account.username = this.navParams.get('username');
        this.account.password = this.navParams.get('password');
        this.account.r_password = this.navParams.get('password');
        if (this.account.password)
            this.signup_by_facebook = true;
        this.account.names = this.navParams.get('names');
        this.account.last_name = this.navParams.get('last_name');
        this.get_messages();
        this.get_location();
        this.veporel.get_translation();
    }
    SignupPage.prototype.ionViewWillEnter = function () {
    };
    SignupPage.prototype.get_messages = function () {
        var self = this;
        self.translateService.get([
            'SIGNUP_ERROR',
            'error_3',
            'obteniendo_tu_ubicacion',
            'registrando',
            'SERVER_ERROR'
        ]).subscribe(function (value) {
            self.messages = value;
        }, function (err) {
            alert(err);
        });
    };
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        var self = this;
        if (this.account.r_password == self.account.password) {
            var dialog_1 = self.util.show_dialog(self.messages.registrando);
            if (!self.account.birthday) {
                self.account.birthday = "2017-01-01";
            }
            if (!self.account.sex) {
                self.account.sex = "M";
            }
            if (!self.account.cellphone) {
                self.account.cellphone = "0000000000";
            }
            this.user.signup(self.account).subscribe(function (resp) {
                dialog_1.dismiss();
                self.util.show_toast("validate_email");
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__welcome_welcome__["a" /* WelcomePage */]);
            }, function (err) {
                dialog_1.dismiss();
                try {
                    var body = JSON.parse(err._body);
                    if (body.code == "-1") {
                        self.util.show_toast("error_19");
                    }
                    else {
                        self.util.show_toast(self.messages.SERVER_ERROR);
                    }
                }
                catch (e) {
                    self.util.show_toast(self.messages.SERVER_ERROR);
                }
            });
        }
        else {
            // Unable to sign up
            self.util.show_toast("error_3");
        }
    };
    SignupPage.prototype.showPassword = function () {
        this.inputP.type = this.inputP.type === 'password' ? 'text' : 'password';
        this.inputRP.type = this.inputRP.type === 'password' ? 'text' : 'password';
    };
    SignupPage.prototype.get_location = function () {
        var self = this;
        var dialog = this.util.show_dialog(this.messages.obteniendo_tu_ubicacion);
        self.veporel.get_coordenates(dialog).subscribe(function (location) {
            switch (location.code) {
                case 1:
                    self.veporel.get_address(location.lat, location.lon, true).subscribe(function (result) {
                        dialog.dismiss();
                        self.account.country_name = result.countryName;
                        self.account.country_code = result.countryCode;
                        self.account.city_name = result.locality;
                    }, function (error) {
                        dialog.dismiss();
                        self.util.setLogs(JSON.stringify(error));
                        self.translate.get(["ubicacion", "error_22", "reintentar", "salir"]).subscribe(function (res) {
                            var confirm = self.alertCtrl.create({
                                title: res.ubicacion,
                                message: res.error_22,
                                buttons: [
                                    {
                                        text: res.salir,
                                        handler: function () {
                                            if (self.platform.is('android')) {
                                                self.platform.exitApp();
                                            }
                                            else {
                                                self.util.show_toast('error_22');
                                            }
                                        }
                                    },
                                    {
                                        text: res.reintentar,
                                        handler: function () {
                                            self.get_location();
                                        }
                                    }
                                ]
                            });
                            confirm.present();
                        });
                    });
                    break;
                case 6:
                    self.get_location();
                    break;
                case 3:
                    self.navCtrl.pop();
                    self.diagnostic.switchToLocationSettings();
                    break;
            }
        }, function (err) {
            dialog.dismiss();
            self.util.setLogs(JSON.stringify(err));
            switch (err.code) {
                case 3:
                case 5:
                case 7:
                    self.util.show_toast('error_16');
                    self.navCtrl.pop();
                    break;
                case 1:
                case 2:
                    var confirm_1 = self.alertCtrl.create({
                        title: self.messages.ubicacion,
                        message: self.messages.error_22,
                        buttons: [
                            {
                                text: self.messages.salir,
                                handler: function () {
                                    if (self.platform.is('android')) {
                                        self.platform.exitApp();
                                    }
                                    else {
                                        self.util.show_toast('error_22');
                                    }
                                }
                            },
                            {
                                text: self.messages.reintentar,
                                handler: function () {
                                    self.get_location();
                                }
                            }
                        ]
                    });
                    confirm_1.present();
                    break;
                default:
                    self.util.show_toast(err.message);
                    break;
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('password'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "inputP", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('r_password'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "inputRP", void 0);
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/signup/signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'SIGNUP_TITLE\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form (submit)="doSignup()">\n    <ion-list>\n      <ion-item>\n        <ion-label stacked>{{ \'pais\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="account.country_name" name="country_name" [disabled]=true value="{{account.country_name}}"></ion-input>\n      </ion-item>\n      <ion-item *ngIf="account.country_name">\n        <ion-label stacked>{{ \'ciudad\' | translate }}</ion-label>\n        <ion-input type="text" [(ngModel)]="account.city_name" name="city_name" [disabled]=true value="{{account.city_name}}"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>{{ \'nombres\' | translate }}</ion-label>\n        <ion-input placeholder="{{\'nombres\' | translate}}" type="name" [(ngModel)]="account.names" name="names" ></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>{{ \'apellidos\' | translate }}</ion-label>\n        <ion-input placeholder="{{\'apellidos\' | translate}}" type="name" [(ngModel)]="account.last_name" name="last_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>\n          {{ \'fecha_nacimiento\' | translate }}\n          <ng-container *ngIf="!platform.is(\'android\')">\n            {{ \'optional\' | translate }}\n          </ng-container>\n\n        </ion-label>\n        <ion-datetime displayFormat="YYYY-MM-DD" pickerFormat="YYYY-MMMM-DD" [(ngModel)]="account.birthday" name="birthday" placeholder="{{\'fecha_nacimiento\' | translate}}" cancelText="{{\'Cancel\' | translate}}" doneText="{{\'Done\' | translate}}"></ion-datetime>\n        <!--<ion-input placeholder="{{\'fecha_nacimiento\' | translate}}" type="name" [(ngModel)]="account.birthday" name="birthday" (click)="showCalendar()" readonly></ion-input>-->\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>\n          {{ \'sex\' | translate }}\n          <ng-container *ngIf="!platform.is(\'android\')">\n            {{ \'optional\' | translate }}\n          </ng-container>\n        </ion-label>\n        <ion-select placeholder="{{\'escoger_sexo\' | translate}}" [(ngModel)]="account.sex" name="sex" cancelText="{{\'Cancel\' | translate}}" okText="{{\'Done\' | translate}}">\n          <ion-option value="M">Masculino</ion-option>\n          <ion-option value="F">Femenino</ion-option>\n          <ion-option value="O">Otro</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>\n          {{ \'celular\' | translate }}\n          <ng-container *ngIf="!platform.is(\'android\')">\n            {{ \'optional\' | translate }}\n          </ng-container>\n        </ion-label>\n        <ion-input placeholder="{{\'celular\' | translate}}" type="number" [(ngModel)]="account.cellphone" name="cellphone"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>{{ \'email\' | translate }}</ion-label>\n        <ion-input placeholder="{{\'email\' | translate}}" type="email" [(ngModel)]="account.username" name="username"></ion-input>\n      </ion-item>\n\n      <ion-item *ngIf="!signup_by_facebook">\n        <ion-label stacked>{{ \'password\' | translate }}</ion-label>\n        <ion-input #password id="password" placeholder="{{\'password\' | translate}}" type="password" [(ngModel)]="account.password" name="password"></ion-input>\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!signup_by_facebook">\n        <ion-label stacked>{{ \'repetir_contrasena\' | translate }}</ion-label>\n        <ion-input #r_password id="r_password" placeholder="{{\'repetir_contrasena\' | translate}}" type="password" [(ngModel)]="account.r_password" name="r_password"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label for="checkbox" *ngIf="!passwordCheckbox">{{\'mostrar_contrasena\'| translate}}</ion-label>\n        <ion-label for="checkbox" *ngIf="passwordCheckbox">{{\'ocultar_contrasena\' | translate}}</ion-label>\n        <ion-checkbox  class="marginTop" id="checkbox" name="checkbox" style="border-style: none;" [(ngModel)]="passwordCheckbox" (click)="showPassword()"></ion-checkbox>\n      </ion-item>\n\n      <ion-item text-wrap>\n        <ion-label> {{ \'infor_alertas\' | translate }}</ion-label>\n        <ion-toggle [(ngModel)]="account.notifications" checked="false" name="notifications"></ion-toggle>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked>{{ \'codigo_referido\' | translate }}</ion-label>\n        <ion-input placeholder="{{\'codigo_referido\' | translate}}" type="text" [(ngModel)]="account.refer_code" name="refer_code"></ion-input>\n      </ion-item>\n      <div padding>\n        <button ion-button color="primary" block>{{ \'registrar\' | translate }}</button>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user__["a" /* User */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_3__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HelpPage = /** @class */ (function () {
    function HelpPage(navCtrl, navParams, veporel, util, toastCtrl, translate, socialSharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.socialSharing = socialSharing;
    }
    HelpPage.prototype.send = function () {
        var _this = this;
        var self = this;
        this.veporel.send_message(this.message).subscribe(function (result) {
            _this.translate.get([
                "mensaje_enviado_exito"
            ]).subscribe(function (values) {
                var toast = _this.toastCtrl.create({
                    message: values.mensaje_enviado_exito,
                    position: 'bottom',
                    duration: 3000
                });
                toast.present();
                self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
            });
        }, function (error) {
            _this.translate.get([
                "error_11"
            ]).subscribe(function (values) {
                var toast = _this.toastCtrl.create({
                    message: values.error_11,
                    position: 'bottom',
                    duration: 3000
                });
                toast.present();
            });
        });
    };
    HelpPage.prototype.share = function () {
        this.socialSharing.shareViaWhatsAppToReceiver("+573193811648", this.message, '', '').then(function () {
        }).catch(function () {
        });
    };
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-help',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/help/help.html"*/'<ion-header>\n  <ion-navbar>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content padding >\n  <h2 text-center>{{\'en_que_podriamos_ayudarte\' | translate}}</h2>\n  <ion-list>\n    <ion-item>\n      <ion-textarea [(ngModel)]="message" clearInput></ion-textarea>\n    </ion-item>\n  </ion-list>\n\n\n  <button ion-button block (click)="send()">\n  {{\'enviar\' | translate}}\n  </button>\n  <button ion-button block (click)="share()" icon-start>\n    <ion-icon name="logo-whatsapp"></ion-icon> 	&nbsp;\n    {{\'Whatsapp\' | translate}}\n  </button>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/help/help.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OptionsPage = /** @class */ (function () {
    function OptionsPage(navCtrl, navParams, util, socialSharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.socialSharing = socialSharing;
        //Obtengo la inforacion del usuario
        this.user = JSON.parse(this.util.getPreference(this.util.constants.user));
        try {
            if (this.user.debuger)
                this.user.debuger = true;
            else
                this.user.debuger = false;
        }
        catch (e) {
            this.user.debuger = false;
        }
        this.options = JSON.parse(this.util.getPreference("options"));
        if (!this.options) {
            this.options = {
                notifications: true,
                range: 2,
                debug: false
            };
        }
        this.logs = this.util.getLogs();
    }
    OptionsPage.prototype.ionViewWillEnter = function () {
        this.logs = this.util.getLogs();
    };
    OptionsPage.prototype.clear_logs = function () {
        this.util.clearLogs();
        this.logs = "";
    };
    OptionsPage.prototype.save_options = function () {
        this.util.savePreference("options", JSON.stringify(this.options));
        this.navCtrl.pop();
    };
    OptionsPage.prototype.share = function () {
        this.socialSharing.share(this.logs, 'VePorEl', []).then(function () {
        }).catch(function (e) {
            alert(e);
        });
    };
    OptionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-options',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/options/options.html"*/'<ion-header>\n  <ion-navbar>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content padding >\n    <h2 text-center>{{\'opciones\' | translate}}</h2>\n    <ion-list>\n      <ion-item>\n        <ion-label>{{\'notificaciones\' | translate}}</ion-label>\n         <ion-toggle item-end [(ngModel)]="options.notifications" name="notifications"></ion-toggle>\n      </ion-item>\n      <ion-item>\n        <ion-label style="color: #000;">{{\'rango\' | translate}}</ion-label>\n        <ion-select [(ngModel)]="options.range" item-end name="range">\n          <ion-option value="1">1 Km</ion-option>\n          <ion-option value="2">2 Km</ion-option>\n          <ion-option value="3">3 Km</ion-option>\n          <ion-option value="4">4 Km</ion-option>\n          <ion-option value="5">5 Km</ion-option>\n          <ion-option value="10">10 Km</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item *ngIf="user.debuger">\n        <ion-label>Debug</ion-label>\n        <ion-toggle item-end [(ngModel)]="options.debug" name="debug"></ion-toggle>\n      </ion-item>\n      <ion-item *ngIf="user.debuger">\n        <ion-label>Logs</ion-label>\n        <ion-textarea value="{{logs}}"></ion-textarea>\n      </ion-item>\n    </ion-list>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6-auto>\n        <button ion-button block (click)="save_options()">\n          {{\'guardar\' | translate}}\n        </button>\n      </ion-col>\n\n    </ion-row>\n    <ion-row *ngIf="user.debuger">\n      <ion-col col-6-auto>\n        <button ion-button block (click)="clear_logs()">\n          Limpiar Logs\n        </button>\n      </ion-col>\n      <ion-col col-6-auto>\n        <button ion-button block (click)="share()">\n          Compartir Logs\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/options/options.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */]])
    ], OptionsPage);
    return OptionsPage;
}());

//# sourceMappingURL=options.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__welcome_welcome__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__help_help__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__options_options__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__information_information__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__find_promotios_find_promotios__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, util, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.menuCtrl = menuCtrl;
        this.isLogged = false;
        this.version = '';
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.loginPage = __WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */];
        this.homePage = MenuPage_1;
        this.informationPage = __WEBPACK_IMPORTED_MODULE_8__information_information__["a" /* InformationPage */];
        this.helpPage = __WEBPACK_IMPORTED_MODULE_6__help_help__["a" /* HelpPage */];
        this.optionsPage = __WEBPACK_IMPORTED_MODULE_7__options_options__["a" /* OptionsPage */];
    }
    MenuPage_1 = MenuPage;
    MenuPage.prototype.ionViewDidLoad = function () {
        if (this.util.getPreference(this.util.constants.logged)) {
            this.isLogged = true;
            this.user = JSON.parse(this.util.getPreference(this.util.constants.user));
        }
    };
    MenuPage.prototype.pushPage = function (p) {
        this.menuCtrl.close();
        this.navCtrl.push(p);
    };
    MenuPage.prototype.openPage = function (p) {
        this.menuCtrl.close();
        //this.rootPage = p;
        this.navCtrl.setRoot(p);
    };
    MenuPage.prototype.logout = function () {
        this.util.clearAllData();
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__welcome_welcome__["a" /* WelcomePage */];
        // this.navCtrl.setRoot(WelcomePage);
        this.menuCtrl.close();
    };
    MenuPage.prototype.go_to_offers = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__find_promotios_find_promotios__["a" /* FindPromotiosPage */], {
            "type_find_promotio": this.util.constants.find_promotion_by_user_id
        });
    };
    MenuPage.prototype.go_to_information_page = function (option) {
        this.navCtrl.push(this.informationPage, {
            "option": option
        });
    };
    MenuPage = MenuPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-menu',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/menu/menu.html"*/'<ion-menu [content]="content" persistent="true" side="right" *ngIf="isLogged==true">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Hola {{user.names}}</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list inset >\n      <button ion-item (click)="openPage(homePage)">\n        <ion-icon name="home"></ion-icon>\n        {{\'inicio\' | translate}}\n      </button>\n      <button ion-item (click)="pushPage(optionsPage)">\n        <ion-icon name="settings"></ion-icon>\n        {{\'opciones\' | translate}}\n      </button>\n      <button ion-item (click)="go_to_offers()">\n        <ion-icon name="logo-buffer"></ion-icon>\n        {{\'mis_promociones\' | translate}}\n      </button>\n      <button ion-item (click)="pushPage(helpPage)">\n        <ion-icon name="mail"></ion-icon>\n        {{\'help\' | translate}}\n      </button>\n      <button ion-item (click)="go_to_information_page(1)">\n        <ion-icon name="help-circle"></ion-icon>\n        {{\'como_funciona_text\' | translate}}\n      </button>\n      <button ion-item (click)="go_to_information_page(2)">\n        <ion-icon name="information-circle"></ion-icon>\n        {{\'legal_text\' | translate}}\n      </button>\n      <button ion-item (click)="logout()">\n        <ion-icon name="log-out"></ion-icon>\n        {{\'logout\' | translate}}\n      </button>\n      <ion-item>\n        {{\'version\' | translate}}: {{util.version}}\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/menu/menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_util__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */]])
    ], MenuPage);
    return MenuPage;
    var MenuPage_1;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the InformationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var InformationPage = /** @class */ (function () {
    function InformationPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.option = this.navParams.get('option');
    }
    InformationPage.prototype.ionViewDidLoad = function () {
    };
    InformationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-information',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/information/information.html"*/'\n<ion-header>\n  <ion-navbar>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content padding="">\n<div *ngIf="option==1">\n  <h2 text-center>{{\'como_funciona_text\'| translate}}</h2>\n  <p [innerHTML]="\'como_funciona\'| translate" text-wrap text-justify></p>\n</div>\n  <div *ngIf="option==2">\n    <h2 text-center>{{\'legal_text\'| translate}}</h2>\n    <p [innerHTML]="\'info_legal\'| translate" text-wrap text-justify></p>\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/information/information.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], InformationPage);
    return InformationPage;
}());

//# sourceMappingURL=information.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TutorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_menu__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TutorialPage = /** @class */ (function () {
    function TutorialPage(navCtrl, menu, translate, util, user) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.util = util;
        this.user = user;
        this.showSkip = true;
        this.account = {
            username: '',
            password: '',
            push_code: ''
        };
        this.util.savePreference(this.util.constants.language, navigator.language.split('-')[0]);
        //Valido si ya vio o no el tutorial
        if (!this.util.getPreference(this.util.constants.tutorial)) {
            translate.get(["TUTORIAL_SLIDE1_TITLE",
                "TUTORIAL_SLIDE1_DESCRIPTION",
                "TUTORIAL_SLIDE2_TITLE",
                "TUTORIAL_SLIDE2_DESCRIPTION",
                "TUTORIAL_SLIDE3_TITLE",
                "TUTORIAL_SLIDE3_DESCRIPTION",
                'LOGIN_ERROR', 'SERVER_ERROR', 'validando_informacion'
            ]).subscribe(function (values) {
                _this.messages = values;
                _this.slides = [
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
                    }
                ];
            });
        }
        else {
            if (this.util.getPreference(this.util.constants.logged)) {
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */], {}, {
                    animate: true,
                    direction: 'forward'
                });
            }
            else {
                this.startApp();
            }
        }
    }
    TutorialPage.prototype.startApp = function () {
        this.doLogin();
        /*this.navCtrl.setRoot(WelcomePage, {}, {
          animate: true,
          direction: 'forward'
        });*/
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    TutorialPage.prototype.ionViewWillLeave = function () {
        this.util.savePreference(this.util.constants.tutorial, true);
        this.menu.enable(true);
    };
    TutorialPage.prototype.doLogin = function () {
        var dialog = this.util.show_dialog(this.messages.validando_informacion);
        var self = this;
        this.account.username = "demo@veporel.com";
        this.account.password = "demo123";
        this.user.login(this.account).subscribe(function (resp) {
            dialog.dismiss();
            self.util.savePreference(self.util.constants.logged, true);
            self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__menu_menu__["a" /* MenuPage */]);
        }, function (err) {
            dialog.dismiss();
            try {
                var body = JSON.parse(err._body);
                if (body.code == -1) {
                    self.util.show_toast(self.messages.LOGIN_ERROR);
                }
                else if (body.code == -2) {
                    self.util.show_toast("error_20");
                }
                else if (body.code == -3) {
                    self.util.show_toast("error_21");
                }
            }
            catch (e) {
                self.util.show_toast(self.messages.SERVER_ERROR);
            }
        });
    };
    TutorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tutorial',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/tutorial/tutorial.html"*/'<ion-header no-shadow>\n  <ion-navbar>\n    <ion-buttons end>\n      <button ion-button (click)="startApp()" color="primary" *ngIf="showSkip">\n        {{ \'TUTORIAL_SKIP_BUTTON\' | translate}}\n      </button>\n      <button ion-button (click)="startApp()" color="primary" *ngIf="!showSkip">\n        {{ \'TUTORIAL_CONTINUE_BUTTON\' | translate }}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n  <ion-slides pager="true" (ionSlideWillChange)="onSlideChangeStart($event)">\n    <ion-slide *ngFor="let slide of slides">\n      <img [src]="slide.image" class="slide-image" />\n      <!--<h2 class="slide-title" [innerHTML]="slide.title"></h2>\n      <p [innerHTML]="slide.description" text-justify scr></p>-->\n\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/tutorial/tutorial.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_util__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user__["a" /* User */]])
    ], TutorialPage);
    return TutorialPage;
}());

//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(410);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_share__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var User = /** @class */ (function () {
    function User(http, api, util) {
        this.http = http;
        this.api = api;
        this.util = util;
    }
    User.prototype.login = function (accountInfo) {
        var _this = this;
        accountInfo.push_code = this.util.getPreference(this.util.constants.push_code);
        var seq = this.api.post('login', accountInfo).share();
        seq
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // If the API returned a successful response, mark the user as logged in
            if (res != null) {
                _this._loggedIn(res);
            }
            else {
            }
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    User.prototype.signup = function (accountInfo) {
        var _this = this;
        var seq = this.api.post('register', accountInfo).share();
        seq
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            // If the API returned a successful response, mark the user as logged in
            if (res.status == 'success') {
                _this._loggedIn(res);
            }
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    User.prototype.logout = function () {
        this._user = null;
    };
    User.prototype._loggedIn = function (resp) {
        this.util.savePreference(this.util.constants.logged, true);
        this.util.savePreference(this.util.constants.user, JSON.stringify(resp.user));
        this.util.savePreference(this.util.constants.token, resp.token);
        this.util.savePreference(this.util.constants.topics, JSON.stringify(resp.categories));
    };
    User = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__api__["a" /* Api */], __WEBPACK_IMPORTED_MODULE_3__util__["a" /* Util */]])
    ], User);
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* unused harmony export declarations */
/* unused harmony export entryComponents */
/* unused harmony export providers */
/* unused harmony export MyErrorHandler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_map_map__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tutorial_tutorial__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_welcome_welcome__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_find_promotios_find_promotios__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_categories_categories__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_subcategories_subcategories__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_offer_offer__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_map_offer_map_offer__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_calification_calification__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_information_information__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_help_help__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_forget_password_forget_password__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_options_options__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_directory_directory__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_companies_companies__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_company_company__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_resent_email_resent_email__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_exporters_exporters__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_exporter_exporter__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_api__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_user__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_veporel__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_google_maps__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_splash_screen__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ngx_translate_http_loader__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_geolocation__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_push__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40_ionic_image_loader__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_angular2_moment__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_41_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_ionic2_rating__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_facebook__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_social_sharing__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_native_geocoder__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_google_analytics__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_screen_orientation__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_angular2_qrcode__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_diagnostic__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_speech_recognition__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_launch_navigator__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_is_debug__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ionic_native_http__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_pro__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_pro___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_54__ionic_pro__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
























































// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_37__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
var pages = [
    __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
    __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_6__pages_map_map__["a" /* MapPage */],
    __WEBPACK_IMPORTED_MODULE_7__pages_menu_menu__["a" /* MenuPage */],
    __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
    __WEBPACK_IMPORTED_MODULE_9__pages_tutorial_tutorial__["a" /* TutorialPage */],
    __WEBPACK_IMPORTED_MODULE_10__pages_welcome_welcome__["a" /* WelcomePage */],
    __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_12__pages_find_promotios_find_promotios__["a" /* FindPromotiosPage */],
    __WEBPACK_IMPORTED_MODULE_13__pages_categories_categories__["a" /* CategoriesPage */],
    __WEBPACK_IMPORTED_MODULE_14__pages_subcategories_subcategories__["a" /* SubcategoriesPage */],
    __WEBPACK_IMPORTED_MODULE_15__pages_offer_offer__["a" /* OfferPage */],
    __WEBPACK_IMPORTED_MODULE_16__pages_map_offer_map_offer__["a" /* MapOfferPage */],
    __WEBPACK_IMPORTED_MODULE_17__pages_calification_calification__["a" /* CalificationPage */],
    __WEBPACK_IMPORTED_MODULE_18__pages_information_information__["a" /* InformationPage */],
    __WEBPACK_IMPORTED_MODULE_19__pages_help_help__["a" /* HelpPage */],
    __WEBPACK_IMPORTED_MODULE_20__pages_forget_password_forget_password__["a" /* ForgetPasswordPage */],
    __WEBPACK_IMPORTED_MODULE_21__pages_options_options__["a" /* OptionsPage */],
    __WEBPACK_IMPORTED_MODULE_22__pages_directory_directory__["a" /* DirectoryPage */],
    __WEBPACK_IMPORTED_MODULE_23__pages_companies_companies__["a" /* CompaniesPage */],
    __WEBPACK_IMPORTED_MODULE_24__pages_company_company__["a" /* CompanyPage */],
    __WEBPACK_IMPORTED_MODULE_25__pages_resent_email_resent_email__["a" /* ResentEmailPage */],
    __WEBPACK_IMPORTED_MODULE_26__pages_exporters_exporters__["a" /* ExportersPage */],
    __WEBPACK_IMPORTED_MODULE_27__pages_exporter_exporter__["a" /* ExporterPage */]
];
function declarations() {
    return pages;
}
function entryComponents() {
    return pages;
}
function providers() {
    return [
        __WEBPACK_IMPORTED_MODULE_28__providers_api__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_29__providers_user__["a" /* User */],
        __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_33__ionic_native_google_maps__["a" /* GoogleMaps */],
        __WEBPACK_IMPORTED_MODULE_34__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_35__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_30__providers_util__["a" /* Util */],
        __WEBPACK_IMPORTED_MODULE_31__providers_veporel__["a" /* VePorEl */],
        __WEBPACK_IMPORTED_MODULE_38__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_43__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_44__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_45__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
        __WEBPACK_IMPORTED_MODULE_46__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
        __WEBPACK_IMPORTED_MODULE_47__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
        __WEBPACK_IMPORTED_MODULE_49__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_50__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
        __WEBPACK_IMPORTED_MODULE_51__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
        __WEBPACK_IMPORTED_MODULE_39__ionic_native_push__["a" /* Push */],
        __WEBPACK_IMPORTED_MODULE_52__ionic_native_is_debug__["a" /* IsDebug */],
        __WEBPACK_IMPORTED_MODULE_53__ionic_native_http__["a" /* HTTP */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */],
        [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: MyErrorHandler }]
    ];
}
__WEBPACK_IMPORTED_MODULE_54__ionic_pro__["Pro"].init('961c5b67', {
    appVersion: '2.6.1'
});
var MyErrorHandler = /** @class */ (function () {
    function MyErrorHandler(injector) {
        try {
            this.ionicErrorHandler = injector.get(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */]);
        }
        catch (e) {
            // Unable to get the IonicErrorHandler provider, ensure
            // IonicErrorHandler has been added to the providers list below
        }
    }
    MyErrorHandler.prototype.handleError = function (err) {
        __WEBPACK_IMPORTED_MODULE_54__ionic_pro__["Pro"].monitoring.handleNewError(err);
        // Remove this if you want to disable Ionic's auto exception handling
        // in development mode.
        this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
    };
    MyErrorHandler = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], MyErrorHandler);
    return MyErrorHandler;
}());

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: declarations(),
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                //IonicModule.forRoot(MyApp),
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]),
                __WEBPACK_IMPORTED_MODULE_36__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_36__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: HttpLoaderFactory,
                        deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {
                    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_40_ionic_image_loader__["b" /* IonicImageLoader */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_41_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_42_ionic2_rating__["a" /* Ionic2RatingModule */],
                __WEBPACK_IMPORTED_MODULE_48_angular2_qrcode__["a" /* QRCodeModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicApp */]],
            entryComponents: entryComponents(),
            providers: providers()
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindPromotiosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__offer_offer__ = __webpack_require__(231);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the FindPromotiosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FindPromotiosPage = /** @class */ (function () {
    function FindPromotiosPage(navCtrl, navParams, veporel, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
    }
    FindPromotiosPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var self = this;
        try {
            this.type_find_promotion = this.navParams.get(this.util.constants.type_find_promotio);
            if (this.type_find_promotion && this.type_find_promotion == this.util.constants.find_promotio_by_location) {
                var latitude = this.navParams.get(this.util.constants.latitude);
                var longitude = this.navParams.get(this.util.constants.longitude);
                self.veporel.get_promotions_by_location(latitude, longitude).subscribe(function (result) {
                    if (result != null) {
                        self.promotions = JSON.parse(result._body);
                        if (self.promotions.length == 0) {
                            self.navCtrl.pop();
                            _this.util.show_toast('error_13');
                        }
                    }
                }, function (error) {
                });
            }
            else if (this.type_find_promotion && this.type_find_promotion == this.util.constants.find_promotion_by_category) {
                var category_name = this.navParams.get(this.util.constants.category_name);
                self.veporel.get_offers_by_category(category_name).subscribe(function (result) {
                    if (result != null) {
                        self.promotions = JSON.parse(result._body);
                        if (self.promotions.length == 0) {
                            self.navCtrl.pop();
                            _this.util.show_toast('error_13');
                        }
                    }
                }, function (error) {
                });
            }
            else if (this.type_find_promotion && this.type_find_promotion == this.util.constants.find_promotion_by_subcategory_name) {
                var subcategory_name = this.navParams.get(this.util.constants.subcategory_name);
                self.veporel.get_offers_by_subcategory_name(subcategory_name).subscribe(function (result) {
                    if (result != null) {
                        self.promotions = JSON.parse(result._body);
                        if (self.promotions.length == 0) {
                            self.navCtrl.pop();
                            _this.util.show_toast('error_13');
                        }
                    }
                }, function (error) {
                });
            }
            else if (this.type_find_promotion && this.type_find_promotion == this.util.constants.find_promotion_by_user_id) {
                self.veporel.get_offers_by_user_id().subscribe(function (result) {
                    if (result != null) {
                        self.promotions = JSON.parse(result._body);
                        if (self.promotions.length == 0) {
                            self.navCtrl.pop();
                            _this.util.show_toast('error_13');
                        }
                    }
                }, function (error) {
                });
            }
        }
        catch (e) {
        }
    };
    FindPromotiosPage.prototype.transform_distance = function (distance) {
        var d = parseInt((distance * 1).toFixed(0));
        if (d < 1000) {
            return d + " Mts";
        }
        else {
            return (d / 1000).toFixed(0) + " Kms";
        }
    };
    FindPromotiosPage.prototype.go_to_offer = function (offer_id, bid, company_name) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__offer_offer__["a" /* OfferPage */], {
            offer_id: offer_id,
            branch_id: bid,
            company_name: company_name,
        });
    };
    FindPromotiosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-find-promotios',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/find-promotios/find-promotios.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n      <ion-card *ngFor="let promotion of promotions" (click)="go_to_offer(promotion.id, promotion.bid, promotion.c_name)">\n        <img-loader src="{{util.url}}{{promotion.url_photo}}" useImg fallback="assets/img/logo_horizontal.png"></img-loader>\n        <ion-card-content>\n          <ion-card-title>\n            {{promotion.name}}\n          </ion-card-title>\n          <p>\n            {{promotion.description}}\n          </p>\n        </ion-card-content>\n        <ion-row no-padding>\n          <ion-col>\n            <button ion-button clear small  icon-left disabled>\n              <ion-icon name="map"></ion-icon>\n              {{transform_distance(promotion.distance)}}\n            </button>\n          </ion-col>\n          <ion-col text-center>\n            <button ion-button clear small  icon-left disabled>\n              {{promotion.price | currency:\'USD\':true:\'1.0-0\'}}\n            </button>\n          </ion-col>\n          <ion-col text-right>\n            <button ion-button clear small  icon-left>\n              <ion-icon name=\'share-alt\'></ion-icon>\n              VePorEl\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/find-promotios/find-promotios.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */]])
    ], FindPromotiosPage);
    return FindPromotiosPage;
}());

//# sourceMappingURL=find-promotios.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_analytics__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_screen_orientation__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tutorial_tutorial__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_push__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_veporel__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_image_loader__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var MyApp = /** @class */ (function () {
    function MyApp(translate, platform, config, statusBar, splashScreen, util, ga, screenOrientation, push, veporel, imageLoaderConfig) {
        var _this = this;
        this.translate = translate;
        this.platform = platform;
        this.config = config;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.util = util;
        this.ga = ga;
        this.screenOrientation = screenOrientation;
        this.push = push;
        this.veporel = veporel;
        this.imageLoaderConfig = imageLoaderConfig;
        this.initTranslate();
        var self = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('cordova')) {
                _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
                _this.ga.startTrackerWithId('UA-101368936-1')
                    .then(function () {
                })
                    .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
                //this.initPushNotification();
                //this.statusBar.styleDefault();
                _this.splashScreen.hide();
            }
            if (_this.util.getPreference(_this.util.constants.logged)) {
                self.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__["a" /* MenuPage */];
            }
            else {
                if (!_this.util.getPreference(_this.util.constants.tutorial))
                    self.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_tutorial_tutorial__["a" /* TutorialPage */];
                else
                    self.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_welcome_welcome__["a" /* WelcomePage */];
            }
        });
    }
    MyApp.prototype.ionViewDidLoad = function () {
    };
    MyApp.prototype.initTranslate = function () {
        var _this = this;
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('es');
        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        }
        else {
            this.translate.use('es'); // Set your language here
        }
        this.translate.get(['BACK_BUTTON_TEXT', 'obteniendo_tu_ubicacion']).subscribe(function (values) {
            _this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    };
    MyApp.prototype.initPushNotification = function () {
        var _this = this;
        var self = this;
        this.push.hasPermission()
            .then(function (res) {
            if (res.isEnabled) {
                //console.log('We have permission to send push notifications');
            }
            else {
            }
        });
        var options = {
            android: {
                sound: true,
                vibrate: true
            },
            ios: {
                alert: true,
                badge: true,
                sound: 'false'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (data) {
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
            }
            else {
                //if user NOT using app and push notification comes
                //TODO: Your logic on click of push notification directly
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__["a" /* MenuPage */], { message: data.message });
            }
        });
        pushObject.on('registration').subscribe(function (registration) {
            self.util.savePreference(self.util.constants.push_code, registration.registrationId);
        });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Config */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_12__providers_veporel__["a" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_13_ionic_image_loader__["a" /* ImageLoaderConfig */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 235,
	"./af.js": 235,
	"./ar": 236,
	"./ar-dz": 237,
	"./ar-dz.js": 237,
	"./ar-kw": 238,
	"./ar-kw.js": 238,
	"./ar-ly": 239,
	"./ar-ly.js": 239,
	"./ar-ma": 240,
	"./ar-ma.js": 240,
	"./ar-sa": 241,
	"./ar-sa.js": 241,
	"./ar-tn": 242,
	"./ar-tn.js": 242,
	"./ar.js": 236,
	"./az": 243,
	"./az.js": 243,
	"./be": 244,
	"./be.js": 244,
	"./bg": 245,
	"./bg.js": 245,
	"./bm": 246,
	"./bm.js": 246,
	"./bn": 247,
	"./bn.js": 247,
	"./bo": 248,
	"./bo.js": 248,
	"./br": 249,
	"./br.js": 249,
	"./bs": 250,
	"./bs.js": 250,
	"./ca": 251,
	"./ca.js": 251,
	"./cs": 252,
	"./cs.js": 252,
	"./cv": 253,
	"./cv.js": 253,
	"./cy": 254,
	"./cy.js": 254,
	"./da": 255,
	"./da.js": 255,
	"./de": 256,
	"./de-at": 257,
	"./de-at.js": 257,
	"./de-ch": 258,
	"./de-ch.js": 258,
	"./de.js": 256,
	"./dv": 259,
	"./dv.js": 259,
	"./el": 260,
	"./el.js": 260,
	"./en-au": 261,
	"./en-au.js": 261,
	"./en-ca": 262,
	"./en-ca.js": 262,
	"./en-gb": 263,
	"./en-gb.js": 263,
	"./en-ie": 264,
	"./en-ie.js": 264,
	"./en-il": 265,
	"./en-il.js": 265,
	"./en-nz": 266,
	"./en-nz.js": 266,
	"./eo": 267,
	"./eo.js": 267,
	"./es": 268,
	"./es-do": 269,
	"./es-do.js": 269,
	"./es-us": 270,
	"./es-us.js": 270,
	"./es.js": 268,
	"./et": 271,
	"./et.js": 271,
	"./eu": 272,
	"./eu.js": 272,
	"./fa": 273,
	"./fa.js": 273,
	"./fi": 274,
	"./fi.js": 274,
	"./fo": 275,
	"./fo.js": 275,
	"./fr": 276,
	"./fr-ca": 277,
	"./fr-ca.js": 277,
	"./fr-ch": 278,
	"./fr-ch.js": 278,
	"./fr.js": 276,
	"./fy": 279,
	"./fy.js": 279,
	"./gd": 280,
	"./gd.js": 280,
	"./gl": 281,
	"./gl.js": 281,
	"./gom-latn": 282,
	"./gom-latn.js": 282,
	"./gu": 283,
	"./gu.js": 283,
	"./he": 284,
	"./he.js": 284,
	"./hi": 285,
	"./hi.js": 285,
	"./hr": 286,
	"./hr.js": 286,
	"./hu": 287,
	"./hu.js": 287,
	"./hy-am": 288,
	"./hy-am.js": 288,
	"./id": 289,
	"./id.js": 289,
	"./is": 290,
	"./is.js": 290,
	"./it": 291,
	"./it.js": 291,
	"./ja": 292,
	"./ja.js": 292,
	"./jv": 293,
	"./jv.js": 293,
	"./ka": 294,
	"./ka.js": 294,
	"./kk": 295,
	"./kk.js": 295,
	"./km": 296,
	"./km.js": 296,
	"./kn": 297,
	"./kn.js": 297,
	"./ko": 298,
	"./ko.js": 298,
	"./ky": 299,
	"./ky.js": 299,
	"./lb": 300,
	"./lb.js": 300,
	"./lo": 301,
	"./lo.js": 301,
	"./lt": 302,
	"./lt.js": 302,
	"./lv": 303,
	"./lv.js": 303,
	"./me": 304,
	"./me.js": 304,
	"./mi": 305,
	"./mi.js": 305,
	"./mk": 306,
	"./mk.js": 306,
	"./ml": 307,
	"./ml.js": 307,
	"./mn": 308,
	"./mn.js": 308,
	"./mr": 309,
	"./mr.js": 309,
	"./ms": 310,
	"./ms-my": 311,
	"./ms-my.js": 311,
	"./ms.js": 310,
	"./mt": 312,
	"./mt.js": 312,
	"./my": 313,
	"./my.js": 313,
	"./nb": 314,
	"./nb.js": 314,
	"./ne": 315,
	"./ne.js": 315,
	"./nl": 316,
	"./nl-be": 317,
	"./nl-be.js": 317,
	"./nl.js": 316,
	"./nn": 318,
	"./nn.js": 318,
	"./pa-in": 319,
	"./pa-in.js": 319,
	"./pl": 320,
	"./pl.js": 320,
	"./pt": 321,
	"./pt-br": 322,
	"./pt-br.js": 322,
	"./pt.js": 321,
	"./ro": 323,
	"./ro.js": 323,
	"./ru": 324,
	"./ru.js": 324,
	"./sd": 325,
	"./sd.js": 325,
	"./se": 326,
	"./se.js": 326,
	"./si": 327,
	"./si.js": 327,
	"./sk": 328,
	"./sk.js": 328,
	"./sl": 329,
	"./sl.js": 329,
	"./sq": 330,
	"./sq.js": 330,
	"./sr": 331,
	"./sr-cyrl": 332,
	"./sr-cyrl.js": 332,
	"./sr.js": 331,
	"./ss": 333,
	"./ss.js": 333,
	"./sv": 334,
	"./sv.js": 334,
	"./sw": 335,
	"./sw.js": 335,
	"./ta": 336,
	"./ta.js": 336,
	"./te": 337,
	"./te.js": 337,
	"./tet": 338,
	"./tet.js": 338,
	"./tg": 339,
	"./tg.js": 339,
	"./th": 340,
	"./th.js": 340,
	"./tl-ph": 341,
	"./tl-ph.js": 341,
	"./tlh": 342,
	"./tlh.js": 342,
	"./tr": 343,
	"./tr.js": 343,
	"./tzl": 344,
	"./tzl.js": 344,
	"./tzm": 345,
	"./tzm-latn": 346,
	"./tzm-latn.js": 346,
	"./tzm.js": 345,
	"./ug-cn": 347,
	"./ug-cn.js": 347,
	"./uk": 348,
	"./uk.js": 348,
	"./ur": 349,
	"./ur.js": 349,
	"./uz": 350,
	"./uz-latn": 351,
	"./uz-latn.js": 351,
	"./uz.js": 350,
	"./vi": 352,
	"./vi.js": 352,
	"./x-pseudo": 353,
	"./x-pseudo.js": 353,
	"./yo": 354,
	"./yo.js": 354,
	"./zh-cn": 355,
	"./zh-cn.js": 355,
	"./zh-hk": 356,
	"./zh-hk.js": 356,
	"./zh-tw": 357,
	"./zh-tw.js": 357
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 484;

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__find_promotios_find_promotios__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CategoriesPage = /** @class */ (function () {
    function CategoriesPage(navCtrl, navParams, veporel, util, translateService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.translateService = translateService;
        this.language = "";
        var self = this;
        translateService.get('LANG').subscribe(function (lang) {
            self.language = lang;
            var latitude = self.navParams.get(self.util.constants.latitude);
            var longitude = self.navParams.get(self.util.constants.longitude);
            var city_name = self.util.getPreference(self.util.constants.city_name);
            var country_name = self.util.getPreference(self.util.constants.country_name);
            var country_code = self.util.getPreference(self.util.constants.country_code);
            self.veporel.get_categories(country_name, country_code, latitude, longitude, city_name).subscribe(function (result) {
                if (result != null) {
                    self.categories = JSON.parse(result._body);
                    if (self.categories.length == 0) {
                        self.navCtrl.pop();
                        _this.util.show_toast('error_13');
                    }
                }
            }, function (error) {
            });
        });
    }
    CategoriesPage.prototype.ionViewDidLoad = function () {
        this.get_banners();
    };
    CategoriesPage.prototype.get_offers = function (category_name) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__find_promotios_find_promotios__["a" /* FindPromotiosPage */], {
            "type_find_promotio": this.util.constants.find_promotion_by_category,
            "category_name": category_name
        });
    };
    CategoriesPage.prototype.get_banners = function () {
        var city_name = this.util.getPreference(this.util.constants.city_name);
        var self = this;
        //Obtengo los banners
        this.veporel.get_banners(city_name).subscribe(function (result) {
            var body = result._body;
            if (body != null) {
                self.banners = JSON.parse(body);
            }
            else {
            }
        }, function (error) {
        });
    };
    CategoriesPage.prototype.get_name = function (category) {
        return category[this.language];
    };
    CategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-categories',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/categories/categories.html"*/'\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content class="card-background-page">\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12>\n        <ion-slides pager>\n          <ion-slide *ngFor="let banner of banners">\n            <a href="{{banner.url_destination}}" target="_blank">\n              <img-loader src="{{util.url}}{{banner.url_photo}}" useImg fallback="assets/img/logo_horizontal.png" class="slide-image"></img-loader>\n            </a>\n          </ion-slide>\n        </ion-slides>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-card *ngFor="let category of categories" (click)="get_offers(category.name)">\n    <img-loader src="{{util.url}}{{category.url_photo}}" useImg fallback="assets/img/logo_horizontal.png"></img-loader>\n    <div class="card-title" style="background: rgba(0, 0, 0, 0.5)">{{get_name(category)}}</div>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/categories/categories.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], CategoriesPage);
    return CategoriesPage;
}());

//# sourceMappingURL=categories.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubcategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__find_promotios_find_promotios__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SubcategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SubcategoriesPage = /** @class */ (function () {
    function SubcategoriesPage(navCtrl, navParams, veporel, util) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        try {
            var self_1 = this;
            var category_id = this.navParams.get(this.util.constants.category_id);
            if (category_id) {
                var city_name = self_1.util.getPreference(this.util.constants.city_name);
                self_1.veporel.get_subcategories(category_id, city_name).subscribe(function (result) {
                    if (result != null) {
                        self_1.subcategories = JSON.parse(result._body);
                        if (self_1.subcategories.length == 0) {
                            self_1.navCtrl.pop();
                            _this.util.show_toast('error_13');
                        }
                    }
                }, function (error) {
                });
            }
        }
        catch (e) {
        }
    }
    SubcategoriesPage.prototype.ionViewDidLoad = function () {
        this.get_banners();
    };
    SubcategoriesPage.prototype.get_offers = function (subcategory_id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__find_promotios_find_promotios__["a" /* FindPromotiosPage */], {
            "type_find_promotio": this.util.constants.find_promotion_by_category,
            "subcategory_id": subcategory_id
        });
    };
    SubcategoriesPage.prototype.get_banners = function () {
        var city_name = this.util.getPreference(this.util.constants.city_name);
        var self = this;
        //Obtengo los banners
        this.veporel.get_banners(city_name).subscribe(function (result) {
            var body = result._body;
            if (body != null) {
                self.banners = JSON.parse(body);
            }
            else {
            }
        }, function (error) {
        });
    };
    SubcategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-subcategories',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/subcategories/subcategories.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle icon-only end>\n      <img src="assets/img/menu.png" class="menu_icon" />\n    </button>\n    <img src="assets/img/logo_horizontal.png" height="40" class="center" />\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12>\n        <ion-slides pager>\n          <ion-slide *ngFor="let banner of banners">\n            <a href="{{banner.url_destination}}" target="_blank">\n              <img-loader src="{{util.url}}{{banner.url_photo}}" useImg fallback="assets/img/logo_horizontal.png" class="slide-image"></img-loader>\n            </a>\n          </ion-slide>\n        </ion-slides>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-list>\n    <ion-item *ngFor="let subcategory of subcategories" (click)="get_offers(subcategory.id)">\n      <ion-thumbnail item-start>\n        <img-loader src="{{util.url}}{{subcategory.url_photo}}" useImg fallback="assets/img/logo_horizontal.png"></img-loader>\n      </ion-thumbnail>\n      <h2>{{subcategory.name}}</h2>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/subcategories/subcategories.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Util */]])
    ], SubcategoriesPage);
    return SubcategoriesPage;
}());

//# sourceMappingURL=subcategories.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_providers__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__find_promotios_find_promotios__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directory_directory__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__map_map__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, veporel, util, geolocation, translateService, toastCtrl, menu, socialSharing, diagnostic, platform, alertCtrl, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veporel = veporel;
        this.util = util;
        this.geolocation = geolocation;
        this.translateService = translateService;
        this.toastCtrl = toastCtrl;
        this.menu = menu;
        this.socialSharing = socialSharing;
        this.diagnostic = diagnostic;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.address = "";
        this.options = JSON.parse(this.util.getPreference("options"));
        if (!this.options) {
            this.options = {
                notifications: true,
                range: 2,
                debug: false
            };
        }
        this.util.savePreference(this.util.constants.language, navigator.language.split('-')[0]);
        menu.enable(true);
        this.user = JSON.parse(this.util.getPreference(this.util.constants.user));
        this.get_messages();
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var self = this;
        self.util.setLogs("ionViewWillEnter");
        //Variable para saber si ya obtuve la ubicacion
        try {
            //Valido si me llega una dirrecion de otra vista
            this.city_name = this.navParams.get('city_name');
            self.util.setLogs("Recibiendo informacion de mapas: " + JSON.stringify(self.navParams));
            if (this.city_name) {
                this.latitude = this.navParams.get(this.util.constants.latitude);
                this.longitude = this.navParams.get(this.util.constants.longitude);
                this.city_name = this.navParams.get(this.util.constants.city_name);
                this.country_code = this.navParams.get(this.util.constants.country_code);
                this.country_name = this.navParams.get(this.util.constants.country_name);
                self.util.savePreference(this.util.constants.latitude, this.latitude);
                self.util.savePreference(this.util.constants.longitude, this.longitude);
                self.util.savePreference(this.util.constants.city_name, this.city_name);
                self.util.savePreference(this.util.constants.country_code, this.country_code);
                self.util.savePreference(this.util.constants.country_name, this.country_name);
                self.get_banners(this.city_name);
            }
            else {
                //Valido si tengo una direccion almacenada
                if (self.util.getPreference(this.util.constants.city_name) != this.city_name) {
                    this.latitude = self.util.getPreference(this.util.constants.latitude);
                    this.longitude = self.util.getPreference(this.util.constants.longitude);
                    this.city_name = self.util.getPreference(this.util.constants.city_name);
                    this.country_name = self.util.getPreference(this.util.constants.country_name);
                    self.get_banners(this.city_name);
                }
                else {
                    self.get_location();
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    HomePage.prototype.get_messages = function () {
        var self = this;
        self.translateService.get([
            'obteniendo_tu_ubicacion',
            'registrando',
            "ubicacion",
            "error_22",
            "reintentar",
            "salir"
        ]).subscribe(function (value) {
            self.messages = value;
        }, function (err) {
            alert(err);
        });
    };
    HomePage.prototype.get_location = function () {
        var self = this;
        var dialog = this.util.show_dialog(this.messages.obteniendo_tu_ubicacion);
        self.veporel.get_coordenates(dialog).subscribe(function (location) {
            switch (location.code) {
                case 1:
                    self.latitude = location.lat;
                    self.longitude = location.lon;
                    self.veporel.get_address(location.lat, location.lon, true).subscribe(function (result) {
                        dialog.dismiss();
                        self.address = result.locality;
                        self.city_name = result.locality;
                        var country_code = result.countryCode;
                        if (self.city_name) {
                            //Almaceno
                            self.util.savePreference(self.util.constants.latitude, self.latitude);
                            self.util.savePreference(self.util.constants.longitude, self.longitude);
                            self.util.savePreference(self.util.constants.city_name, self.city_name);
                            self.util.savePreference(self.util.constants.country_code, country_code);
                            self.util.savePreference(self.util.constants.country_name, result.countryName);
                            self.get_banners(self.city_name);
                        }
                        else {
                            self.util.show_toast('error_22');
                        }
                    }, function (error) {
                        dialog.dismiss();
                        self.util.setLogs(JSON.stringify(error));
                        var confirm = self.alertCtrl.create({
                            title: self.messages.ubicacion,
                            message: self.messages.error_22,
                            buttons: [
                                {
                                    text: self.messages.salir,
                                    handler: function () {
                                        if (self.platform.is('android')) {
                                            self.platform.exitApp();
                                        }
                                        else {
                                            self.util.show_toast('error_22');
                                        }
                                    }
                                },
                                {
                                    text: self.messages.reintentar,
                                    handler: function () {
                                        self.get_location();
                                    }
                                }
                            ]
                        });
                        confirm.present();
                    });
                    break;
                case 6:
                    self.get_location();
                    break;
                case 3:
                    window.location.reload();
                    self.diagnostic.switchToLocationSettings();
                    break;
            }
        }, function (err) {
            dialog.dismiss();
            self.util.setLogs(JSON.stringify(err));
            switch (err.code) {
                case 3:
                case 5:
                case 7:
                    self.util.show_toast('error_16');
                    if (self.platform.is('android')) {
                        self.platform.exitApp();
                    }
                    else {
                        self.util.show_toast('error_16');
                    }
                    break;
                case 1:
                case 2:
                    var confirm_1 = self.alertCtrl.create({
                        title: self.messages.ubicacion,
                        message: self.messages.error_22,
                        buttons: [
                            {
                                text: self.messages.salir,
                                handler: function () {
                                    if (self.platform.is('android')) {
                                        self.platform.exitApp();
                                    }
                                    else {
                                        self.util.show_toast('error_22');
                                    }
                                }
                            },
                            {
                                text: self.messages.reintentar,
                                handler: function () {
                                    self.get_location();
                                }
                            }
                        ]
                    });
                    confirm_1.present();
                    break;
                default:
                    self.util.show_toast(err.message);
                    break;
            }
        });
    };
    HomePage.prototype.get_banners = function (city_name) {
        var self = this;
        //Obtengo los banners
        this.veporel.get_banners(city_name, 2).subscribe(function (result) {
            var body = result._body;
            if (body != null) {
                self.banners = JSON.parse(body);
            }
            else {
            }
        }, function (error) {
        });
    };
    HomePage.prototype.find_promotios = function () {
        var self = this;
        if (this.city_name) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__find_promotios_find_promotios__["a" /* FindPromotiosPage */], {
                "type_find_promotio": self.util.constants.find_promotio_by_location,
                "latitude": self.latitude,
                "longitude": self.longitude
            });
        }
        else {
            this.translateService.get("error_9").subscribe(function (res) {
                var toast = self.toastCtrl.create({
                    message: res,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
    };
    HomePage.prototype.share = function () {
        var _this = this;
        this.translateService.get('mensaje_compartir', {
            value: "VPE" + this.user.id,
            google_play: "https://play.google.com/store/apps/details?id=co.colombiaapps.vpeclientes",
            app_store: "https://itunes.apple.com/nl/app/veporel/id1318648947?mt=8"
        }).subscribe(function (res) {
            _this.socialSharing.share(res, 'VePorEl', []).then(function () {
            }).catch(function (e) {
                alert(e);
            });
        });
    };
    HomePage.prototype.go_to_directory = function () {
        var self = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__directory_directory__["a" /* DirectoryPage */], {
            type: self.util.constants.find_business
        });
    };
    HomePage.prototype.go_to_directory_exporters = function () {
        var self = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__directory_directory__["a" /* DirectoryPage */], {
            type: self.util.constants.find_exporters
        });
    };
    HomePage.prototype.change_address = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__map_map__["a" /* MapPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/home/home.html"*/'<ion-header>\n	<ion-navbar>\n		<!--<button ion-button menuToggle icon-only end>-->\n			<!--<img src="assets/img/menu.png" class="menu_icon" />-->\n		<!--</button>-->\n    <ion-buttons end>\n      <button ion-button menuToggle>\n      	<img src="assets/img/menu.png" class="menu_icon" />\n        <!--<ion-icon name="menu"></ion-icon>-->\n      </button>\n    </ion-buttons>\n		<img src="assets/img/logo_horizontal.png" height="40" class="center" />\n	</ion-navbar>\n</ion-header>\n<ion-content padding>\n	<ion-grid>\n		<ion-row class="location">\n			<ion-col col-4>\n				<img src="assets/img/avatar_saludo.png" />\n			</ion-col>\n			<ion-col col-8 text-center>\n        <ion-row>\n          <ion-col col-12 text-center style="top: 0;">\n            <p> Hola {{user.names}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-12 text-center>\n            <p> Estás en {{city_name}}</p>\n          </ion-col>\n        </ion-row>\n			</ion-col>\n		</ion-row>\n		<ion-row>\n			<ion-col>\n				<button ion-button block (click)="find_promotios()" color="primary" no-padding text-wrap class="hm-button">\n					<ion-img src="assets/img/button_ofertas.png"></ion-img>\n					<div >{{\'buscar_promociones\' | translate}}</div>\n				</button>\n			</ion-col>\n      <ion-col col-auto >\n        <button ion-button block (click)="share()" color="gray" no-padding text-wrap class="hm-button">\n          <img src="assets/img/button_compartir_icon.png"/>\n        </button>\n      </ion-col>\n		</ion-row>\n		<ion-row *ngIf="options.debug">\n			<ion-col col-12-auto>\n        <button ion-button block (click)="change_address()" color="primary" no-padding text-wrap>\n          {{\'cambiar_direccion\' | translate}}\n        </button>\n			</ion-col>\n		</ion-row>\n		<ion-row>\n			<ion-col col-12>\n				<button ion-button block (click)="go_to_directory()" color="yellow" no-padding text-wrap class="hm-button">\n					<img src="assets/img/button_negocios_servicios_1.png"/>\n				</button>\n			</ion-col>\n			<!--<ion-col col-2>\n		        <button ion-button block icon-only (click)="listenForSpeech()" color="yellow">\n		          <ion-icon name="mic"></ion-icon>\n		        </button>\n			</ion-col>-->\n		</ion-row>\n    <ion-row>\n      <ion-col col-12>\n        <button ion-button block (click)="go_to_directory_exporters()" color="primary" no-padding text-wrap class="hm-button">\n          <img src="assets/img/button_negocios_exportadores.png"/>\n        </button>\n      </ion-col>\n    </ion-row>\n		<ion-row>\n			<ion-col col-12 >\n				<ion-slides #pager *ngIf="banners && banners.length" autoplay="5000" pager="true"   loop="true" speed="300">\n					<ion-slide *ngFor="let banner of banners">\n            <a href="{{banner.url_destination}}" target="_blank" class="{{util.url}}{{banner.url_photo}}">\n              <img-loader *ngIf="util.isUrlValid(banner.url_photo)" src="{{banner.url_photo}}" useImg fallback="assets/img/logo_horizontal.png" class="slide-image"></img-loader>\n              <img-loader *ngIf="!util.isUrlValid(banner.url_photo)" src="{{util.url}}{{banner.url_photo}}" useImg fallback="assets/img/logo_horizontal.png" class="slide-image"></img-loader>\n            </a>\n					</ion-slide>\n				</ion-slides>\n			</ion-col>\n		</ion-row>\n\n	</ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_providers__["b" /* VePorEl */],
            __WEBPACK_IMPORTED_MODULE_3__providers_providers__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Api is a generic REST Api handler. Set your API url first.
 */
var Api = /** @class */ (function () {
    function Api(http, util) {
        this.http = http;
        this.util = util;
        this.timeOut = 15000;
    }
    Api.prototype.get = function (endpoint, params, options) {
        if (!options) {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
        }
        var token = this.util.getPreference(this.util.constants.token);
        if (token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + token);
            options.headers = headers;
        }
        // Support easy query params for GET requests
        if (params) {
            var p = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* URLSearchParams */]();
            for (var k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }
        if (endpoint.includes("http"))
            return this.http.get(endpoint, options).timeout(this.timeOut);
        else
            return this.http.get(this.util.url + endpoint, options).timeout(this.timeOut);
    };
    Api.prototype.post = function (endpoint, body, options) {
        var token = this.util.getPreference(this.util.constants.token);
        if (token) {
            if (!options) {
                options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]();
            }
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Authorization', 'Bearer ' + token);
            options.headers = headers;
        }
        if (endpoint.includes("http"))
            return this.http.post(endpoint, options).timeout(this.timeOut);
        else
            return this.http.post(this.util.url + endpoint, body, options).timeout(this.timeOut);
    };
    Api.prototype.put = function (endpoint, body, options) {
        if (endpoint.includes("http"))
            return this.http.put(endpoint, options).timeout(this.timeOut);
        else
            return this.http.put(this.util.url + endpoint, body, options).timeout(this.timeOut);
    };
    Api.prototype.delete = function (endpoint, options) {
        if (endpoint.includes("http"))
            return this.http.delete(endpoint, options).timeout(this.timeOut);
        else
            return this.http.delete(this.util.url + endpoint, options).timeout(this.timeOut);
    };
    Api.prototype.patch = function (endpoint, body, options) {
        if (endpoint.includes("http"))
            return this.http.patch(endpoint, options).timeout(this.timeOut);
        else
            return this.http.patch(this.util.url + endpoint, body, options).timeout(this.timeOut);
    };
    Api = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */]])
    ], Api);
    return Api;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VePorEl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_geocoder__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_pro__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_pro___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__ionic_pro__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var VePorEl = /** @class */ (function () {
    function VePorEl(http, api, util, nativeGeocoder, platform, translate, diagnostic, geolocation, alertCtrl) {
        this.http = http;
        this.api = api;
        this.util = util;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.translate = translate;
        this.diagnostic = diagnostic;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.get_translation();
    }
    VePorEl.prototype.get_translation = function () {
        var self = this;
        if (!this.messages) {
            this.platform.ready().then(function () {
                self.translate.get([
                    "obteniendo_tu_ubicacion",
                    "obteniendo_las_ofertas",
                    "obteniendo_las_categorias",
                    "obteniendo_las_subcategorias",
                    "obteniendo_las_ofertas",
                    "buscando_la_oferta",
                    "tomando_la_oferta",
                    "calificando",
                    "enviando_mensaje",
                    "listando_los_paises",
                    "listando_las_ciudades",
                    "solicitando_contrasena_temporal",
                    "cambiando_contrasena",
                    "obteniendo_companias",
                    "obteniendo_información_del_negocio",
                    "resent_email",
                    "ubicacion",
                    "activar_ubicacion",
                    "salir",
                    "activar",
                    "mensaje_ubicacion"
                ]).subscribe(function (values) {
                    self.messages = values;
                });
            });
        }
        else {
        }
    };
    VePorEl.prototype.get_banners = function (city_name, type) {
        this.get_translation();
        if (type == null) {
            type = 1;
        }
        var body = {
            city_name: city_name,
            type: type
        };
        var seq = this.api.post('banners/get', body).share();
        seq
            .subscribe(function (res) {
            var aux = res.json();
            if (aux.length == 0 && type == 1) {
                aux = [{
                        url_photo: 'banners/banner_inferior.png',
                        url_destination: 'http://veporel.com/'
                    }, {
                        url_photo: 'banners/9838/Arf_logo_nuevo_veporel.png',
                        url_destination: 'http://veporel.com/'
                    }];
                res._body = JSON.stringify(aux);
                return res.json();
            }
            else {
                return aux;
            }
        }, function (err) {
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_coordenates = function (dialog) {
        var self = this;
        var seq = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"].create(function (observer) {
            if (self.platform.is('cordova')) {
                //if (true) {
                self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
                    if (isAuthorized) {
                        self.diagnostic.isLocationEnabled().then(function (isAvailable) {
                            if (isAvailable) {
                                self.geolocation.getCurrentPosition().then(function (resp) {
                                    if (resp.coords.latitude && resp.coords.longitude) {
                                        var result = {
                                            code: 1,
                                            lat: resp.coords.latitude,
                                            lon: resp.coords.longitude
                                        };
                                        observer.next(result);
                                    }
                                    else {
                                        var error = "";
                                        try {
                                            error = JSON.stringify(resp);
                                        }
                                        catch (e) {
                                            error = "";
                                        }
                                        return observer.error({
                                            code: 1,
                                            message: "Coordenadas no validas",
                                            error: error
                                        });
                                    }
                                }).catch(function (err) {
                                    return observer.error({
                                        code: 2,
                                        message: "Error obteniendo las coordenadas.",
                                        error: err.message
                                    });
                                });
                            }
                            else {
                                dialog.dismiss();
                                ;
                                var confirm_1 = self.alertCtrl.create({
                                    title: self.messages.ubicacion,
                                    message: self.messages.activar_ubicacion,
                                    buttons: [
                                        {
                                            text: self.messages.salir,
                                            handler: function () {
                                                observer.error({
                                                    code: 3,
                                                    message: "Usuario no activo la ubicación",
                                                    error: ""
                                                });
                                            }
                                        },
                                        {
                                            text: self.messages.activar,
                                            handler: function () {
                                                observer.next({
                                                    code: 3,
                                                    message: "Usuario activo la ubicación"
                                                });
                                            }
                                        }
                                    ]
                                });
                                confirm_1.present();
                            }
                        }).catch(function (err) {
                            try {
                                err = JSON.stringify(err);
                            }
                            catch (e) {
                                err = '';
                            }
                            return observer.error({
                                code: 4,
                                message: "Error activando la ubicación",
                                error: err
                            });
                        });
                    }
                    else {
                        dialog.dismiss();
                        var confirm_2 = self.alertCtrl.create({
                            title: self.messages.ubicacion,
                            message: self.messages.mensaje_ubicacion,
                            buttons: [
                                {
                                    text: self.messages.salir,
                                    handler: function () {
                                        return observer.error({
                                            code: 5,
                                            message: "Usuario no autorizó la ubicación",
                                            error: ""
                                        });
                                    }
                                },
                                {
                                    text: self.messages.activar,
                                    handler: function () {
                                        self.diagnostic.requestLocationAuthorization().then(function (status) {
                                            if (status == 'GRANTED' || status == 'authorized_when_in_use' || status == 'authorized') {
                                                observer.next({
                                                    code: 6,
                                                    message: "Usuario autorizo la ubicación",
                                                    status: status
                                                });
                                            }
                                            else {
                                                observer.error({
                                                    code: 7,
                                                    message: "Usuario no autorizó la ubicación",
                                                    error: ""
                                                });
                                            }
                                        }).catch(function (error) {
                                            try {
                                                error = JSON.stringify(error);
                                            }
                                            catch (e) {
                                                error = '';
                                            }
                                            observer.error({
                                                code: 8,
                                                message: "Error autorizando la ubicación",
                                                error: error
                                            });
                                        });
                                    }
                                }
                            ]
                        });
                        confirm_2.present();
                    }
                }).catch(function (error) {
                    try {
                        error = JSON.stringify(error);
                    }
                    catch (e) {
                        error = '';
                    }
                    return observer.error({
                        code: 9,
                        message: "Error autorizando la ubicación",
                        error: error
                    });
                });
            }
            else {
                //Obtengo las coordenadas actuales
                self.geolocation.getCurrentPosition().then(function (resp) {
                    if (resp.coords.latitude && resp.coords.longitude) {
                        var result = {
                            code: 1,
                            lat: resp.coords.latitude,
                            lon: resp.coords.longitude
                        };
                        observer.next(result);
                    }
                    else {
                        var error = "";
                        try {
                            error = JSON.stringify(resp);
                        }
                        catch (e) {
                            error = "";
                        }
                        return observer.error({
                            code: 10,
                            message: "Coordenadas no validas",
                            error: error
                        });
                    }
                }).catch(function (error) {
                    try {
                        error = JSON.stringify(error);
                    }
                    catch (e) {
                        error = '';
                    }
                    return observer.error({
                        code: 11,
                        message: "Error obteniendo coordenadas",
                        error: error
                    });
                });
            }
        });
        return seq;
    };
    VePorEl.prototype.get_address = function (latitude, longitude, force_update) {
        var _this = this;
        if (force_update == null)
            force_update = false;
        if (!this.messages)
            this.get_translation();
        //let dialog = this.util.show_dialog(this.messages.obteniendo_tu_ubicacion);
        var self = this;
        if (!this.util.getPreference(this.util.constants.address) || force_update) {
            if (this.platform.is('cordova')) {
                var seq = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"].create(function (observer) {
                    self.nativeGeocoder.reverseGeocode(latitude, longitude)
                        .then(function (result) {
                        result = result[0];
                        if (!result.locality) {
                            result.locality = result.subAdministrativeArea;
                        }
                        if (result.countryName && result.countryCode && result.locality) {
                            observer.next(result);
                        }
                        else {
                            observer.error({
                                code: 1,
                                message: "Datos obteniedos de ubicación no validos",
                                error: result
                            });
                        }
                        // observer.onCompleted();
                    })
                        .catch(function (error) {
                        observer.error({
                            code: 2,
                            message: "Error obteniendo informacion",
                            error: error
                        });
                    });
                });
                return seq;
            }
            else {
                var seq = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"].create(function (observer) {
                    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=$lat,$lon&key=API_KEY";
                    url = url.replace("$lat", latitude + "");
                    url = url.replace("$lon", longitude + "");
                    url = url.replace("API_KEY", _this.util.google_api_key);
                    var seq = _this.api.get(url).share();
                    seq
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        var body = res;
                        var result = {
                            countryName: "",
                            countryCode: "",
                            locality: "",
                            street: body.results[0].formatted_address,
                            houseNumber: ''
                        };
                        for (var i = 0; i < body.results.length; i++) {
                            for (var j = 0; j < body.results[i].address_components.length; j++) {
                                var element = body.results[i].address_components[j];
                                if (element.types[0] == "postal_town" || element.types[0] == "locality") {
                                    result.locality = element.short_name;
                                }
                                if (element.types[0] == "country") {
                                    result.countryName = element.long_name;
                                    result.countryCode = element.short_name;
                                }
                            }
                        }
                        if (result.countryName && result.countryCode && result.locality) {
                            observer.next(result);
                        }
                        else {
                            observer.error({
                                code: 1,
                                message: "Datos obteniedos de ubicación no validos",
                                error: result
                            });
                        }
                    }, function (err) {
                        observer.error({
                            code: 2,
                            message: "Error obteniendo ubicación",
                            error: err
                        });
                    });
                });
                return seq;
            }
        }
        else {
            var seq = __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"].create(function (observer) {
                var result = {
                    countryName: _this.util.getPreference(_this.util.constants.country_name),
                    countryCode: _this.util.getPreference(_this.util.constants.country_code),
                    city: _this.util.getPreference(_this.util.constants.city_name),
                    street: _this.util.getPreference(_this.util.constants.address),
                    houseNumber: ''
                };
                observer.next(result);
            });
            return seq;
        }
    };
    VePorEl.prototype.get_promotions_by_location = function (latitude, longitude) {
        var options = JSON.parse(this.util.getPreference("options"));
        if (!options) {
            options = {
                notifications: false,
                range: 2
            };
        }
        var body = {
            latitude: latitude,
            longitude: longitude,
            range: options.range
        };
        var dialog = this.util.show_dialog(this.messages.obteniendo_las_ofertas);
        var seq = this.api.post('offers/find_by_location', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () {
                __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' });
            });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
            return err;
        });
        return seq;
    };
    VePorEl.prototype.get_categories = function (country_name, country_code, latitude, longitude, city_name) {
        if (!city_name)
            city_name = "";
        if (!country_name)
            country_name = "";
        if (!country_code)
            country_code = "";
        if (!latitude)
            latitude = 0;
        if (!longitude)
            longitude = 0;
        var dialog = this.util.show_dialog(this.messages.obteniendo_las_categorias);
        var seq = this.api.get('categories', {
            city_name: city_name,
            country_name: country_name,
            country_code: country_code,
            latitude: latitude,
            longitude: longitude
        }).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_subcategories = function (category_id, city_name) {
        var _this = this;
        if (!city_name)
            city_name = "";
        var dialog = this.util.show_dialog(this.messages.obteniendo_las_subcategorias);
        var seq = this.api.get('subcategories', { category_id: category_id, city_name: city_name }).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            var aux = res.json();
            var language = _this.util.getPreference(_this.util.constants.language);
            if (language != 'es') {
                for (var i = 0; i < aux.length; i++) {
                    switch (language) {
                        case "en":
                            aux[i].name = aux[i].EN;
                            break;
                    }
                }
                res._body = JSON.stringify(aux);
                return res.json();
            }
            return res.json();
            ;
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_offers_by_category = function (category_name) {
        var body = {
            latitude: this.util.getPreference(this.util.constants.latitude),
            longitude: this.util.getPreference(this.util.constants.longitude),
            city_name: this.util.getPreference(this.util.constants.city_name),
            category_name: category_name,
        };
        var dialog = this.util.show_dialog(this.messages.obteniendo_las_ofertas);
        var seq = this.api.post('offers/find_by_category', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_offers_by_subcategory_name = function (subcategory_name) {
        var body = {
            latitude: this.util.getPreference(this.util.constants.latitude),
            longitude: this.util.getPreference(this.util.constants.longitude),
            city_name: this.util.getPreference(this.util.constants.city_name),
            subcategory_name: subcategory_name,
        };
        var dialog = this.util.show_dialog(this.messages.obteniendo_las_ofertas);
        var seq = this.api.post('offers/find_by_subcategorie_name', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_offer_by_id = function (offer_id, branch_id) {
        var body = {
            id: offer_id,
            branch_id: branch_id,
        };
        var dialog = this.util.show_dialog(this.messages.buscando_la_oferta);
        var seq = this.api.post('offers/find_by_id', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_offers_by_user_id = function () {
        var dialog = this.util.show_dialog(this.messages.obteniendo_las_ofertas);
        var body = {
            latitude: this.util.getPreference(this.util.constants.latitude),
            longitude: this.util.getPreference(this.util.constants.longitude),
        };
        var seq = this.api.post('offers/find_by_user_id', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.take_offer = function (offer_id, branch_id) {
        var body = {
            offer_id: offer_id,
            branch_id: branch_id
        };
        var dialog = this.util.show_dialog(this.messages.tomando_la_oferta);
        var seq = this.api.post('offers/reserve', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.send_calification = function (body) {
        var dialog = this.util.show_dialog(this.messages.calificando);
        var seq = this.api.post('offers/qualification', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.send_message = function (message) {
        var body = {
            message: message
        };
        var dialog = this.util.show_dialog(this.messages.enviando_mensaje);
        var seq = this.api.post('messages', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res;
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return err;
        });
        return seq;
    };
    VePorEl.prototype.get_countries = function () {
        this.get_translation();
        var dialog = this.util.show_dialog(this.messages.listando_los_paises);
        var seq = this.api.get('countries', {}).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_cities_by_country = function (country_code, type) {
        this.get_translation();
        if (!type)
            type = 0;
        console.log(this.messages);
        var dialog = this.util.show_dialog(this.messages.listando_las_ciudades);
        var seq = this.api.post('cities', { country_code: country_code, type: type }).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.recovery_password = function (email) {
        var body = {
            email: email
        };
        var dialog = this.util.show_dialog(this.messages.solicitando_contrasena_temporal);
        var seq = this.api.post('recovery_password', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.reset_password = function (email, temp_password, new_password) {
        var body = {
            email: email,
            temp_password: temp_password,
            new_password: new_password
        };
        var dialog = this.util.show_dialog(this.messages.cambiando_contrasena);
        var seq = this.api.post('reset_password', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.resent_email = function (email) {
        if (!email) {
            return;
        }
        var body = {
            email: email
        };
        var dialog = this.util.show_dialog(this.messages.resent_email);
        var seq = this.api.get('send_validate_email', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss();
            return res.json();
        }, function (err) {
            dialog.dismiss();
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_companies_by_city_categorie_and_name = function (body, page) {
        var dialog = this.util.show_dialog(this.messages.obteniendo_companias);
        body.page = page;
        body.language = this.util.getPreference(this.util.constants.language);
        var seq = this.api.post('companies/find', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_company_by_id = function (company_id, branch_id) {
        var dialog = this.util.show_dialog(this.messages.obteniendo_información_del_negocio);
        var body = {
            company_id: company_id,
            branch_id: branch_id
        };
        var seq = this.api.post('companies/find_by_company_id', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl.prototype.get_exporter_by_product = function (body, page) {
        var dialog = this.util.show_dialog(this.messages.obteniendo_companias);
        body.page = page;
        body.language = this.util.getPreference(this.util.constants.language);
        var seq = this.api.post('exporters/find', body).share();
        seq
            .subscribe(function (res) {
            dialog.dismiss().catch(function () { });
            return res.json();
        }, function (err) {
            dialog.dismiss().catch(function () { __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.log('LoadingController dismiss get_promotions_by_location', { level: 'error' }); });
            __WEBPACK_IMPORTED_MODULE_12__ionic_pro__["Pro"].monitoring.exception(err);
        });
        return seq;
    };
    VePorEl = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__api__["a" /* Api */],
            __WEBPACK_IMPORTED_MODULE_3__util__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["b" /* AlertController */]])
    ], VePorEl);
    return VePorEl;
}());

//# sourceMappingURL=veporel.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_menu__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_veporel__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, toastCtrl, translateService, user, util, fb, veporel) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        this.user = user;
        this.util = util;
        this.fb = fb;
        this.veporel = veporel;
        this.account = {
            username: '',
            password: '',
            push_code: ''
        };
        if (!this.util.getPreference(this.util.constants.logged)) {
            this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR', 'validando_informacion']).subscribe(function (values) {
                _this.loginErrorString = values.LOGIN_ERROR;
                _this.serverErrorString = values.SERVER_ERROR;
                _this.messages = values;
            });
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__menu_menu__["a" /* MenuPage */]);
        }
    }
    WelcomePage.prototype.ionViewWillEnter = function () {
        this.veporel.get_translation();
    };
    WelcomePage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    WelcomePage.prototype.demo = function () {
        var dialog = this.util.show_dialog(this.messages.validando_informacion);
        var self = this;
        this.account.username = "demo@veporel.com";
        this.account.password = "demo123";
        this.user.login(this.account).subscribe(function (resp) {
            dialog.dismiss();
            self.util.savePreference(self.util.constants.logged, true);
            self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__menu_menu__["a" /* MenuPage */]);
        }, function (err) {
            dialog.dismiss();
            try {
                var body = JSON.parse(err._body);
                if (body.code == -1) {
                    self.util.show_toast(self.messages.LOGIN_ERROR);
                }
                else if (body.code == -2) {
                    self.util.show_toast("error_20");
                }
                else if (body.code == -3) {
                    self.util.show_toast("error_21");
                }
            }
            catch (e) {
                self.util.show_toast(self.messages.SERVER_ERROR);
            }
        });
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
    };
    WelcomePage.prototype.facebook_login = function () {
        var self = this;
        this.fb.login(['public_profile', 'email'])
            .then(function (res) {
            //Getting name and gender properties
            var userId = res.authResponse.userID;
            var params = new Array();
            self.fb.api("/me?fields=id,first_name,last_name,email,gender,birthday", params)
                .then(function (user) {
                user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                //Ingreso al usuario en el sistema
                self.account.username = user.email;
                self.account.password = user.id;
                self.user.login(self.account).subscribe(function (result) {
                    self.util.savePreference(self.util.constants.logged, true);
                    self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__menu_menu__["a" /* MenuPage */]);
                }, function (err) {
                    console.error(err);
                    if (err != null) {
                        var body = JSON.parse(err._body);
                        if (body.code == -1) {
                            var toast = self.toastCtrl.create({
                                message: self.loginErrorString,
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */], {
                                username: user.email,
                                password: user.id
                            });
                        }
                        else if (body.code == -2) {
                            self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */], {
                                username: user.email,
                                password: user.id,
                                names: user.first_name,
                                last_name: user.last_name,
                            });
                        }
                    }
                });
            });
        })
            .catch(function (e) {
            alert(e);
        });
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/welcome/welcome.html"*/'<ion-content scroll="false">\n  <div class="splash-bg"></div>\n  <div class="splash-info">\n    <div class="splash-logo"></div>\n    <p>{{\'version\' | translate}} {{util.version}}</p>\n  </div>\n  <div padding>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button block (click)="login()" class="signup">{{\'LOGIN\' | translate}}</button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6>\n          <button ion-button block (click)="facebook_login()" class="signup">{{ \'facebook\' | translate }}</button>\n        </ion-col>\n        <ion-col col-6>\n        <button ion-button block (click)="demo()" class="signup">{{\'Demo\' | translate}}</button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <p text-center> {{\'mensaje_para_registrar\'|translate}}</p>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <button ion-button block (click)="signup()" class="signup">{{\'SIGNUP\' | translate}}</button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <div text-center>\n            <a href="http://www.veporel.com/tycapp/" target="_blank" text-center>{{\'terminos_y_condiciones_text\'|translate}}</a>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n\n    \n    \n    <br>\n    \n\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/jorgeandresmorenojaimes/Documents/VePorEl/VePorElCliente/src/pages/welcome/welcome.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__providers_user__["a" /* User */],
            __WEBPACK_IMPORTED_MODULE_4__providers_util__["a" /* Util */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_9__providers_veporel__["a" /* VePorEl */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__veporel__ = __webpack_require__(70);
/* unused harmony reexport User */
/* unused harmony reexport Api */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__util__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__veporel__["a"]; });





//# sourceMappingURL=providers.js.map

/***/ })

},[392]);
//# sourceMappingURL=main.js.map