import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../Models/users';
import configurl from '../../assets/config/config.json'
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = configurl.apiServer.url + '/api/User/';
  constructor(private http: HttpClient) { }
  getUsersList(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url + 'UsersList' ,{ headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }) });
  }
  postUserData(UsersData: Users): Observable<Users> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Users>(this.url + 'CreateUsers', UsersData, httpHeaders);
  }
  updateUser(Users: Users): Observable<Users> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Users>(this.url + 'UpdateUsers?id=' + Users.id, Users, httpHeaders);
  }
  deleteUserById(id: number): Observable<number> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<number>(this.url + 'DeleteUser?id=' + id, httpHeaders);
  }
  getUserDetailsById(id: string): Observable<Users> {
    return this.http.get<Users>(this.url + 'UserDetail?id=' + id);
  }
}
