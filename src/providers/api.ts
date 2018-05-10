import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Util } from './util';
import "rxjs/add/operator/share";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
 @Injectable()
 export class Api {

  private timeOut:number=15000;
   constructor(
     public http: Http,
     public util: Util,

   ) {


   }

   get(endpoint: string, params?: any, options?: RequestOptions):any {
     if (!options) {
       options = new RequestOptions();
     }

     var token = this.util.getPreference(this.util.constants.token);
     if (token) {
       let headers = new Headers();
       headers.append('Authorization', 'Bearer ' + token);
       options.headers = headers;
     }

     // Support easy query params for GET requests
     if (params) {
       let p = new URLSearchParams();
       for (let k in params) {
         p.set(k, params[k]);
       }
       // Set the search field if we have params and don't already have
       // a search field set in options.
       options.search = !options.search && p || options.search;
     }
     if(endpoint.includes("http"))
       return this.http.get(endpoint, options).timeout(this.timeOut);
     else
       return this.http.get(this.util.url + endpoint, options).timeout(this.timeOut);
   }

   post(endpoint: string, body: any, options?: RequestOptions):any {
     var token = this.util.getPreference(this.util.constants.token);
     if(token){
       if (!options) {
         options = new RequestOptions();
       }

       let headers = new Headers();
       headers.append('Authorization', 'Bearer '+token);
       options.headers = headers;
     }
     if(endpoint.includes("http"))
       return this.http.post(endpoint, options).timeout(this.timeOut);
     else
       return this.http.post(this.util.url + endpoint, body, options).timeout(this.timeOut);
   }

   put(endpoint: string, body: any, options?: RequestOptions):any {
     if(endpoint.includes("http"))
       return this.http.put(endpoint, options).timeout(this.timeOut);
     else
       return this.http.put(this.util.url + endpoint, body, options).timeout(this.timeOut);
   }

   delete(endpoint: string, options?: RequestOptions):any {
     if(endpoint.includes("http"))
       return this.http.delete(endpoint, options).timeout(this.timeOut);
     else
       return this.http.delete(this.util.url + endpoint, options).timeout(this.timeOut);
   }

   patch(endpoint: string, body: any, options?: RequestOptions):any {
     if(endpoint.includes("http"))
       return this.http.patch(endpoint, options).timeout(this.timeOut);
     else
       return this.http.patch(this.util.url + endpoint, body, options).timeout(this.timeOut);
   }

 }
