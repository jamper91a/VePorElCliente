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
  private messages: any;


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
    this.get_messages();

  }

  private get_messages() {
    var self = this;
    self.translateService.get([
      'obteniendo_tu_ubicacion',
      'registrando',
      "ubicacion",
      "error_22",
      "reintentar",
      "salir"
    ]).subscribe((value) => {
      self.messages = value;
    }, (err) => {
      alert(err);
    });
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
    self.util.setLogs("Obteniendo ubicación...");
    let options= JSON.parse(this.util.getPreference("options"));
    if(!options){
      options={
        notifications:true,
        range : 2,
        debug: false
      }
    }

    self.util.setLogs("Options: "+JSON.stringify(options));
    if (!options.debug) {
      let dialog = self.util.show_dialog(self.messages.obteniendo_tu_ubicacion);
      self.veporel.get_coordenates(dialog).subscribe(
        (location)=> {
          self.util.setLogs(JSON.stringify(location));
          switch (location.code) {
            case 1:
              self.data.latitude = location.lat;
              self.data.longitude = location.lon;
              self.veporel.get_address(location.lat, location.lon, true).subscribe(
                (result: any) => {
                  dialog.dismiss();
                  self.util.setLogs("Results 1: "+JSON.stringify(result));
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
                (error) => {
                  dialog.dismiss();
                  self.util.setLogs(JSON.stringify(error));
                  let confirm = self.alertCtrl.create({
                    title: self.messages.ubicacion,
                    message: self.messages.error_22,
                    buttons: [
                      {
                        text: self.messages.salir,
                        handler: () => {
                          if (self.platform.is('android')) {
                            self.platform.exitApp();
                          }else{
                            self.util.show_toast('error_22');
                          }
                        }
                      },
                      {
                        text: self.messages.reintentar,
                        handler: () => {
                          self.get_location();
                        }
                      }
                    ]
                  });
                  confirm.present();
                }
              );
              break;
            case 6:
              self.get_location();
              break;
            case 3:
              self.navCtrl.pop();
              self.diagnostic.switchToLocationSettings();
              break;
          }
        },
        (err)=>{
          dialog.dismiss();
          self.util.setLogs(JSON.stringify(err));
          switch (err.code){
            case 3:
            case 5:
            case 7:
              self.util.show_toast('error_16');
              self.navCtrl.pop();
              break;
            case 1:
            case 2:
              let confirm = self.alertCtrl.create({
                title: self.messages.ubicacion,
                message: self.messages.error_22,
                buttons: [
                  {
                    text: self.messages.salir,
                    handler: () => {
                      self.navCtrl.pop();
                    }
                  },
                  {
                    text: self.messages.reintentar,
                    handler: () => {
                      self.get_location();
                    }
                  }
                ]
              });
              confirm.present();

              break;
            default:
              self.util.show_toast(err.message);
              break;
          }
        });
    }
    else{
      self.util.setLogs("Esta en debug, obteniendo datos ...");
      self.data.latitude = self.util.getPreference(self.util.constants.latitude);
      self.data.longitude = self.util.getPreference(self.util.constants.longitude);

      self.util.setLogs("Latitude: "+self.data.latitude);
      self.util.setLogs("Longitude: "+self.data.longitude);
      self.veporel.get_address(self.data.latitude, self.data.longitude, true).subscribe(
        (result: any) => {
          self.util.setLogs("Results: "+JSON.stringify(result));
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
        }, (err) => {
          self.util.setLogs("Error obteniendo la ubicación: "+err);
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


  public find(name?:string){
    if(name)
      this.data.name = name;
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
