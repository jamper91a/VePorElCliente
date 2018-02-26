import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { Util } from './util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import {Observable} from "rxjs/Observable";
import { Platform } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";


@Injectable()
export class VePorEl {


  private messages:any;
  constructor(
    public http: Http,
    public api: Api,
    public util: Util,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
    public translate: TranslateService,
  ) {




  }

  public get_translation(){
    var self=this;
    this.platform.ready().then(() => {
      self.translate.get(
        [
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
          "obteniendo_información_del_negocio"
        ]
      ).subscribe(
        (values) => {
          self.messages=values;
        });
    });
  }
  get_banners(city_name:string, type?:number):any {
    this.get_translation();
    if(type==null){
      type=1;
    }
    let body ={
      city_name : city_name
    };

    let seq = this.api.post('banners/get', body).share();
    seq
      //.map(res => res.json())
      .subscribe(res => {
        let aux= res.json();
        if(aux.length==0 && type==1){
          aux= [{
            url_photo: 'banners/banner_inferior.png',
            url_destination: 'http://veporel.com/'
          },{
            url_photo: 'banners/9838/Arf_logo_nuevo_veporel.png',
            url_destination: 'http://veporel.com/'
          }];
          res._body=JSON.stringify(aux);
          return res.json();
        }else
          return res.json();
      }, err => {
        console.error('ERROR', err);
      });
    return seq;
  }
  get_address(latitude:number, longitude:number){
    this.get_translation();
    let dialog = this.util.show_dialog(this.messages.obteniendo_tu_ubicacion);
    let self=this;
    if(!this.util.getPreference(this.util.constants.address)){
    if(this.platform.is('cordova')){
      let seq =  Observable.create(observer => {

        self.nativeGeocoder.reverseGeocode(latitude, longitude)
          .then(
            (result: NativeGeocoderReverseResult) =>
            {
              dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
              observer.next(result);
              // observer.onCompleted();
            }
          )
          .catch((error: any) => {
            dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
            return error});

      });
      return seq;
    }else{

      let seq =  Observable.create(observer => {

        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=$lat,$lon&key=API_KEY";
        url = url.replace("$lat", latitude + "");
        url = url.replace("$lon", longitude + "");
        url = url.replace("API_KEY", this.util.google_api_key);

        let seq = this.api.get(url).share();
        seq
          .map(res => res.json())
          .subscribe(res => {
            let body = res;
            // self.address = body.results[0].formatted_address;
            //
            // let city_name = body.results[0].address_components[5].short_name;
            //busco en los address componene hasta encontrr cada elemento

            var result = {
              countryCode:"",
              city:"",
              street: body.results[0].formatted_address,
              houseNumber: ''
            };
            for(var i=0; i<body.results.length;i++){
              for(var j=0; j<body.results[i].address_components.length;j++){
                var element = body.results[i].address_components[j];
                if(element.types[0]=="postal_town"){
                  result.city=element.short_name;
                }
                if(element.types[0]=="country"){
                  result.countryCode=element.short_name;
                }
              }
              }
            dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
            observer.next(result);
          }, err => {
            dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
            console.error('ERROR', err);
          });

      });
      return seq;


    }

    }else{
      let seq =  Observable.create(observer => {
        var result = {
          countryCode:this.util.getPreference(this.util.constants.country_code),
          city:this.util.getPreference(this.util.constants.city_name),
          street: this.util.getPreference(this.util.constants.address),
          houseNumber: ''
        };
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        observer.next(result);
        // observer.onCompleted();

      });
      return seq;
    }

  }
  get_promotions_by_location(latitude:number, longitude:number):any{
    let options= JSON.parse(this.util.getPreference("options"));
    if(!options){
      options={
        notifications:false,
        range : 2
      }
    }
    let body ={
      latitude : latitude,
      longitude : longitude,
      range: options.range
    };
    let dialog = this.util.show_dialog(this.messages.obteniendo_las_ofertas);
    let seq = this.api.post('offers/find_by_location', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;

  }
  get_categories(city_name?:string):any{
    if(!city_name)
      city_name="";
    let dialog = this.util.show_dialog(this.messages.obteniendo_las_categorias);
    let seq = this.api.get('categories',{city_name:city_name}).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        /*let aux= res.json();
        let language = this.util.getPreference(this.util.constants.language);
        if(language!='es'){
          for(let i=0; i<aux.length;i++){
            switch (language) {
              case "en":
                 aux[i].name=aux[i].EN;
                break;
            }
          }
          res._body=JSON.stringify(aux);
          return res.json();
        }*/

        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_subcategories(category_id:number, city_name?:string):any{
    if(!city_name)
      city_name="";
    let dialog = this.util.show_dialog(this.messages.obteniendo_las_subcategorias);
    let seq = this.api.get('subcategories', {category_id: category_id, city_name:city_name}).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        let aux= res.json();
        let language = this.util.getPreference(this.util.constants.language);
        if(language!='es'){
          for(let i=0; i<aux.length;i++){
            switch (language) {
              case "en":
                 aux[i].name=aux[i].EN;
                break;
            }
          }
          res._body=JSON.stringify(aux);
          return res.json();
        }
        return res.json();;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_offers_by_category(category_name:number):any{
    let body ={
      latitude : this.util.getPreference(this.util.constants.latitude),
      longitude : this.util.getPreference(this.util.constants.longitude),
      city_name : this.util.getPreference(this.util.constants.city_name),
      category_name : category_name,
    };
    let dialog = this.util.show_dialog(this.messages.obteniendo_las_ofertas);
    let seq = this.api.post('offers/find_by_category', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_offers_by_subcategory_name(subcategory_name:string):any{
    let body ={
      latitude : this.util.getPreference(this.util.constants.latitude),
      longitude : this.util.getPreference(this.util.constants.longitude),
      city_name : this.util.getPreference(this.util.constants.city_name),
      subcategory_name : subcategory_name,
    };
    let dialog = this.util.show_dialog(this.messages.obteniendo_las_ofertas);
    let seq = this.api.post('offers/find_by_subcategorie_name', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_offer_by_id(offer_id:number, branch_id:number):any{
    let body ={
      id : offer_id,
      branch_id: branch_id,
    };
    let dialog = this.util.show_dialog(this.messages.buscando_la_oferta);
    let seq = this.api.post('offers/find_by_id', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_offers_by_user_id():any{
    let dialog = this.util.show_dialog(this.messages.obteniendo_las_ofertas);
    let body = {
      latitude : this.util.getPreference(this.util.constants.latitude),
      longitude : this.util.getPreference(this.util.constants.longitude),
    };
    let seq = this.api.post('offers/find_by_user_id', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  take_offer(offer_id:number, branch_id:number):any{
    let body ={
      offer_id : offer_id,
      branch_id: branch_id
    };
    let dialog = this.util.show_dialog(this.messages.tomando_la_oferta);
    let seq = this.api.post('offers/reserve', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  send_calification(body:any):any {
    let dialog = this.util.show_dialog(this.messages.calificando);
    let seq = this.api.post('offers/qualification', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  send_message(message:string):any{
    let body = {
      message: message
    };
    let dialog = this.util.show_dialog(this.messages.enviando_mensaje);
    let seq = this.api.post('messages', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return err;
      });

    return seq;
  }
  get_countries():any{
    this.get_translation();
    let dialog = this.util.show_dialog(this.messages.listando_los_paises);
    let seq = this.api.get('countries', {}).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_cities_by_country(country_code:string, type?:number):any{
    this.get_translation();
    if(!type)
      type=0;
    console.log(this.messages);
    let dialog = this.util.show_dialog(this.messages.listando_las_ciudades);
    let seq = this.api.post('cities', {country_code:country_code, type: type}).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  recovery_password(email:string):any{
    let body = {
      email: email
    };
    let dialog = this.util.show_dialog(this.messages.solicitando_contrasena_temporal);
    let seq = this.api.post('recovery_password', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  reset_password(email:string, temp_password:number, new_password:string):any{
    let body = {
      email: email,
      temp_password: temp_password,
      new_password: new_password
    };
    let dialog = this.util.show_dialog(this.messages.cambiando_contrasena);
    let seq = this.api.post('reset_password', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_companies_by_city_categorie_and_name(body:any, page:number):any{
    let dialog = this.util.show_dialog(this.messages.obteniendo_companias);
    body.page = page;
    let seq = this.api.post('companies/find', body).share();
    seq

      .subscribe(res => {
        dialog.dismiss().catch(() => {});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_company_by_id(company_id:number):any{
    let dialog = this.util.show_dialog(this.messages.obteniendo_información_del_negocio);
    let body = {
      company_id: company_id
    };
    let seq = this.api.post('companies/find_by_company_id', body).share();
    seq
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res.json();
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }

}
