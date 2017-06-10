/**
 * Created by Usuario on 02/06/2017.
 */

export class Util{

  public constants;
  public url:string;
  public google_api_key:string;

  constructor() {
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
      offer_id: 'offer_id'
    }
    this.url = "http://192.168.0.2:1337/";
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
}
