import {ElementRef, Injectable, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { map, Observable } from 'rxjs';
import { ApiAddress } from '../Models/apiaddress';
import { CustomerBranch } from '../Models/customer-branch';
import { Customers } from '../Models/customers';
import { Device } from '../Models/device';
import { DeviceLicence } from '../Models/device-licence';
import { SystemUser } from '../Models/systemuser';
import { Users } from '../Models/users';


@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
 
    value:string;
    searchText!:string | any;
    //addresstype
    public map = new Map<number, string>(
      [
        [21, 'NarPOS Patron Uygulaması'],
        [22, 'NarPOS Terminal Uygulaması'],
        [23, 'NarPOS Caller Id'],
      ]
    )  
    

    //lisansdurumu
    public map2 = new Map<number, string>(
        [
          [1, 'Onay Bekliyor'],
          [2, 'Onaylanmış'],
        ]
      )//apptype
    public map3 = new Map<number, string>(
        [
          [1, 'Patron'],
          [2, 'Terminal'],
          [3, 'Caller Id'],
        ]
      )
      //Rol
    public map4 = new Map<number, string>(
      [
        [1, 'Admin'],
        [2, 'Kullanıcı'],
      ]
    )
      invalidLogin?: boolean;
      loginForm!: FormGroup;

      checked!:true;
     massage = "";
     hideModal= true;
     currentDate:any;
     finishDate:any;
     confirmedDate:any;
     modifiedDate:any;
     time = {hour: 13, minute: 30, second: 30};
     timee : any;
     seconds = true;
    //customerbranch
    CustomerBranchList?: Observable<CustomerBranch[]>;
    CustomerBranchForm: any;
    CustomerBranchListTata? :CustomerBranch[]=[];
    CustomerBranchListTableFilter:CustomerBranch[]=[];
    CustomerBranchListTable:CustomerBranch[] = [];
    CustomerBranchCategory = "";
    //apiaddress
    ApiAddressList?: Observable<ApiAddress[]>;
    ApiAddressForm:any;
    ApiAddressListTable:ApiAddress[] = [];
    ApiAddressCategory = "";
   //device
    DeviceList?: Observable<Device[]>;
    DeviceListTata? :Device[]=[];
    DeviceListTable :Device[]=[] ;
    DeviceListTableHeader :Device[]=[] ;
    DeviceListTableFilter:Device[]=[];
    DeviceForm:any;
    DeviceCategory = "";
    //devicelicence
    DeviceLicenceList?: Observable<DeviceLicence[]>;
    DeviceLicenceListTata? :DeviceLicence[]=[];
    DeviceLicenceTable:DeviceLicence[]=[];
    DeviceLicenceTableFilter:DeviceLicence[]=[];
    DeviceLicenceActiveList:DeviceLicence[]=[];
    DeviceLicenceTodayList:DeviceLicence[]=[];
    DeviceLicenceBossTodayConfirmList:DeviceLicence[]=[];
    DeviceLicenceTerminalTodayConfirmList:DeviceLicence[]=[];
    DeviceLicenceBossWeekConfirmList:DeviceLicence[]=[];
    DeviceLicenceTerminalWeekConfirmList:DeviceLicence[]=[];
    DeviceLicenceBossMonthConfirmList:DeviceLicence[]=[];
    DeviceLicenceTerminalMonthConfirmList:DeviceLicence[]=[];
    DeviceLicenceEndTimeList:DeviceLicence[]=[];
    DeviceLicenceForm: any;
    DeviceLicenceCategory = "";
    //customer
    CustomersList?: Observable<Customers[]>;
    CustomersListTable=[];
    CustomersForm: any;
    CustomersCategory = "";
    //user
    UsersList!: Observable<Users[]>;
    UsersListTable =[];
    usersForm: any;
    usersForm2: any;
    userCategory = "";
    //SystemUser
    SystemUsersList!: Observable<SystemUser[]>;
    SystemUsersListTable:SystemUser[] =[];
    SystemUsersForm: any;
    SystemUserCategory = "";
    SystemUsersRole:any;
    rolelogin:any;

    //
    Id = 0;
    addressType: any;
    isDisabled: boolean = true;
    submitted?: boolean;



//Tablo Filter User Select
filterCustomerBranchDevice:number;
filterCustomerBranchDeviceLicence:number;
filterCustomerCustomerBranch:number;
// MODAL
closeResult = '';
  port: string;
  extensionTime: any;
  expireDate: any;

 



}
