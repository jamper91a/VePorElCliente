import {ToastController, LoadingController, Loading} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
/**
 * Created by Usuario on 02/06/2017.
 */
@Injectable()
export class Util{

  public constants;
  public url:string;
  public google_api_key:string;
  constructor(
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController
  ) {
    this.constants = {
      logged: 'logged',
      tutorial: 'tutorial',
      user: 'user',
      token: 'token',
      latitude: 'latitude',
      longitude: 'longitude',
      type_find_promotio: 'type_find_promotio',
      find_promotio_by_location: 'find_promotio_by_location',
      find_promotion_by_subcategory: 'find_promotion_by_subcategory',
      category_id: 'category_id',
      city_name: 'city_name',
      address: 'address',
      subcategory_id: 'subcategory_id',
      subcategory_name: 'subcategory_name',
      offer_id: 'offer_id',
      branch_id: 'branch_id',
      offers_user: 'offers_user',
      offer: 'offer',
      kind_map:'kind_map',
      map_offer:'map_offer',
      map_branch:'map_branch',
      branch: 'branch',
      company: 'company',
      country_code: 'country_code',
      find_promotion_by_user_id: 'find_promotion_by_user_id',
      find_promotion_by_subcategory_name: 'find_promotion_by_subcategory_name'
    };
    this.url = "http://79.143.188.95:85/";
    //this.url = "http://192.168.1.74:1337/";
    this.google_api_key = "AIzaSyDvZFVr2cdCCVyLmMBg0-8MaJTJDaHD8pE";
  }

  public savePreference(key:string, value:any)
  {
    localStorage.setItem(key, value);
  }
  public getPreference(key):any
  {
    return localStorage.getItem(key);
  }

  public clearAllData(){
    localStorage.clear();
  }

  public show_toast(message:string, position?:string){
    this.translateService.get(message).subscribe((value) => {
      if(!position)
        position='bottom';
      let toast = this.toastCtrl.create({
        message: value,
        duration: 3000,
        position: position
      });
      toast.present();
      return toast;
    });

  }

  public show_dialog(message:string):Loading{
    let loading = this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: false
    });
    loading.present();
    return loading;

  }
}
