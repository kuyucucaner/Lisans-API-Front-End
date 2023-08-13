import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerBranch } from '../Models/customer-branch';
import configurl from '../../assets/config/config.json'
import { ApiAddress } from '../Models/apiaddress';
import { Device } from '../Models/device';
import { DeviceLicence } from '../Models/device-licence';
import { Customers } from '../Models/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerBranchService {

  url = configurl.apiServer.url + '/api/CustomerBranch/';
  url2=configurl.apiServer.url + '/api/ApiAddress/';
  url3=configurl.apiServer.url + '/api/Device/';
  url4=configurl.apiServer.url + '/api/DeviceLicence/';
  url5 = configurl.apiServer.url + '/api/Customer/';
  constructor(private http: HttpClient) { }
  getCustomerBranchList(): Observable<CustomerBranch[]> {
    return this.http.get<CustomerBranch[]>(this.url + 'CustomerBranchList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postCustomerBranchData(CustomerBranchData: CustomerBranch): Observable<CustomerBranch> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<CustomerBranch>(this.url + 'CreateCustomerBranch', CustomerBranchData, httpHeaders);
  }
  //api
  getApiAddressList(): Observable<ApiAddress[]> {
    return this.http.get<ApiAddress[]>(this.url2 + 'ApiAddressList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postApiAddressData(ApiAddressData: ApiAddress): Observable<ApiAddress> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<ApiAddress>(this.url2 + 'CreateApiAddress', ApiAddressData, httpHeaders);
  }
  //
  //device
  getDeviceList(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url3 + 'DeviceList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  deleteDeviceById(id: number): Observable<number> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<number>(this.url3 + 'DeleteDevice?id=' + id, httpHeaders);
  }
  postDeviceData(DeviceData: Device): Observable<Device> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Device>(this.url3 + 'CreateDevice', DeviceData, httpHeaders);
  }
  //
  //device licence
  getDeviceLicenceList(): Observable<DeviceLicence[]> {
    return this.http.get<DeviceLicence[]>(this.url4 + 'DeviceLicenceList' ,{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }//
  getCustomersList(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.url5 + 'CustomersList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postDeviceLicenceData(DeviceLicenceData: DeviceLicence): Observable<DeviceLicence> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<DeviceLicence>(this.url4 + 'CreateDeviceLicence', DeviceLicenceData, httpHeaders);
  }
  updateCustomerBranch(CustomerBranch: CustomerBranch): Observable<CustomerBranch> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<CustomerBranch>(this.url + 'UpdateCustomerBranch?id=' + CustomerBranch.id, CustomerBranch, httpHeaders);
  }
  deleteCustomerBranchById(id: number): Observable<number> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<number>(this.url + 'DeleteCustomerBranch?id=' + id, httpHeaders);
  }
  getCustomerBranchDetailsById(id: string): Observable<CustomerBranch> {
    return this.http.get<CustomerBranch>(this.url + 'CustomerBranchDetail?id=' + id);
  }
}
