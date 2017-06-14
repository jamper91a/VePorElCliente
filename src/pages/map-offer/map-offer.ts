import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams, ActionSheetController  } from 'ionic-angular';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import { CalificationPage } from '../calification/calification';

declare var google: any;
@Component({
  selector: 'page-map-offer',
  templateUrl: 'map-offer.html',
})

export class MapOfferPage {



  private offers_user:any;
  private offer:any;

  private map:any;
  private directionsDisplay;
  private directionsService = new google.maps.DirectionsService();
  @ViewChild('map') mapElement: ElementRef;
  private latLngOrigin:any;
  private latLngDestination:any;
  constructor(
    private googleMaps: GoogleMaps,
    public navParams: NavParams,
    public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    public veporel:VePorEl,
    public util:Util,
    public actionSheetCtrl: ActionSheetController,
    public translate: TranslateService,
  )  {
  }

  ionViewDidEnter()
  {
    let self= this;
    this.offers_user = this.navParams.get(this.util.constants.offers_user);
    this.offer = this.navParams.get('offer');
    this.geolocation.getCurrentPosition().then((resp) => {
      //Agrego la ubicación del local
      self.latLngOrigin = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      self.latLngDestination = new google.maps.LatLng(this.offer.latitude, this.offer.longitude);
      this.loadMap(resp.coords.latitude,resp.coords.longitude);
      //self.calcRoute();
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  private loadMap(latitude:number, longitude:number){

    this.directionsDisplay = new google.maps.DirectionsRenderer();
    let latLng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
  }

  private calcRoute() {
    let self = this;
    let request = {
      origin: this.latLngOrigin,
      destination: this.latLngDestination,
      travelMode: 'DRIVING'
    };
    this.directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        result.routes[0].legs[0].start_address="Mi ubicación";
        result.routes[0].legs[0].end_address=self.offer.name;
        self.directionsDisplay.setDirections(result);
      }
    });
  }

  public show_options() {
    let self=this;
    this.translate.get(["opciones",
      "google_maps",
      "ver_mi_oferta",
      "waze",
      "lo_reclame",
      "no_lo_reclame",
    ]).subscribe(
      (values) => {
        let actionSheet = this.actionSheetCtrl.create({
          title: values.opciones,
          buttons: [
            {
              text: values.ver_mi_oferta,
              icon: !this.platform.is('ios') ? 'search' : null,
              handler: () => {
              }
            },
            {
              icon: !this.platform.is('ios') ? 'happy' : null,
              text: values.lo_reclame,
              handler: () => {
                self.navCtrl.push(CalificationPage,{
                  reclamed: 1,
                  id: self.offer.id
                });
              }
            },
            {
              text: values.no_lo_reclame,
              icon: !this.platform.is('ios') ? 'sad' : null,
              handler: () => {
                self.navCtrl.push(CalificationPage,{
                  reclamed: 2,
                  id: self.offer.id
                });
              }
            },
            {
              text: values.google_maps,
              icon: !this.platform.is('ios') ? 'compass' : null,
              handler: () => { }
            },
            {
              text: values.waze,
              icon: !this.platform.is('ios') ? 'compass' : null,
              handler: () => { }
            }
          ]
        });
        actionSheet.present();
      });
  }


}
