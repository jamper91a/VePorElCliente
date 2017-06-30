import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VePorEl } from '../../providers/providers';
import { Util } from '../../providers/providers';
import { SubcategoriesPage } from '../subcategories/subcategories';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public veporel:VePorEl,
    public util:Util,
  ) {

    let self = this;
    self.veporel.get_categories().subscribe(
      (result: any) => {
        if (result != null) {
          self.categories = JSON.parse(result._body);
        }
      },
      error => {

      }
    );
  }

  ionViewDidLoad() {
    this.get_banners();
  }

  public find_subcategories(category_id:number){
    this.navCtrl.push(SubcategoriesPage,{
      category_id: category_id
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

}
