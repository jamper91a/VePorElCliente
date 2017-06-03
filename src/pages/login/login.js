var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { TranslateService } from '@ngx-translate/core';
import { Util } from '../../providers/util';
var LoginPage = (function () {
    function LoginPage(navCtrl, user, toastCtrl, util, translateService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.util = util;
        this.translateService = translateService;
        // The account fields for the login form.
        // If you're using the username field with or without email, make
        // sure to add it to the type
        this.account = {
            username: '',
            password: ''
        };
        if (!this.util.getPreference(this.util.constants.logged)) {
            this.translateService.get(['LOGIN_ERROR', 'SERVER_ERROR']).subscribe(function (values) {
                _this.loginErrorString = values.LOGIN_ERROR;
                _this.serverErrorString = values.SERVER_ERROR;
            });
        }
        else {
            this.navCtrl.push(MainPage);
        }
    }
    // Attempt to login in through our User service
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        this.user.login(this.account).subscribe(function (resp) {
            _this.util.savePreference(_this.util.constants.logged, true);
            _this.navCtrl.push(MainPage);
        }, function (err) {
            try {
                var body = JSON.parse(err._body);
                if (body.code == -1) {
                    var toast = _this.toastCtrl.create({
                        message: _this.loginErrorString,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }
            catch (e) {
                var toast = _this.toastCtrl.create({
                    message: _this.serverErrorString,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController,
        User,
        ToastController,
        Util,
        TranslateService])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map