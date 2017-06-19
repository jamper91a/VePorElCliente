import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { Util } from './util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class VePorEl {


  constructor(
    public http: Http,
    public api: Api,
    public util: Util,

  ) {

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



  get_promotions_by_location(latitude:number, longitude:number){
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
    let dialog = this.util.show_dialog('Obteniendo las ofertas');
    let seq = this.api.post('offers/find_by_location', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;

  }

  get_categories(){
    let dialog = this.util.show_dialog('Obteniendo las categorias');
    let seq = this.api.get('categories').share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }

  get_subcategories(category_id:number){
    let dialog = this.util.show_dialog('Obteniendo las subcategorias');
    let seq = this.api.get('subcategories', {category_id: category_id}).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }

  get_offers_by_subcategory(subcategory_id:number){
    let body ={
      latitude : this.util.getPreference(this.util.constants.latitude),
      longitude : this.util.getPreference(this.util.constants.longitude),
      city_name : this.util.getPreference(this.util.constants.city_name),
      subcategory_id : subcategory_id,
    };
    let dialog = this.util.show_dialog('Obteniendo las ofettas');
    let seq = this.api.post('offers/find_by_subcategorie', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }

  get_offer_by_id(offer_id:number){
    let body ={
      id : offer_id
    };
    let dialog = this.util.show_dialog('Buscando la oferta');
    let seq = this.api.post('offers/find_by_id', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }

  take_offer(offer_id:number, branch_id:number){
    let body ={
      offer_id : offer_id,
      branch_id: branch_id
    };
    let dialog = this.util.show_dialog('Tomando la oferta');
    let seq = this.api.post('offers/reserve', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  send_calification(body:any)
  {
    let dialog = this.util.show_dialog('Calificando');
    let seq = this.api.post('offers/qualification', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  send_message(message:string){
    let body = {
      message: message
    };
    let dialog = this.util.show_dialog('Enviando mensaje');
    let seq = this.api.post('messages', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_countries(){
    let dialog = this.util.show_dialog('Listando los paises');
    let seq = this.api.get('countries', {}).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  get_cities_by_country(country_code:string){
    let dialog = this.util.show_dialog('Listando las ciudades');
    let seq = this.api.get('cities', {country_code:country_code}).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }

  recovery_password(email:string){
    let body = {
      email: email
    };
    let dialog = this.util.show_dialog('Solicitando contraseña temporal');
    let seq = this.api.post('recovery_password', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }
  reset_password(email:string, temp_password:number, new_password:string){
    let body = {
      email: email,
      temp_password: temp_password,
      new_password: new_password
    };
    let dialog = this.util.show_dialog('Cambiando contraseña');
    let seq = this.api.post('reset_password', body).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        return res;
      }, err => {
        dialog.dismiss().catch(() => {console.log('ERROR CATCH: LoadingController dismiss')});
        console.error('ERROR', err);
      });

    return seq;
  }

}
