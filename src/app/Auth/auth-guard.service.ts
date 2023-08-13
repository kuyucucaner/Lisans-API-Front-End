import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import configurl from 'src/assets/config/config.json';
import { Router } from "@angular/router";
import { lastValueFrom } from 'rxjs';



@Injectable()
export class AuthGuard implements CanActivate {
  url = configurl.apiServer.url + '/api/Authenticate/';
  http: any;
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }
  async canActivate() {
    
    //yerel depoda bulunan jwt jetonunu alın
    const token = localStorage.getItem("Token");


    //belirtecin süresinin dolup dolmadığını kontrol edin, ardından giriş sayfasına yönlendirin ve false döndürün
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    const isRefreshSuccess = await this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }
    return isRefreshSuccess;
    
  }
  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("RefreshToken");

    if (!token || !refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {

      const response = await lastValueFrom(this.http.post(this.url + "Login", tokenModel));
      const newToken = (<any>response).accessToken;
      const newRefreshToken = (<any>response).refreshToken;
      localStorage.setItem("Token", newToken);
      localStorage.setItem("RefreshToken", newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

}