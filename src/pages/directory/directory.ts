import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, Platform} from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { Geolocation } from '@ionic-native/geolocation';
import { CompaniesPage } from '../companies/companies';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TranslateService } from '@ngx-translate/core';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition'



@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {

  private city_name="";
  private country_name="";
  public language="";

  speechList: Array<string> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;

  data:{
    country_name:string,
    country_code:string,
    departament_name:string,
    city_name:string,
    name:string,
    latitude:number,
    longitude:number,
    pagetoken:string
  }={
    country_name:"",
    country_code:"",
    departament_name:"",
    city_name:"",
    name:"",
    latitude:0,
    longitude:0,
    pagetoken:""

  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util:Util,
    public veporel:VePorEl,
    private geolocation: Geolocation,
    private ga: GoogleAnalytics,
    private diagnostic: Diagnostic,
    private translateService: TranslateService,
    private platform: Platform,
    private alertCtrl: AlertController,
    private speech: SpeechRecognition,
  ) {
    let self = this;
    translateService.get('LANG').subscribe(
      lang => {
        self.language=lang;
      }
    );

  }

  ionViewWillLeave(){
    this.all_dialogs.forEach(function (dialog) {
      try {
        dialog.dismissAll();
      } catch (e) {
      }
    })
  }

  private all_dialogs=[];

  get_location(){

    let self = this;
    if (this.platform.is('cordova')) {
      self.diagnostic.isLocationAuthorized().then(function (isAuthorized) {
        if (isAuthorized) {
          self.diagnostic.isLocationEnabled().then(function (isAvailable) {
            if (isAvailable) {
              self.geolocation.getCurrentPosition().then((resp) => {
                self.data.latitude = resp.coords.latitude;
                self.data.longitude = resp.coords.longitude;
                self.veporel.get_address(resp.coords.latitude, resp.coords.longitude, true).subscribe(
                  (result: any) => {
                    if (!result.countryName || !result.countryCode || !result.city) {
                      self.util.show_toast('error_17');
                      self.navCtrl.pop();
                    } else {
                      self.country_name = result.countryName;
                      self.data.country_name = result.countryName;
                      self.data.country_code = result.countryCode;
                      self.data.city_name = result.city;
                      self.city_name = result.city;

                      self.util.savePreference(self.util.constants.latitude, self.data.latitude);
                      self.util.savePreference(self.util.constants.longitude, self.data.longitude);
                      self.util.savePreference(self.util.constants.city_name, self.data.city_name);
                      self.util.savePreference(self.util.constants.country_code, self.data.country_code);
                      self.util.savePreference(self.util.constants.country_name, self.data.country_name);
                    }
                  },
                  ()=>{
                    self.util.show_toast('error_17');
                    self.navCtrl.pop();
                  }
                );
              }).catch((error) => {
                this.util.show_toast('error_22');
                self.navCtrl.pop();
              });
            } else {

              console.log("activar_ubicacion");
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
              },()=>{
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
            ()=>{
              this.util.show_toast('error_22');
              self.navCtrl.pop();
            });


        }
      }).catch(function () {
        this.util.show_toast('error_22');
        self.navCtrl.pop();
      });
    } else {
      //Obtengo las coordenadas actuales

      self.data.latitude = self.util.getPreference(self.util.constants.latitude);
      self.data.longitude = self.util.getPreference(self.util.constants.longitude);
      self.veporel.get_address(self.data.latitude, self.data.longitude, true).subscribe(
        (result: any) => {
          //dialog.dismiss();
          if (!result.countryName || !result.countryCode || !result.city) {
            self.util.show_toast('error_17');
            self.navCtrl.pop();
          } else {
            self.country_name = result.countryName;
            self.data.country_name = result.countryName;
            self.data.country_code = result.countryCode;
            self.data.city_name = result.city;
            self.city_name = result.city;

            self.util.savePreference(self.util.constants.latitude, self.data.latitude);
            self.util.savePreference(self.util.constants.longitude, self.data.longitude);
            self.util.savePreference(self.util.constants.city_name, self.data.city_name);
            self.util.savePreference(self.util.constants.country_code, self.data.country_code);
            self.util.savePreference(self.util.constants.country_name, self.data.country_name);
          }
        }, () => {
          self.country_name = self.util.getPreference(self.util.constants.country_name);
          self.data.country_name = self.util.getPreference(self.util.constants.country_name);
          self.data.country_code = self.util.getPreference(self.util.constants.country_code);
          self.data.city_name = self.util.getPreference(self.util.constants.city_name);
          self.city_name = self.util.getPreference(self.util.constants.city_name);
        }
      );
    }




  }

  ionViewDidLoad() {
    this.get_location();
  }


  public find(){
    //this.ga.trackEvent('Busqueda negocios', 'Categoria', subcategorie);
    //Valido el termino de busqueda
    if(!this.data.name){
      this.util.show_toast('error_18');
    }else{
      //Agrego el nombre de la ciudad al campo de busqueda
      this.data.city_name=this.city_name;
      this.data.pagetoken="";
      this.navCtrl.push(CompaniesPage,this.data);
    }

  }

  async isSpeechSupported(): Promise<boolean> {
    let isAvailable = await this.speech.isRecognitionAvailable();
    return isAvailable;
  }
  async getPermission(): Promise<void> {
    try {
      let permission = await this.speech.requestPermission();
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }
  async hasPermission(): Promise<boolean> {
    try {
      let permission = await this.speech.hasPermission();
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }
  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      let languages = await this.speech.getSupportedLanguages();
      return languages;
    }
    catch (e) {
      console.error(e);
    }
  }
  listenForSpeech(): void {
    var self=this;
    this.isSpeechSupported().then((isSupported:boolean)=>{
      if(isSupported){
        self.hasPermission().then((hasPermission:boolean)=>{
          if(hasPermission){
            self.androidOptions = {
              prompt: 'Cual producto deseas buscarle ofertas',
              language: 'es-MX'
            }

            self.iosOptions = {
              language: 'es-MX'
            }

            if (self.platform.is('android')) {
              self.speech.startListening(self.androidOptions).subscribe(data => {
                let confirm = self.alertCtrl.create({
                  title:  "Buscar ofertas",
                  message: "Deseas buscar ofertas del producto "+data[0]+"?",
                  buttons: [
                    {
                      text: "Cancelar",
                      handler: () => {

                      }
                    },
                    {
                      text: "Buscar",
                      handler: () => {
                        self.data.pagetoken="";
                        self.data.name=data[0];
                        self.find();
                      }
                    }
                  ]
                });
                confirm.present();
              }, error => console.log(error));
            }
            else if (self.platform.is('ios')) {
              self.speech.startListening(self.iosOptions).subscribe(data => self.speechList = data, error => console.log(error));
            }
          }else{
            self.getPermission();
          }
        });


      }else{

      }
    });


  }

}
