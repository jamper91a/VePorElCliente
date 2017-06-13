import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { VePorEl } from '../../providers/providers';

declare var google: any;
@Component({
  selector: 'page-map-offer',
  templateUrl: 'map-offer.html',
})

export class MapOfferPage {
  private map:any;
  @ViewChild('map') mapElement: ElementRef;
  constructor(
    private googleMaps: GoogleMaps,
    public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    public veporel:VePorEl,)  {
  }

  ionViewDidLoad()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadMap(resp.coords.latitude,resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  private loadMap(latitude:number, longitude:number){

    let self = this;
    let latLng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.addListener('click', function(e) {
      self.addMarket(e.latLng);
    });

    this.addMarket(latLng);
  }

  private marker=null;
  private addMarket(myLatlng:any)
  {
    if(this.marker!=null)
      this.marker.setMap(null);
    this.marker = new google.maps.Marker({
      position: myLatlng,
      animation: google.maps.Animation.DROP,
      map: this.map
    });

  }

}
