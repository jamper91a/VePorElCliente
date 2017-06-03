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
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Util } from './util';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
var Api = (function () {
    function Api(http, util) {
        this.http = http;
        this.util = util;
    }
    Api.prototype.get = function (endpoint, params, options) {
        if (!options) {
            options = new RequestOptions();
        }
        // Support easy query params for GET requests
        if (params) {
            var p = new URLSearchParams();
            for (var k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }
        if (endpoint.includes("http"))
            return this.http.get(endpoint, options);
        else
            return this.http.get(this.util.url + endpoint, options);
    };
    Api.prototype.post = function (endpoint, body, options) {
        var token = this.util.getPreference(this.util.constants.token);
        if (token) {
            if (!options) {
                options = new RequestOptions();
            }
            var headers = new Headers();
            headers.append('Authorization', 'Bearer ' + token);
            options.headers = headers;
        }
        if (endpoint.includes("http:"))
            return this.http.get(endpoint, options);
        else
            return this.http.post(this.util.url + endpoint, body, options);
    };
    Api.prototype.put = function (endpoint, body, options) {
        if (endpoint.includes("http:"))
            return this.http.get(endpoint, options);
        else
            return this.http.put(this.util.url + endpoint, body, options);
    };
    Api.prototype.delete = function (endpoint, options) {
        if (endpoint.includes("http:"))
            return this.http.get(endpoint, options);
        else
            return this.http.delete(this.util.url + endpoint, options);
    };
    Api.prototype.patch = function (endpoint, body, options) {
        if (endpoint.includes("http:"))
            return this.http.get(endpoint, options);
        else
            return this.http.put(this.util.url + endpoint, body, options);
    };
    return Api;
}());
Api = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Util])
], Api);
export { Api };
//# sourceMappingURL=api.js.map