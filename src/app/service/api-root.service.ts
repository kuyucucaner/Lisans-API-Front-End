import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import configurl from '../../assets/config/config.json'
@Injectable({
  providedIn: 'root'
})
export class ApiRootService {
  urlApiAddress = configurl.apiServer.url + '/api/ApiAddress/';
  urlCustomerBranch = configurl.apiServer.url + '/api/CustomerBranch/';
  urlCustomer = configurl.apiServer.url + '/api/Customer/';
  urlDevice = configurl.apiServer.url + '/api/Device/';
  urlDeviceLicence = configurl.apiServer.url + '/api/DeviceLicence/';
  urlUser = configurl.apiServer.url + '/api/User/';
  urlLogin = configurl.apiServer.url + '/api/Authenticate/';
  urlSystemUser = configurl.apiServer.url + '/api/SystemUser/';
  SERVER_ROOT;
  SERVER_MODE =5;
  appSecret = '296259c642294f9eb7c223198f10b4f0';
  //MOBİL MODE
  //1 QR MENU
  //2 TABLET MENU
  MOBIL_MODE = 1;
 // PAYMENT_URL;
  //Tablet İçin İstekleri Cacheleme
  isActiveCache=false;
  // private MokaPos = new BehaviorSubject<any>('');

  constructor(
    private router: Router
  ) {

    /*if (this.SERVER_MODE === 1) {
      this.SERVER_ROOT = 'https://qrapitest.kirazsoft.com/api/v1/';
      this.PAYMENT_URL = 'https://service.moka.com/';
      // this.PAYMENT_URL = 'https://service.moka.com/';
      this.controlMobileMode();

    }
    if (this.SERVER_MODE === 2) {
      this.SERVER_ROOT = 'https://qrapi.kirazsoft.com/api/v1/';
      this.PAYMENT_URL = 'https://service.moka.com/';
      this.controlMobileMode();
    }
    if (this.SERVER_MODE === 3) {
      this.SERVER_ROOT = 'https://qrapitest2.kirazsoft.com/api/v1/';
      this.PAYMENT_URL = 'https://service2.testmoka.com/';
      this.controlMobileMode();
    }
    if (this.SERVER_MODE === 4) {
      this.SERVER_ROOT = 'https://qrapi.kirazsoft.com/api/v1/';
      this.PAYMENT_URL = 'https://service.moka.com/';
      this.controlMobileMode();
    }*/
    if (this.SERVER_MODE === 5) {
     // this.SERVER_ROOT = 'http://localhost:56585/api/v1/';
      this.SERVER_ROOT = 'https://localhost:7164';
    }
  }
  public logOut = () => {
    localStorage.removeItem("Token");
    this.router.navigate(["/"]);
  }

 /* controlMobileMode() {
    if (this.MOBIL_MODE === 2) {
      this.router.navigate(['tablet']);
    }
  }*/

  // getMokaPos(): Observable<any> {
  //   return this.MokaPos.asObservable();
  // }
  //
  // setMokaPos(newValue): void {
  //   this.MokaPos.next(newValue);
  // }
}
