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
import { MenuController, NavController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { TranslateService } from '@ngx-translate/core';
import { Util } from '../../providers/util';
import { MainPage } from "../pages";
var TutorialPage = (function () {
    function TutorialPage(navCtrl, menu, translate, util) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.util = util;
        this.showSkip = true;
        //Valido si ya vio o no el tutorial
        if (!this.util.getPreference(this.util.constants.tutorial)) {
            translate.get(["TUTORIAL_SLIDE1_TITLE",
                "TUTORIAL_SLIDE1_DESCRIPTION",
                "TUTORIAL_SLIDE2_TITLE",
                "TUTORIAL_SLIDE2_DESCRIPTION",
                "TUTORIAL_SLIDE3_TITLE",
                "TUTORIAL_SLIDE3_DESCRIPTION",
            ]).subscribe(function (values) {
                console.log('Loaded values', values);
                _this.slides = [
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
        }
        else {
            if (this.util.getPreference(this.util.constants.logged)) {
                this.navCtrl.setRoot(MainPage, {}, {
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
        this.navCtrl.setRoot(WelcomePage, {}, {
            animate: true,
            direction: 'forward'
        });
    };
    TutorialPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd;
    };
    TutorialPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    TutorialPage.prototype.ionViewWillLeave = function () {
        this.util.savePreference(this.util.constants.tutorial, true);
        this.menu.enable(true);
    };
    return TutorialPage;
}());
TutorialPage = __decorate([
    Component({
        selector: 'page-tutorial',
        templateUrl: 'tutorial.html'
    }),
    __metadata("design:paramtypes", [NavController,
        MenuController, TranslateService,
        Util])
], TutorialPage);
export { TutorialPage };
//# sourceMappingURL=tutorial.js.map