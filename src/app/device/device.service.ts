import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device } from '../Models/device';
import configurl from '../../assets/config/config.json'
import { CustomerBranch } from '../Models/customer-branch';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  url = configurl.apiServer.url + '/api/Device/';
  url2 = configurl.apiServer.url + '/api/CustomerBranch/';
  constructor(private http: HttpClient) { }
  getDeviceList(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url + 'DeviceList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postDeviceData(DeviceData: Device): Observable<Device> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Device>(this.url + 'CreateDevice', DeviceData, httpHeaders);
  }
  updateDevice(Device: Device): Observable<Device> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Device>(this.url + 'UpdateDevice?id=' + Device.id, Device, httpHeaders);
  }
  deleteDeviceById(id: number): Observable<number> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<number>(this.url + 'DeleteDevice?id=' + id, httpHeaders);
  }
  getDeviceDetailsById(id: string): Observable<Device> {
    return this.http.get<Device>(this.url + 'DeviceDetail?id=' + id);
  }
    getCustomerBranchList(): Observable<CustomerBranch[]> {
    return this.http.get<CustomerBranch[]>(this.url2 + 'CustomerBranchList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
}
