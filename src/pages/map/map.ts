import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { VePorEl, Util } from '../../providers/providers';
import { HomePage } from '../home/home';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TranslateService } from '@ngx-translate/core';


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
  private country_code:string;
  private country_name:string;

  constructor(
    private googleMaps: GoogleMaps,
    public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    public veporel:VePorEl,
    public util:Util,
    private diagnostic: Diagnostic,
    private translateService: TranslateService,
    private alertCtrl: AlertController,

  ) {

  }



  ionViewDidLoad()
  {
    this.util.savePreference(this.util.constants.address, '');
    this.get_location();

  }

  get_location(){

    let self = this;
    let options= JSON.parse(this.util.getPreference("options"));
    if(!options){
      options={
        notifications:true,
        range : 2,
        debug: false
      }
    }
    if (!options.debug) {
      if (this.platform.is('cordova')) {
        self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
          if (isAuthorized) {
            self.diagnostic.isLocationEnabled().then(function (isAvailable) {
              if (isAvailable) {
                self.geolocation.getCurrentPosition().then((resp) => {
                  self.loadMap(resp.coords.latitude,resp.coords.longitude);
                }).catch((error) => {
                  this.util.show_toast('error_22');
                  self.navCtrl.pop();
                });
              } else {
                self.translateService.get(["ubicacion", "activar_ubicacion", "salir", "activar"]).subscribe((res) => {
                  let confirm = self.alertCtrl.create({
                    title: res.ubicacion,
                    message: res.activar_ubicacion,
                    buttons: [
                      {
                        text: res.salir,
                        handler: () => {
                          if (self.platform.is('android')) {
                            self.platform.exitApp();
                          } else {
                            self.navCtrl.pop();
                            self.util.show_toast('error_16');
                          }
                        }
                      },
                      {
                        text: res.activar,
                        handler: () => {
                          self.diagnostic.switchToLocationSettings();
                        }
                      }
                    ]
                  });
                  confirm.present();
                }, () => {
                  this.util.show_toast('error_22');
                  self.navCtrl.pop();
                });

              }
            }).catch((error) => {
              this.util.show_toast('error_22');
              self.navCtrl.pop();
            });
          } else {
            self.translateService.get(["ubicacion", "mensaje_ubicacion", "salir", "activar"]).subscribe((res) => {
                let confirm = self.alertCtrl.create({
                  title: res.ubicacion,
                  message: res.mensaje_ubicacion,
                  buttons: [
                    {
                      text: res.salir,
                      handler: () => {
                        if (self.platform.is('android')) {
                          self.platform.exitApp();
                        } else {
                          self.navCtrl.pop();
                          self.util.show_toast('error_16');
                        }
                      }
                    },
                    {
                      text: res.activar,
                      handler: () => {
                        self.diagnostic.requestLocationAuthorization().then(function (status) {
                          if (status == 'GRANTED' || status == 'authorized_when_in_use' || status == 'authorized') {
                            self.get_location();
                          } else {
                            if (self.platform.is('android')) {
                              self.platform.exitApp();
                            } else {
                              self.navCtrl.pop();
                              self.util.show_toast('error_16');
                            }
                          }
                        }).catch(function (error) {

                        });
                      }
                    }
                  ]
                });
                confirm.present();
              },
              () => {
                this.util.show_toast('error_22');
                self.navCtrl.pop();
              });


          }
        }).catch(function () {
          this.util.show_toast('error_22');
          self.navCtrl.pop();
        });
      }
      else {
        //Obtengo las coordenadas actuales

        let latitude = self.util.getPreference(self.util.constants.latitude);
        let longitude = self.util.getPreference(self.util.constants.longitude);
        self.loadMap(latitude,longitude);

      }
    }else{
      let latitude = self.util.getPreference(self.util.constants.latitude);
      let longitude = self.util.getPreference(self.util.constants.longitude);
      self.loadMap(latitude,longitude);

    }




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

          var aux = result.street + " "+ result.houseNumber;
          self.city_name = result.city;
          self.address = aux;
          self.country_code = result.countryCode;
          self.country_name = result.countryName;
          // let body = JSON.parse(result._body);
          // var aux = body.results[0].formatted_address;
          // self.city_name = body.results[0].address_components[5].short_name;
          // self.address = aux;

          self.txt_adress.setFocus();
        } }
    );
  }

  public return_new_address(){
    let parameters = {
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      city_name: this.city_name,
      country_code: this.country_code,
      country_name: this.country_name
    };
    this.util.savePreference(this.util.constants.address,"true");
    this.navCtrl.push(HomePage, parameters);
  }
}
