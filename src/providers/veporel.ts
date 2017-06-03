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


}
