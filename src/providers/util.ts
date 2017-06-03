/**
 * Created by Usuario on 02/06/2017.
 */

export class Util{

  public constants;

  constructor() {
    this.constants = {
      logged: 'logged',
      tutorial: 'tutorial',
      user: 'user',
      token: 'token'
    }
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
