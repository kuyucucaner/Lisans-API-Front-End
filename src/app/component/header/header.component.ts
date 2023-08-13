import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';
import { ActionService } from '../../service/action.service';
import { ApiRootService } from '../../service/api-root.service';
import { DatabaseService } from '../../service/database.service';
import { HttpRequestService } from '../../service/http-request.service';
import { Observable } from 'rxjs';
import { DeviceLicence } from 'src/app/Models/device-licence';
import { DeviceLicenceService2 } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 /* DeviceLicenceList?: Observable<DeviceLicence[]>;
  DeviceLicenceTable=[];
  DeviceLicenceForm: any;
  massage = "";
  DeviceLicenceCategory = "";
  currentDate:any;
  finishDate:any;
  confirmedDate:any;
  modifiedDate:any;
 */
  constructor(private formbulider: FormBuilder,
    public ActionService: ActionService,
    public ApiRootService:ApiRootService,
    public DatabaseService:DatabaseService,
    public HttpRequestService:HttpRequestService,
) { }


  ngOnInit(): void {
    this.ActionService.getDeviceLicenceActiveList();
  }


}
