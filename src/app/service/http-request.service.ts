import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiAddress } from "../Models/apiaddress";
import { CustomerBranch } from "../Models/customer-branch";
import { Injectable } from "@angular/core";
import { Customers } from "../Models/customers";
import { Device } from "../Models/device";
import { DeviceLicence } from "../Models/device-licence";
import { Users } from "../Models/users";
import { Router } from "@angular/router";
import  {ApiRootService}  from "./api-root.service";
import { FormGroup } from "@angular/forms";
import { DatabaseService } from "./database.service";
import { ToastrService } from 'ngx-toastr';
import { SystemUser } from "../Models/systemuser";
import { SystemUserRole } from "../Models/role";

@Injectable({
    providedIn: 'root'
  })
  
export class HttpRequestService{

    constructor(
      private toastr : ToastrService,
      private router : Router,
        private http: HttpClient,
        private apiRootService: ApiRootService,
        public DatabaseService : DatabaseService,
     
      ) {}
     // LOGİN 
     public login = (form: FormGroup) => {

      const credentials = JSON.stringify(form.value);
      this.http.post(this.apiRootService.urlLogin + "login", credentials,
        { headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer : ${localStorage.getItem("Token")} `
        }) })
  .subscribe((response) => {
        const Token = (<any>response).token;    
        const RefreshToken = (<any>response).refreshToken;
          const User = (<any>response).user.roleId;
        localStorage.setItem("Token", Token);
        localStorage.setItem("RefreshToken", RefreshToken);
        this.getRoleType(User).subscribe((data)=>{
          this.DatabaseService.rolelogin=data;
          localStorage.setItem("RoleType",String(this.DatabaseService.rolelogin.roleType));
        })
     //   localStorage.setItem("RoleId",User.roleId)
        this.DatabaseService.invalidLogin = false;
        this.router.navigate(["/home"]).then(() => {
          window.location.reload();
        });
        this.toastr.success("Giriş Başarılı.");
      }, err => {
        console.error(err)
        this.DatabaseService.invalidLogin = true;
      });
    
    } 
    getRoleType(id:number):Observable<SystemUserRole>{
      return this.http.get<SystemUserRole>(this.apiRootService.urlLogin + 'GetRoleType?id=' + id) ;  
    }
      //Api
      getApiAddressList(): Observable<ApiAddress[]> {
        return this.http.get<ApiAddress[]>(this.apiRootService.urlApiAddress + 'ApiAddressList',{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      postApiAddressData(ApiAddressData: ApiAddress): Observable<ApiAddress> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<ApiAddress>(this.apiRootService.urlApiAddress + 'CreateApiAddress', ApiAddressData, httpHeaders);
      }
      updateApiAddress(ApiAddress: ApiAddress): Observable<ApiAddress> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<ApiAddress>(this.apiRootService.urlApiAddress + 'UpdateApiAddress?id=' + ApiAddress.id, ApiAddress, httpHeaders);
      }
      deleteApiAddressById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.apiRootService.urlApiAddress + 'DeleteApiAddress?id=' + id,  httpHeaders);
      }
      getApiAddressDetailsById(id: string): Observable<ApiAddress> {
        return this.http.get<ApiAddress>(this.apiRootService.urlApiAddress + 'ApiAddressDetail?id=' + id);
      }
      // customerBranch
      getCustomerBranchList(): Observable<CustomerBranch[]> {
        return this.http.get<CustomerBranch[]>(this.apiRootService.urlCustomerBranch + 'CustomerBranchList',{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getCustomerBranchListTata(): Observable<CustomerBranch[]> {
        return this.http.get<CustomerBranch[]>(this.apiRootService.urlCustomerBranch + 'CustomerBranchListTata',{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      
      postCustomerBranchData(CustomerBranchData: CustomerBranch ): Observable<CustomerBranch> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<CustomerBranch>(this.apiRootService.urlCustomerBranch + 'CreateCustomerBranch', CustomerBranchData,  httpHeaders);
      }
      updateCustomerBranch(CustomerBranch: CustomerBranch): Observable<CustomerBranch> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<CustomerBranch>(this.apiRootService.urlCustomerBranch + 'UpdateCustomerBranch?id=' + CustomerBranch.id, CustomerBranch, httpHeaders);
      }
      deleteCustomerBranchById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.apiRootService.urlCustomerBranch + 'DeleteCustomerBranch?id=' + id, httpHeaders);
      }
      getCustomerBranchDetailsById(id: string): Observable<CustomerBranch> {
        return this.http.get<CustomerBranch>(this.apiRootService.urlCustomerBranch + 'CustomerBranchDetail?id=' + id);
      }
      //customer
      getCustomersList(): Observable<Customers[]> {
        return this.http.get<Customers[]>(this.apiRootService.urlCustomer + 'CustomersList',{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      postCustomersData(CustomersData: Customers): Observable<Customers> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<Customers>(this.apiRootService.urlCustomer + 'CreateCustomers', CustomersData, httpHeaders);
      }
      updateCustomers(Customers: Customers): Observable<Customers> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<Customers>(this.apiRootService.urlCustomer + 'UpdateCustomers?id=' + Customers.id, Customers, httpHeaders);
      }
      deleteCustomersById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.apiRootService.urlCustomer + 'DeleteCustomers?id=' + id, httpHeaders);
      }
      getCustomersDetailsById(id: string): Observable<Customers> {
        return this.http.get<Customers>(this.apiRootService.urlCustomer + 'CustomersDetail?id=' + id);
      }
      //device
      getDeviceList(): Observable<Device[]> {
        return this.http.get<Device[]>(this.apiRootService.urlDevice + 'DeviceList',{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      } 
      getDeviceListTata(): Observable<Device[]> {
        return this.http.get<Device[]>(this.apiRootService.urlDevice + 'DeviceListTata',{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      } 
       postDeviceData(DeviceData: Device): Observable<Device> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<Device>(this.apiRootService.urlDevice + 'CreateDevice', DeviceData, httpHeaders);
      }
      updateDevice(Device: Device): Observable<Device> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<Device>(this.apiRootService.urlDevice + 'UpdateDevice?id=' + Device.id, Device, httpHeaders);
      }
      deleteDeviceById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.apiRootService.urlDevice + 'DeleteDevice?id=' + id, httpHeaders);
      }
      getDeviceDetailsById(id: string): Observable<Device> {
        return this.http.get<Device>(this.apiRootService.urlDevice + 'DeviceDetail?id=' + id);
      }
      //deviceLicence
      getDeviceLicenceList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }

      getDeviceLicenceListTata(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceListTata' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceTodayList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceTodayList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceBossTodayConfirmList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceBossTodayConfirmList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceTerminalTodayConfirmList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceTerminalTodayConfirmList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceBossWeekConfirmList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceBossWeekConfirmList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceTerminalWeekConfirmList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceTerminalsWeekConfirmList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceBossMonthConfirmList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceBossMonthConfirmList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceTerminalMonthConfirmList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceTerminalsMonthConfirmList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceEndTimeList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceEndTime' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      getDeviceLicenceNotActiveList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceActive' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      postDeviceLicenceData(DeviceLicenceData: DeviceLicence): Observable<DeviceLicence> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<DeviceLicence>(this.apiRootService.urlDeviceLicence + 'CreateDeviceLicence', DeviceLicenceData, httpHeaders);
      }
      updateAddTimeDeviceLicence(DeviceLicence: DeviceLicence): Observable<DeviceLicence> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<DeviceLicence>(this.apiRootService.urlDeviceLicence + 'AddTimeDeviceLicence?id=' + DeviceLicence.id, DeviceLicence, httpHeaders);
      }
      updateDeviceLicence(DeviceLicence: DeviceLicence): Observable<DeviceLicence> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<DeviceLicence>(this.apiRootService.urlDeviceLicence + 'UpdateDeviceLicence?id=' + DeviceLicence.id, DeviceLicence, httpHeaders);
      }
      deleteDeviceLicenceById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    
        return this.http.post<number>(this.apiRootService.urlDeviceLicence + 'DeleteDeviceLicence?id=' + id, httpHeaders);
      }
      getDeviceLicenceDetailsById(id: string): Observable<DeviceLicence> {
        return this.http.get<DeviceLicence>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceDetail?id=' + id);
      }
      ActiveDeviceLicenceById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceDoActive?id=' + id, httpHeaders);
      }
      UnActiveDeviceLicenceById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceNotActive?id=' + id, httpHeaders);
      }
      getDeviceLicenceActiveList(): Observable<DeviceLicence[]> {
        return this.http.get<DeviceLicence[]>(this.apiRootService.urlDeviceLicence + 'DeviceLicenceActive' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      //user
      getUsersList(): Observable<Users[]> {
        return this.http.get<Users[]>(this.apiRootService.urlUser + 'UsersList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      postUserData(UsersData: Users): Observable<Users> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<Users>(this.apiRootService.urlUser + 'CreateUsers', UsersData, httpHeaders);
      }
      updateUser(Users: Users): Observable<Users> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<Users>(this.apiRootService.urlUser + 'UpdateUsers?id=' + Users.id, Users, httpHeaders);
      }
      deleteUserById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.apiRootService.urlUser + 'DeleteUser?id=' + id, httpHeaders);
      }
      getUserDetailsById(id: string): Observable<Users> {
        return this.http.get<Users>(this.apiRootService.urlUser + 'UserDetail?id=' + id);
      }
      //SystemUser
      getSystemUsersList(): Observable<SystemUser[]> {
        return this.http.get<SystemUser[]>(this.apiRootService.urlSystemUser + 'SystemUserList' ,{ headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer `
        }) });
      }
      postSystemUsersData(SystemUsersData: SystemUser): Observable<SystemUser> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<SystemUser>(this.apiRootService.urlSystemUser + 'CreateSystemUsers', SystemUsersData, httpHeaders);
      }
      updateSystemUsers(SystemUsersData: SystemUser): Observable<SystemUser> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<SystemUser>(this.apiRootService.urlSystemUser + 'UpdateSystemUsers?id=' + SystemUsersData.id, SystemUsersData, httpHeaders);
      }
      getSystemUserDetailsById(id: string): Observable<SystemUser> {
        return this.http.get<SystemUser>(this.apiRootService.urlSystemUser + 'SystemUserDetail?id=' + id);
      }
      deleteSystemUserById(id: number): Observable<number> {
        const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
        return this.http.post<number>(this.apiRootService.urlSystemUser + 'DeleteSystemUser?id=' + id, httpHeaders);
      }
}