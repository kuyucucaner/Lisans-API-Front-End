import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAddress } from '../Models/apiaddress';
import configurl from '../../assets/config/config.json'
import { CustomerBranch } from '../Models/customer-branch';

@Injectable({
  providedIn: 'root'
})
export class ApiAddressService {

  url = configurl.apiServer.url + '/api/ApiAddress/';
  url2 = configurl.apiServer.url + '/api/CustomerBranch/';
  constructor(private http: HttpClient) { }
  getApiAddressList(): Observable<ApiAddress[]> {
    return this.http.get<ApiAddress[]>(this.url + 'ApiAddressList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  getCustomerBranchList(): Observable<CustomerBranch[]> {
    return this.http.get<CustomerBranch[]>(this.url2 + 'CustomerBranchList',{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postApiAddressData(ApiAddressData: ApiAddress): Observable<ApiAddress> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<ApiAddress>(this.url + 'CreateApiAddress', ApiAddressData, httpHeaders);
  }
  updateApiAddress(ApiAddress: ApiAddress): Observable<ApiAddress> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<ApiAddress>(this.url + 'UpdateApiAddress?id=' + ApiAddress.id, ApiAddress, httpHeaders);
  }
  deleteApiAddressById(id: number): Observable<number> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<number>(this.url + 'DeleteApiAddress?id=' + id,  httpHeaders);
  }
  getApiAddressDetailsById(id: string): Observable<ApiAddress> {
    return this.http.get<ApiAddress>(this.url + 'ApiAddressDetail?id=' + id);
  }
}
