import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceLicence } from '../Models/device-licence';
import configurl from '../../assets/config/config.json'
import { Device } from '../Models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceLicenceStatusService {

  url = configurl.apiServer.url + '/api/DeviceLicence/';
  url2 = configurl.apiServer.url + '/api/Device/';
  constructor(private http: HttpClient) { }
  getDeviceLicenceList(): Observable<DeviceLicence[]> {
    return this.http.get<DeviceLicence[]>(this.url + 'DeviceLicenceActive' ,{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
   ActiveDeviceLicenceById(id: number): Observable<number> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<number>(this.url + 'DeviceLicenceDoActive?id=' + id, httpHeaders);
  }
  getDeviceList(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url2 + 'DeviceList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
}
