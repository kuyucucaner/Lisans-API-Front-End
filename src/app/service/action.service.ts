import { ElementRef, Injectable, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import dayjs from "dayjs";
import { ToastrService } from "ngx-toastr";
import { ApiRootService } from "./api-root.service";
import { DatabaseService } from "./database.service";
import { HttpRequestService } from "./http-request.service";
import { ApiAddress } from '../Models/apiaddress';
import { CustomerBranch } from '../Models/customer-branch';
import { Customers } from '../Models/customers';
import { Device } from '../Models/device';
import { DeviceLicence } from '../Models/device-licence';
import { Users } from '../Models/users';
import { ApiAddressComponent } from "../api-address/api-address.component";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UsersComponent } from "../Users/users.component";
import { map } from "rxjs/internal/operators/map";
import { SystemUser } from "../Models/systemuser";
import { of } from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class ActionService {

  @ViewChild('deleted', { static: false })
  public deleted!: SwalComponent;

  constructor(public formbulider: FormBuilder,
    public databaseService: DatabaseService,
    public httpRequestService: HttpRequestService,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService,
    private apiRootService: ApiRootService,
    private modalService: NgbModal) { }

  //fonksiyonlar
  //api
  getApiAddressList() {
this.databaseService.ApiAddressList = this.httpRequestService.getApiAddressList();
 this.databaseService.ApiAddressList.pipe(
      map((data: any) => data.map(d => {
        return { ...d, fulfillment: this.databaseService.map.get(d.addressType) }
      }
      )
      )
    ).subscribe((value: any) =>{
    this.databaseService.ApiAddressListTable = value;
    this.databaseService.ApiAddressListTable.length;
   }  
  )
 
  }

  PostApiAddress(ApiAddress: ApiAddress) {
    const ApiAddress_Master = this.databaseService.ApiAddressForm.value;
    this.httpRequestService.postApiAddressData(ApiAddress_Master).subscribe(
      () => {
        this.getApiAddressList();
        this.toastr.success('Api Adresi Başarıyla Eklendi');
        this.databaseService.ApiAddressForm.reset();

      }
    );
  }
  ApiAddressDetailsToEdit(id: string) {
    this.httpRequestService.getApiAddressDetailsById(id).subscribe(ApiAddressResult => {
      this.databaseService.Id = ApiAddressResult.id;
      this.databaseService.ApiAddressForm.controls['customerBranchId'].setValue(ApiAddressResult.customerBranchId);
      this.databaseService.ApiAddressForm.controls['address'].setValue(ApiAddressResult.address);
      this.databaseService.ApiAddressForm.controls['userName'].setValue(ApiAddressResult.userName);
      this.databaseService.ApiAddressForm.controls['password'].setValue(ApiAddressResult.password);
      this.databaseService.ApiAddressForm.controls['addressType'].setValue(ApiAddressResult.addressType);
    });
  }
  UpdateApiAddress(ApiAddress: ApiAddress) {
    ApiAddress.id = this.databaseService.Id;
    const ApiAddress_Master = this.databaseService.ApiAddressForm.value;
    this.httpRequestService.updateApiAddress(ApiAddress_Master).subscribe(() => {
      this.getApiAddressList();
      this.toastr.success('Api Adresi Başarıyla Güncellendi');
      this.databaseService.ApiAddressForm.reset();


    });
  }

  DeleteApiAddress(id: number) {
    this.httpRequestService.deleteApiAddressById(id).subscribe(() => {
      this.getApiAddressList();
      this.toastr.success('Api Adresi Başarıyla Silindi');
      this.deleted.fire();


    });

  }

  resetFormDataApiAddress(branchId: number) {
    this.ClearApiAddress();
    this.databaseService.ApiAddressForm.controls['customerBranchId'].setValue(branchId);
    this.databaseService.ApiAddressForm.controls['port'].setValue('9001');
    
  }
  //clearlar değişti
  ClearApiAddress() {
    this.databaseService.ApiAddressForm.reset();
  }
  isApiAddressAuthenticated() {
    const token = localStorage.getItem("Token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  //customerBranch
  getCustomerBranchList() {
    this.databaseService.CustomerBranchList = this.httpRequestService.getCustomerBranchList();
    this.databaseService.CustomerBranchList?.subscribe((value: any) => {
      this.databaseService.CustomerBranchListTable = value;
      this.databaseService.CustomerBranchListTable.length;

      if (this.databaseService.filterCustomerCustomerBranch) {
        this.databaseService.CustomerBranchListTableFilter = value.filter(l => l.customerId === this.databaseService.filterCustomerCustomerBranch)
      }
    })
  }
  getCustomerBranchListTata() {
    this.databaseService.CustomerBranchList = this.httpRequestService.getCustomerBranchListTata();
    this.databaseService.CustomerBranchList?.subscribe((value: any) => {
      this.databaseService.CustomerBranchListTata = value;
      this.databaseService.CustomerBranchListTata.length;

      if (this.databaseService.filterCustomerCustomerBranch) {
        this.databaseService.CustomerBranchListTableFilter = value.filter(l => l.customerId === this.databaseService.filterCustomerCustomerBranch)
      }
    })
  }
  getCustomerBranchList2(id: number) {
    this.databaseService.filterCustomerCustomerBranch = id;
    this.databaseService.CustomerBranchList = this.httpRequestService.getCustomerBranchList();
    this.databaseService.CustomerBranchList!.subscribe(value =>
      this.databaseService.CustomerBranchListTableFilter = value.filter(l => l.customerId === id))

  }


  PostCustomerBranch(CustomerBranch: CustomerBranch) {
    const CustomerBranch_Master = this.databaseService.CustomerBranchForm.value;
    this.httpRequestService.postCustomerBranchData(CustomerBranch_Master).subscribe(
      () => {
        this.getCustomerBranchList();
        this.toastr.success('Müşteri Şubesi Başarıyla Eklendi');
        this.databaseService.CustomerBranchForm.reset();

      }
    );
  }

  CustomerBranchDetailsToEdit(id: string) {
    this.httpRequestService.getCustomerBranchDetailsById(id).subscribe((CustomerBranchResult: any) => {
      console.log('CustomerBranchResult', CustomerBranchResult)
      this.databaseService.Id = CustomerBranchResult.id;
      this.databaseService.CustomerBranchForm.controls['customerId'].setValue(CustomerBranchResult.customerId);
      this.databaseService.CustomerBranchForm.controls['name'].setValue(CustomerBranchResult.name);
      this.databaseService.CustomerBranchForm.controls['address'].setValue(CustomerBranchResult.address);
      this.databaseService.CustomerBranchForm.controls['shortName'].setValue(CustomerBranchResult.shortName);
      this.databaseService.CustomerBranchForm.controls['createDate'].setValue(CustomerBranchResult.createDate.split('T')[0]);
      this.databaseService.CustomerBranchForm.controls['branchCloseTime'].setValue(CustomerBranchResult.branchCloseTime);
    });
  }
  UpdateCustomerBranch(CustomerBranch: CustomerBranch) {
    CustomerBranch.id = this.databaseService.Id;
    const CustomerBranch_Master = this.databaseService.CustomerBranchForm.value;
    this.httpRequestService.updateCustomerBranch(CustomerBranch_Master).subscribe(() => {
      this.getCustomerBranchListTata();
      this.toastr.success('Müşteri Şubesi Başarıyla Güncellendi');
      this.databaseService.CustomerBranchForm.reset();

    });
  }
  DeleteCustomerBranch(id: number) {
    this.httpRequestService.deleteCustomerBranchById(id).subscribe(() => {
      this.getCustomerBranchListTata();
      this.toastr.success('Müşteri Şubesi Başarıyla Silindi');
      this.deleted.fire();


    });

  }
  isCustomerBranchAuthenticated() {
    const token = localStorage.getItem("Token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  resetFormDataCustomerBranch(customerId: number) {
    this.ClearCustomerBranch();
    this.databaseService.CustomerBranchForm.controls['customerId'].setValue(customerId);
    this.databaseService.CustomerBranchForm.controls['createDate'].setValue(this.databaseService.currentDate);
    this.databaseService.CustomerBranchForm.controls['branchCloseTime'].setValue(this.databaseService.timee);
    this.databaseService.CustomerBranchForm.controls['port'].setValue(this.databaseService.port);
    this.databaseService.CustomerBranchForm.controls['addresstype'].setValue('21');
  }
  resetFormDataCustomerBranch2() {
    this.databaseService.CustomerBranchForm.reset();
    this.databaseService.CustomerBranchForm.controls['createDate'].setValue(this.databaseService.currentDate);
  }
  ClearCustomerBranch() {
    this.databaseService.CustomerBranchForm.reset();
  }
  splitDate(date: any) {
    const split = date.branchCloseTime.split(':');
    const newDate = split[0] + ':' + split[1] + ':' + split[2];
    return newDate
  }
  //customer
  getCustomersList() {
    this.databaseService.CustomersList = this.httpRequestService.getCustomersList();
    this.databaseService.CustomersList?.subscribe((value: any) => {
      this.databaseService.CustomersListTable = value;
      this.databaseService.CustomersListTable.length;
    })
  }
  resetFormDataCustomer2(userId: number) {
    this.databaseService.CustomersForm.reset();
    this.databaseService.CustomersForm.controls['userId'].setValue(userId);
    this.databaseService.CustomersForm.controls['createDate'].setValue(this.databaseService.currentDate);

  }

  PostCustomers(Customers: Customers) {
    const Customers_Master = this.databaseService.CustomersForm.value;
    this.httpRequestService.postCustomersData(Customers_Master).subscribe(
      () => {
        this.getCustomersList();
        this.toastr.success('Müşteri Başarıyla Eklendi');
        this.databaseService.CustomersForm.reset();


      }
    );
  }
  CustomersDetailsToEdit(id: string) {
    this.httpRequestService.getCustomersDetailsById(id).subscribe((CustomersResult: any) => {
      this.databaseService.Id = CustomersResult.id;
      this.databaseService.CustomersForm.controls['name'].setValue(CustomersResult.name);
      this.databaseService.CustomersForm.controls['shortName'].setValue(CustomersResult.shortName);
      this.databaseService.CustomersForm.controls['alias'].setValue(CustomersResult.alias);
      this.databaseService.CustomersForm.controls['address'].setValue(CustomersResult.address);
      this.databaseService.CustomersForm.controls['taxNumber'].setValue(CustomersResult.taxNumber);
      this.databaseService.CustomersForm.controls['taxOffice'].setValue(CustomersResult.taxOffice);
      this.databaseService.CustomersForm.controls['createDate'].setValue(CustomersResult.createDate.split('T')[0]);
      this.databaseService.CustomersForm.controls['userId'].setValue(CustomersResult.userId);
    });
  }
  UpdateCustomers(Customers: Customers) {
    Customers.id = this.databaseService.Id;
    const Customers_Master = this.databaseService.CustomersForm.value;
    this.httpRequestService.updateCustomers(Customers_Master).subscribe(() => {
      this.getCustomersList();
      this.toastr.success('Müşteri Başarıyla Güncellendi');
      this.databaseService.CustomersForm.reset();

    });
  }
  DeleteCustomers(id: number) {
    this.httpRequestService.deleteCustomersById(id).subscribe(() => {
      this.getCustomersList();
      this.toastr.success('Müşteri Başarıyla Silindi');
      this.deleted.fire();


    });

  }
  ClearCustomer() {
    this.databaseService.CustomersForm.reset();
  }
  resetFormDataCustomer(userId: number) {
    this.ClearCustomer();
    this.databaseService.CustomersForm.controls['userId'].setValue(userId);
    this.databaseService.CustomersForm.controls['createDate'].setValue(this.databaseService.currentDate);

  }

  isCustomersAuthenticated() {
    const token = localStorage.getItem("Token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  //device
  getDeviceList() {
    this.databaseService.DeviceList = this.httpRequestService.getDeviceList();
    this.databaseService.DeviceList?.subscribe((value: any) => {
      this.databaseService.DeviceListTable = value;
      if (this.databaseService.filterCustomerBranchDevice) {
        this.databaseService.DeviceListTableFilter = value.filter(l => l.customerBranchId == this.databaseService.filterCustomerBranchDevice);
      }

    });
  }
  getDeviceListTata() {
    this.databaseService.DeviceList = this.httpRequestService.getDeviceListTata();
    this.databaseService.DeviceList?.subscribe((value: any) => {
      this.databaseService.DeviceListTata = value;
      if (this.databaseService.filterCustomerBranchDevice) {
        this.databaseService.DeviceListTableFilter = value.filter(l => l.customerBranchId == this.databaseService.filterCustomerBranchDevice);
      }

    });
  }
  getDeviceListHeader() {
    this.databaseService.DeviceList = this.httpRequestService.getDeviceList();
    this.databaseService.DeviceList?.subscribe((value: any) => {
      this.databaseService.DeviceListTableHeader = value;
      this.databaseService.DeviceListTableHeader.length;
    });
  }
  getDeviceList2(id: number) {
    this.databaseService.filterCustomerBranchDevice = id;
    this.databaseService.DeviceList = this.httpRequestService.getDeviceList();
    this.databaseService.DeviceList!.subscribe(value =>
      this.databaseService.DeviceListTableFilter = value.filter(l => l.customerBranchId === id))
  }
  getDeviceList3(id: string) {
    this.databaseService.DeviceList = this.httpRequestService.getDeviceList();
    this.databaseService.DeviceList!.subscribe(value =>
      this.databaseService.DeviceListTable = value.filter(l => l.id === id))

  }

  PostDevice(Device: Device) {
    const Device_Master = this.databaseService.DeviceForm.value;
    this.httpRequestService.postDeviceData(Device_Master).subscribe(
      () => {
        this.getDeviceList();
        this.toastr.success('Cihaz Başarıyla Eklendi');
        this.databaseService.DeviceForm.reset();

      }
    );
  }
  DeviceDetailsToEdit(id: string) {
    this.httpRequestService.getDeviceDetailsById(id).subscribe((DeviceResult: any) => {
      this.databaseService.Id = DeviceResult.id;
      this.databaseService.DeviceForm.controls['customerBranchId'].setValue(DeviceResult.customerBranchId);
      this.databaseService.DeviceForm.controls['name'].setValue(DeviceResult.name);
      this.databaseService.DeviceForm.controls['model'].setValue(DeviceResult.model);
      this.databaseService.DeviceForm.controls['platform'].setValue(DeviceResult.platform);
      this.databaseService.DeviceForm.controls['uuid'].setValue(DeviceResult.uuid);
      this.databaseService.DeviceForm.controls['version'].setValue(DeviceResult.version);
      this.databaseService.DeviceForm.controls['manufacturer'].setValue(DeviceResult.manufacturer);
      this.databaseService.DeviceForm.controls['createDate'].setValue(DeviceResult.createDate.split('T')[0]);
    });
  }
  UpdateDevice(Device: Device) {
    Device.id = this.databaseService.Id;
    const Device_Master = this.databaseService.DeviceForm.value;
    this.httpRequestService.updateDevice(Device_Master).subscribe(() => {
      this.getDeviceList();
      this.toastr.success('Cihaz Başarıyla Güncellendi');
      this.databaseService.DeviceForm.reset();

    });
  }

  DeleteDevice(id: number) {

    this.httpRequestService.deleteDeviceById(id).subscribe(() => {
      this.getDeviceListTata();
      this.toastr.success('Cihaz Başarıyla Silindi');
      this.deleted.fire();



    });

  }
  resetFormDataDevice2() {
    this.databaseService.DeviceForm.reset();
    this.databaseService.DeviceForm.controls['createDate'].setValue(this.databaseService.currentDate);
  }
  resetFormDataDevice(branchId: number) {
    this.ClearDevice();
    this.databaseService.DeviceForm.controls['customerBranchId'].setValue(branchId);
    this.databaseService.DeviceForm.controls['createDate'].setValue(this.databaseService.currentDate);
  }
  ClearDevice() {
    this.databaseService.DeviceForm.reset();
  }
  isDeviceAuthenticated() {
    const token = localStorage.getItem("Token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  //deviceLicence


  getDeviceLicenceList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceList();
    this.databaseService.DeviceLicenceList.pipe(
     map((data: any) => data.map(d => {
       return { ...d, fulfillment: this.databaseService.map2.get(d.licenceStatus) , fulfillment2: this.databaseService.map3.get(d.appType)}
     }
     )
     )
   ).subscribe((value: any) =>{
     this.databaseService.DeviceLicenceTable = value;
     this.databaseService.DeviceLicenceTable.length;
     if (this.databaseService.filterCustomerBranchDeviceLicence) {
      this.databaseService.DeviceLicenceTableFilter = value.filter(l => l.deviceId === this.databaseService.filterCustomerBranchDeviceLicence)
    }
  }  
 )
  }
  getDeviceLicenceListTata() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceListTata();
    this.databaseService.DeviceLicenceList.pipe(
     map((data: any) => data.map(d => {
       return { ...d, fulfillment: this.databaseService.map2.get(d.licenceStatus) , fulfillment2: this.databaseService.map3.get(d.appType)}
     }
     )
     )
   ).subscribe((value: any) =>{
     this.databaseService.DeviceLicenceListTata = value;
     this.databaseService.DeviceLicenceListTata.length;
     if (this.databaseService.filterCustomerBranchDeviceLicence) {
      this.databaseService.DeviceLicenceTableFilter = value.filter(l => l.deviceId === this.databaseService.filterCustomerBranchDeviceLicence)
    }
  }  
 )
  }


  getDeviceLicenceTodayList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceTodayList();
    this.databaseService.DeviceLicenceList?.subscribe((value: any) => {
      this.databaseService.DeviceLicenceTodayList = value;
      this.databaseService.DeviceLicenceTodayList.length;
    })
    
  }
  getDeviceLicenceBossTodayConfirmList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceBossTodayConfirmList();
    this.databaseService.DeviceLicenceList?.subscribe((value: any) => {
      this.databaseService.DeviceLicenceBossTodayConfirmList = value;
      this.databaseService.DeviceLicenceBossTodayConfirmList.length;
    })
  }
  getDeviceLicenceTerminalTodayConfirmList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceTerminalTodayConfirmList();
    this.databaseService.DeviceLicenceList?.subscribe((value: any) => {
      this.databaseService.DeviceLicenceTerminalTodayConfirmList = value;
      this.databaseService.DeviceLicenceTerminalTodayConfirmList.length;
    })
  }
  getDeviceLicenceBossWeekConfirmList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceBossWeekConfirmList();
    this.databaseService.DeviceLicenceList?.subscribe((value: any) => {
      this.databaseService.DeviceLicenceBossWeekConfirmList = value;
      this.databaseService.DeviceLicenceBossWeekConfirmList.length;
    })
  }
  getDeviceLicenceTerminalWeekConfirmList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceTerminalWeekConfirmList();
    this.databaseService.DeviceLicenceList?.subscribe((value: any) => {
      this.databaseService.DeviceLicenceTerminalWeekConfirmList = value;
      this.databaseService.DeviceLicenceTerminalWeekConfirmList.length;
    })
  }
  getDeviceLicenceBossMonthConfirmList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceBossMonthConfirmList();
    this.databaseService.DeviceLicenceList?.subscribe((value: any) => {
      this.databaseService.DeviceLicenceBossMonthConfirmList = value;
      this.databaseService.DeviceLicenceBossMonthConfirmList.length;
    })
  }
  getDeviceLicenceTerminalMonthConfirmList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceTerminalMonthConfirmList();
    this.databaseService.DeviceLicenceList?.subscribe((value: any) => {
      this.databaseService.DeviceLicenceTerminalMonthConfirmList = value;
      this.databaseService.DeviceLicenceTerminalMonthConfirmList.length;
    })
  }
  getDeviceLicenceEndTimeList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceEndTimeList();
    this.databaseService.DeviceLicenceList?.subscribe((value: any) => {
      this.databaseService.DeviceLicenceEndTimeList = value;
      this.databaseService.DeviceLicenceEndTimeList.length;
    })
  }
  ActiveDeviceLicence2(id: number) {
    this.httpRequestService.ActiveDeviceLicenceById(id).subscribe(() => {
      // this.databaseService.DeviceLicenceForm.controls['createDate'].setValue(this.databaseService.currentDate);
      this.getDeviceLicenceTodayList();
      this.toastr.success('Cihaz Lisans Durumu Başarıyla Onaylandı');
      this.deleted.fire();
    });
  }
  UpdateAddTimeDeviceLicence(DeviceLicence: DeviceLicence) {
    
    const DeviceLicence_Master = this.databaseService.DeviceLicenceForm.value;
    this.httpRequestService.updateAddTimeDeviceLicence(DeviceLicence_Master).subscribe(() => {
      this.getDeviceLicenceEndTimeList();
      this.toastr.success('Cihaz Lisansı Başarıyla Uzatıldı.');
      this.databaseService.DeviceLicenceForm.reset();
    });
  }
  resetFormDataDeviceLicenceAdd(id:string) {
    this.databaseService.DeviceLicenceForm.reset();
    this.httpRequestService.getDeviceLicenceDetailsById(id).subscribe((DeviceLicenceResult: any) => {
      this.databaseService.Id = DeviceLicenceResult.id;
    this.databaseService.DeviceLicenceForm.controls['expireDate'].setValue(this.databaseService.expireDate);
    this.databaseService.DeviceLicenceForm.controls['id'].setValue(DeviceLicenceResult.id);
  });
  }



  PostDeviceLicence(DeviceLicence: DeviceLicence) {
    const DeviceLicence_Master = this.databaseService.DeviceLicenceForm.value;
    this.httpRequestService.postDeviceLicenceData(DeviceLicence_Master).subscribe(
      () => {
        this.getDeviceLicenceList();
        this.getDeviceLicenceActiveList();
        this.toastr.success('Cihaz Lisansı Başarıyla Eklendi');
        this.databaseService.DeviceLicenceForm.reset();
      }
    );
  }
  DeviceLicenceDetailsToEdit(id: string) {
    this.httpRequestService.getDeviceLicenceDetailsById(id).subscribe((DeviceLicenceResult: any) => {
      this.databaseService.Id = DeviceLicenceResult.id;
      this.databaseService.DeviceLicenceForm.controls['deviceId'].setValue(DeviceLicenceResult.deviceId);
      this.databaseService.DeviceLicenceForm.controls['licenceStatus'].setValue(DeviceLicenceResult.licenceStatus);
      this.databaseService.DeviceLicenceForm.controls['appType'].setValue(DeviceLicenceResult.appType);
      this.databaseService.DeviceLicenceForm.controls['createDate'].setValue(DeviceLicenceResult.createDate.split('T')[0]);
      this.databaseService.DeviceLicenceForm.controls['confirmedDate'].setValue(DeviceLicenceResult.confirmedDate.split('T')[0]);
      this.databaseService.DeviceLicenceForm.controls['modifiedDate'].setValue(DeviceLicenceResult.modifiedDate.split('T')[0]);
      this.databaseService.DeviceLicenceForm.controls['modifiedUserId'].setValue(DeviceLicenceResult.modifiedUserId);
      this.databaseService.DeviceLicenceForm.controls['confirmedUserId'].setValue(DeviceLicenceResult.confirmedUserId);
      this.databaseService.DeviceLicenceForm.controls['demanderUserId'].setValue(DeviceLicenceResult.demanderUserId);
      this.databaseService.DeviceLicenceForm.controls['expireDate'].setValue(DeviceLicenceResult.expireDate.split('T')[0]);
    });
  }
  UpdateDeviceLicence(DeviceLicence: DeviceLicence) {
    DeviceLicence.id = this.databaseService.Id;
    const DeviceLicence_Master = this.databaseService.DeviceLicenceForm.value;
    this.httpRequestService.updateDeviceLicence(DeviceLicence_Master).subscribe(() => {
      this.getDeviceLicenceList();
      this.toastr.success('Cihaz Lisansı Başarıyla Güncellendi');
      this.databaseService.DeviceLicenceForm.reset();

    });
  }

  ActiveDeviceLicence(id: number) {
    this.httpRequestService.ActiveDeviceLicenceById(id).subscribe(() => {
      // this.databaseService.DeviceLicenceForm.controls['createDate'].setValue(this.databaseService.currentDate);
      this.getDeviceLicenceActiveList();
      this.toastr.success('Cihaz Lisans Durumu Başarıyla Onaylandı');
      this.deleted.fire();
    });
  }
  ActiveDeviceLicence3(id: number) {
    this.httpRequestService.ActiveDeviceLicenceById(id).subscribe(() => {
      // this.databaseService.DeviceLicenceForm.controls['createDate'].setValue(this.databaseService.currentDate);
      this.getDeviceLicenceList()
      this.toastr.success('Cihaz Lisans Durumu Başarıyla Onaylandı');
      this.deleted.fire();
    });
  }
  getDeviceLicenceList2(id: number) {
    this.databaseService.filterCustomerBranchDeviceLicence = id;
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceList();
    this.databaseService.DeviceLicenceList!.subscribe(value =>
      this.databaseService.DeviceLicenceTableFilter = value.filter(l => l.deviceId === id))
  }
  UnActiveDeviceLicence(id: number) {
    this.httpRequestService.UnActiveDeviceLicenceById(id).subscribe((value:any) => {
      this.getDeviceLicenceList()
      this.toastr.success('Cihaz Lisans Durumu Başarıyla Onaylandı');
      this.deleted.fire();
    });
  }

  getDeviceLicenceActiveList() {
    this.databaseService.DeviceLicenceList = this.httpRequestService.getDeviceLicenceNotActiveList();
    this.databaseService.DeviceLicenceList.pipe(
      map((data: any) => data.map(d => {
        return { ...d, fulfillment: this.databaseService.map2.get(d.licenceStatus) , fulfillment2: this.databaseService.map3.get(d.appType)}
      }
      )
      )
    ).subscribe((value: any) =>{
      this.databaseService.DeviceLicenceActiveList = value;
      this.databaseService.DeviceLicenceActiveList.length;
    })
  }

  DeleteDeviceLicence(id: number) {
    this.httpRequestService.deleteDeviceLicenceById(id).subscribe(() => {
      this.getDeviceLicenceListTata();
      this.toastr.success('Cihaz Lisansı Başarıyla Silindi');
      this.deleted.fire();


    });

  }
  resetFormDataDeviceLicence2() {
    this.databaseService.DeviceLicenceForm.reset();
    this.databaseService.DeviceLicenceForm.controls['createDate'].setValue(this.databaseService.currentDate);
    this.databaseService.DeviceLicenceForm.controls['confirmedDate'].setValue(this.databaseService.confirmedDate);
    this.databaseService.DeviceLicenceForm.controls['modifiedDate'].setValue(this.databaseService.modifiedDate);
    this.databaseService.DeviceLicenceForm.controls['expireDate'].setValue(this.databaseService.finishDate);
    this.databaseService.DeviceLicenceForm.controls['modifiedUserId'].setValue("0");
    this.databaseService.DeviceLicenceForm.controls['confirmedUserId'].setValue("0");
    this.databaseService.DeviceLicenceForm.controls['demanderUserId'].setValue("0");
  }
  resetFormDataDeviceLicence(deviceID: number) {
    this.ClearDeviceLicence();
    this.databaseService.DeviceLicenceForm.controls['deviceId'].setValue(deviceID);
    this.databaseService.DeviceLicenceForm.controls['createDate'].setValue(this.databaseService.currentDate);
    this.databaseService.DeviceLicenceForm.controls['confirmedDate'].setValue(this.databaseService.confirmedDate);
    this.databaseService.DeviceLicenceForm.controls['modifiedDate'].setValue(this.databaseService.modifiedDate);
    this.databaseService.DeviceLicenceForm.controls['expireDate'].setValue(this.databaseService.finishDate);
    this.databaseService.DeviceLicenceForm.controls['modifiedUserId'].setValue("0");
    this.databaseService.DeviceLicenceForm.controls['confirmedUserId'].setValue("0");
    this.databaseService.DeviceLicenceForm.controls['demanderUserId'].setValue("0");
  }

  ClearDeviceLicence() {
    this.databaseService.DeviceLicenceForm.reset();
  }
  isDeviceLicenceAuthenticated() {
    const token = localStorage.getItem("Token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  //user
  getUsersList() {
    this.databaseService.UsersList = this.httpRequestService.getUsersList();
    this.databaseService.UsersList?.subscribe((value: any) => {
      this.databaseService.UsersListTable = value;
      this.databaseService.UsersListTable.length;
    })
  }
  PostUsers() {
    const user_Master = this.databaseService.usersForm.value;
    this.httpRequestService.postUserData(user_Master).subscribe(
      (data:any) => {
        this.getUsersList();
        this.databaseService.usersForm.reset();
        if(data.hata != false ){
          this.toastr.success('Kullanıcı Başarıyla Eklendi');        }
       else if(data.hata == false ) {
          this.toastr.warning('Kullanıcı Zaten Mevcut.');
        }
      }
    );
  }
  UsersDetailsToEdit(id: string) {
    this.httpRequestService.getUserDetailsById(id).subscribe((userResult: any) => {
      this.databaseService.Id = userResult.id;
      this.databaseService.usersForm.controls['name'].setValue(userResult.name);
      this.databaseService.usersForm.controls['lastName'].setValue(userResult.lastName);
      this.databaseService.usersForm.controls['userName'].setValue(userResult.userName);
      this.databaseService.usersForm.controls['email'].setValue(userResult.email);
      this.databaseService.usersForm.controls['password'].setValue(userResult.password);
      this.databaseService.usersForm.controls['isGeneralAdmin'].setValue(userResult.isGeneralAdmin);
      this.databaseService.usersForm.controls['isCustomerAdmin'].setValue(userResult.isCustomerAdmin);
      this.databaseService.usersForm.controls['createDate'].setValue(userResult.createDate.split('T')[0]);
      this.databaseService.usersForm.controls['expireDate'].setValue(userResult.expireDate.split('T')[0]);
    });
  }
  UpdateUser(users: Users) {
    users.id = this.databaseService.Id;
    const user_Master = this.databaseService.usersForm.value;
    this.httpRequestService.updateUser(user_Master).subscribe(() => {
      this.getUsersList();
      this.toastr.success('Kullanıcı Başarıyla Güncellendi');
      this.databaseService.usersForm.reset();

    });
  }

  DeleteUser(id: number) {
    this.httpRequestService.deleteUserById(id).subscribe(() => {
      this.getUsersList();
      this.toastr.success('Kullanıcı Başarıyla Silindi');
      this.deleted.fire();
    });
  }
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  ClearUser() {
    this.databaseService.usersForm.reset();
  }
  resetFormDataUser() {
    this.ClearUser();
    this.databaseService.usersForm.controls['createDate'].setValue(this.databaseService.currentDate);
    this.databaseService.usersForm.controls['expireDate'].setValue(this.databaseService.finishDate);
    this.databaseService.usersForm.controls['isGeneralAdmin'].setValue(false);
    this.databaseService.usersForm.controls['isCustomerAdmin'].setValue(false);
    this.databaseService.usersForm.controls['branchCloseTime'].setValue(this.databaseService.timee);
    this.databaseService.usersForm.controls['port'].setValue(this.databaseService.port);
  }
  //SystemUser
  getSystemUsersList() {
    this.databaseService.SystemUsersList = this.httpRequestService.getSystemUsersList();
     this.databaseService.SystemUsersList.pipe(
      map((data: any) => data.map(d => {
        return { ...d, fulfillment: this.databaseService.map4.get(d.roleId) }
      }
      )
      )
    ).subscribe((value: any) =>{
      this.databaseService.SystemUsersListTable = value;
   }  
  )
 
  }
  PostSystemUsers() {
    const user_Master = this.databaseService.SystemUsersForm.value;
      this.httpRequestService.postSystemUsersData(user_Master).subscribe((data : any) => {
        if(data.hata != false ){
          this.getSystemUsersList();
          this.databaseService.SystemUsersForm.reset();
          this.toastr.success('Sistem Kullanıcısı Başarıyla Eklendi');
        }
       else if(data.hata == false ) {
          this.toastr.warning('Sistem Kullanıcısı Zaten Mevcut.');
        }
      }
      ); 
 
  }

  UpdateSystemUser(SystemUser: SystemUser) {
    SystemUser.id = this.databaseService.Id;
    const sysuser_Master = this.databaseService.SystemUsersForm.value;
    this.httpRequestService.updateSystemUsers(sysuser_Master).subscribe(() => {
      this.getSystemUsersList();
      this.toastr.success('Sistem Kullanıcısı Başarıyla Güncellendi');
      this.databaseService.usersForm.reset();

    });
  }

  SystemUsersDetailsToEdit(id: string) {
    this.httpRequestService.getSystemUserDetailsById(id).subscribe((userResult: any) => {
      this.databaseService.Id = userResult.id;
      this.databaseService.SystemUsersForm.controls['roleId'].setValue(userResult.roleId);
      this.databaseService.SystemUsersForm.controls['userName'].setValue(userResult.userName);
      this.databaseService.SystemUsersForm.controls['password'].setValue(userResult.password);
      this.databaseService.SystemUsersForm.controls['createDate'].setValue(userResult.createDate.split('T')[0]);
    });
  }
  DeleteSystemUser(id: number) {
    this.httpRequestService.deleteSystemUserById(id).subscribe(() => {
      this.getSystemUsersList();
      this.toastr.success('Kullanıcı Başarıyla Silindi');
      this.deleted.fire();
    });
  }
  resetFormDataSystemUser() {
    this.databaseService.SystemUsersForm.reset();
    this.databaseService.SystemUsersForm.controls['createDate'].setValue(this.databaseService.currentDate);

  }
  // MODAL OPEN
  open(content: any) {
    this.modalService.open(content, { backdrop: true, size: 'xl', animation: true, centered: true, scrollable: true }).result.then((result) => {

      this.databaseService.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.databaseService.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  openmd(content: any) {
    this.modalService.open(content, { backdrop: true, size: 'md', animation: true, centered: true, scrollable: true }).result.then((result) => {

      this.databaseService.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.databaseService.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // SEARCH 
  applyFilterGlobal($event: any, stringVal: any, dt: any) {
    dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);

  }


}




