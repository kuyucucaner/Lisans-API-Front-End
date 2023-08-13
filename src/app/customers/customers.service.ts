import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../Models/customers';
import configurl from '../../assets/config/config.json'
import { Device } from '../Models/device';
import { DeviceLicence } from '../Models/device-licence';
import { CustomerBranch } from '../Models/customer-branch';
import { Users } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  url = configurl.apiServer.url + '/api/Customer/';
  url2=configurl.apiServer.url + '/api/Device/';
  url3=configurl.apiServer.url + '/api/DeviceLicence/';
  url4=configurl.apiServer.url + '/api/CustomerBranch/';
  url5= configurl.apiServer.url + '/api/User/';
  constructor(private http: HttpClient) { }
  getCustomersList(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.url + 'CustomersList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  // device
  getDeviceList(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url2 + 'DeviceList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postDeviceData(DeviceData: Device): Observable<Device> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Device>(this.url2 + 'CreateDevice', DeviceData, httpHeaders);
  }
  //devicelicence
  getDeviceLicenceList(): Observable<DeviceLicence[]> {
    return this.http.get<DeviceLicence[]>(this.url3 + 'DeviceLicenceList' ,{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postDeviceLicenceData(DeviceLicenceData: DeviceLicence): Observable<DeviceLicence> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<DeviceLicence>(this.url3 + 'CreateDeviceLicence', DeviceLicenceData, httpHeaders);
  }
  //customerbranch
  
  getCustomerBranchList(): Observable<CustomerBranch[]> {
    return this.http.get<CustomerBranch[]>(this.url4 + 'CustomerBranchList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postCustomerBranchData(CustomerBranchData: CustomerBranch): Observable<CustomerBranch> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<CustomerBranch>(this.url4 + 'CreateCustomerBranch', CustomerBranchData, httpHeaders);
  }
  
  ////////users
  getUsersList(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url5 + 'UsersList' ,{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postUserData(UsersData: Users): Observable<Users> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Users>(this.url5 + 'CreateUsers', UsersData, httpHeaders);
  }
  postCustomersData(CustomersData: Customers): Observable<Customers> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Customers>(this.url + 'CreateCustomers', CustomersData, httpHeaders);
  }
  updateCustomers(Customers: Customers): Observable<Customers> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Customers>(this.url + 'UpdateCustomers?id=' + Customers.id, Customers, httpHeaders);
  }
  deleteCustomersById(id: number): Observable<number> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<number>(this.url + 'DeleteCustomers?id=' + id, httpHeaders);
  }
  getCustomersDetailsById(id: string): Observable<Customers> {
    return this.http.get<Customers>(this.url + 'CustomersDetail?id=' + id);
  }
}
