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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { VePorEl } from '../../providers/providers';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HomePage = (function () {
    function HomePage(navCtrl, navParams, translateService, veporel) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translateService = translateService;
        this.veporel = veporel;
        var self = this;
        //Obtentgo los banners
        this.veporel.get_banners('Bogotá').subscribe(function (result) {
            var body = result._body;
            if (body != null) {
                self.banners = JSON.parse(body);
            }
            else {
            }
        }, function (error) {
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    return HomePage;
}());
HomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        TranslateService,
        VePorEl])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map