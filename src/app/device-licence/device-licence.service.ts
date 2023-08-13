import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceLicence } from '../Models/device-licence';
import configurl from '../../assets/config/config.json'
import { Device } from '../Models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceLicenceService {

  url = configurl.apiServer.url + '/api/DeviceLicence/';
  url2 = configurl.apiServer.url + '/api/Device/';
  constructor(private http: HttpClient) { }
  getDeviceLicenceList(): Observable<DeviceLicence[]> {
    return this.http.get<DeviceLicence[]>(this.url + 'DeviceLicenceList' ,{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  getDeviceList(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url2 + 'DeviceList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postDeviceLicenceData(DeviceLicenceData: DeviceLicence): Observable<DeviceLicence> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<DeviceLicence>(this.url + 'CreateDeviceLicence', DeviceLicenceData, httpHeaders);
  }
  updateDeviceLicence(DeviceLicence: DeviceLicence): Observable<DeviceLicence> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<DeviceLicence>(this.url + 'UpdateDeviceLicence?id=' + DeviceLicence.id, DeviceLicence, httpHeaders);
  }
  deleteDeviceLicenceById(id: number): Observable<number> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };

    return this.http.post<number>(this.url + 'DeleteDeviceLicence?id=' + id, httpHeaders);
  }
  getDeviceLicenceDetailsById(id: string): Observable<DeviceLicence> {
    return this.http.get<DeviceLicence>(this.url + 'DeviceLicenceDetail?id=' + id);
  }
}
