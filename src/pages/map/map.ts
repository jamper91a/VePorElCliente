import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { VePorEl } from '../../providers/providers';
import { HomePage } from '../home/home';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  private map:any;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('txt_adress') txt_adress;

  private address:string;
  private latitude:number;
  private longitude:number;
  private city_name:string;

  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public platform: Platform,
    private geolocation: Geolocation,
    public veporel:VePorEl,) {

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
    this.get_address(myLatlng.lat(), myLatlng.lng());

  }

  private get_address(latitude:number, longitude:number){
    let self = this;
    this.latitude = latitude;
    this.longitude = longitude;
    this.veporel.get_address(latitude,longitude).subscribe(
      (result:any)=>{
        if(result!=null){
          let body = JSON.parse(result._body);
          var aux = body.results[0].formatted_address;
          self.city_name = body.results[0].address_components[5].short_name;
          self.address = aux;
          self.txt_adress.setFocus();
        } }
    );
  }

  public return_new_address(){
    let parameters = {
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      city_name: this.city_name
    }
    console.log(parameters);
    this.navCtrl.push(HomePage, parameters);
  }
}
