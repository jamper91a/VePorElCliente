import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private banners:any;
  private url:string;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public translateService: TranslateService,
    public veporel:VePorEl,
    public util:Util,
  	) {
    //this.url = this.util.url;
    let self = this;
    //Obtentgo los banners
    this.veporel.get_banners('Bogotá').subscribe(
        (result:any) =>{
           let body =  result._body;
           if(body!=null)
           {
             self.banners = JSON.parse(body);
             console.log(self.banners);
           }else{
           }

        },
        error =>{
        }
        );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
