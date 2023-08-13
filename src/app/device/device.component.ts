
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DeviceService } from '../device/device.service';
import { Device } from '../Models/device';
import { Router } from '@angular/router';
import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import dayjs from 'dayjs';
import { CustomerBranch } from '../Models/customer-branch';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
 
})
export class DeviceComponent implements OnInit {

 
  constructor(private formbulider: FormBuilder,
     public ActionService: ActionService,
     public ApiRootService:ApiRootService,
     public DatabaseService:DatabaseService,
     public HttpRequestService:HttpRequestService,
  ) { }

  ngOnInit() {
    this.ActionService.getDeviceListTata();
  }
}
