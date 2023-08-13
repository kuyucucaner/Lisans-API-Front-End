import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import configurl from '../../../assets/config/config.json'
import { Device } from 'src/app/Models/device';
import { DeviceLicence } from 'src/app/Models/device-licence';


@Injectable({
  providedIn: 'root'
})
export class DeviceLicenceService2 {

    url = configurl.apiServer.url + '/api/DeviceLicence/';
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
}
