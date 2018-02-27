import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import {FindPromotiosPage} from "../find-promotios/find-promotios";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the CategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public categories:any[];
  public language="";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
    public translateService:TranslateService
  ) {
    let self = this;
    translateService.get('LANG').subscribe(
      lang => {
        self.language=lang;
        let city_name=self.util.getPreference(this.util.constants.city_name);
        self.veporel.get_categories(city_name).subscribe(
          (result: any) => {
            if (result != null) {
              self.categories = JSON.parse(result._body);
              if(self.categories.length==0){
                self.navCtrl.pop();
                this.util.show_toast('error_13');
              }
            }
          },
          error => {

          }
        );
      }
    );



  }

  ionViewDidLoad() {
    this.get_banners();
  }

  public get_offers(category_name:number){
    this.navCtrl.push(FindPromotiosPage,{
      "type_find_promotio": this.util.constants.find_promotion_by_category,
      "category_name": category_name
    })
  }

  private banners:any;
  private get_banners(){
    let city_name = this.util.getPreference(this.util.constants.city_name);
    let self = this;
    //Obtengo los banners
    this.veporel.get_banners(city_name).subscribe(
      (result:any) =>{
        let body =  result._body;
        if(body!=null)
        {
          self.banners = JSON.parse(body);
        }else{
        }

      },
      error =>{
      }
    );
  }

  public get_name(category){
    return category[this.language]
  }

}
