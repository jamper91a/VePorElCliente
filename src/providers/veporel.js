var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { Util } from './util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
var VePorEl = (function () {
    function VePorEl(http, api, util) {
        this.http = http;
        this.api = api;
        this.util = util;
    }
    VePorEl.prototype.get_banners = function (city_name) {
        var body = {
            city_name: city_name
        };
        var seq = this.api.post('banners/get', body).share();
        seq
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            return res;
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    VePorEl.prototype.get_address = function (latitude, longitude) {
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=$lat,$lon&key=API_KEY";
        url = url.replace("$lat", latitude + "");
        url = url.replace("$lon", longitude + "");
        url = url.replace("API_KEY", this.util.google_api_key);
        var seq = this.api.get(url).share();
        seq
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            return res;
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    return VePorEl;
}());
VePorEl = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Api, Util])
], VePorEl);
export { VePorEl };
//# sourceMappingURL=veporel.js.map