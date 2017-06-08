import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { Util } from './util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class VePorEl {

  constructor(public http: Http, public api: Api, public util: Util) {
  }

  get_banners(city_name:string) {
    let body ={
      city_name : city_name
    };
    let seq = this.api.post('banners/get', body).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
          return res;
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  get_address(latitude:number, longitude:number){
    let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=$lat,$lon&key=API_KEY";
    url = url.replace("$lat", latitude + "");
    url = url.replace("$lon", longitude + "");
    url = url.replace("API_KEY", this.util.google_api_key);  
    let seq = this.api.get(url).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
          return res;
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }


}
