
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core'; 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
  
 
})
@Injectable({
  providedIn: 'root' // just before your class
})
export class UsersComponent implements OnInit   {
branchCloseTime: string|number;


  constructor(private formbulider: FormBuilder,
    public ActionService: ActionService,
    public ApiRootService:ApiRootService,
    public DatabaseService:DatabaseService,
    public HttpRequestService:HttpRequestService,
    private toastr: ToastrService,
 

    ) {    }

  ngOnInit() {
    this.DatabaseService.userCategory = "0";
    const date:Date= new Date();
    this.DatabaseService.timee = '04:00:00';
    this.DatabaseService.port = '9001';
    this.DatabaseService.currentDate=dayjs(date).format('YYYY-MM-DD');
    this.DatabaseService.finishDate=dayjs(date).add(1,'years').format('YYYY-MM-DD');
    this.DatabaseService.usersForm = this.formbulider.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: [0],
      password: ['', [Validators.required, Validators.minLength(4)]],
      isGeneralAdmin: ['false', [Validators.required]],
      isCustomerAdmin: ['false', [Validators.required]],
      createDate: [this.DatabaseService.currentDate, [Validators.required]],
      expireDate: [this.DatabaseService.finishDate, [Validators.required]],
      branchCloseTime: [''],
      addressType: [null],
      apiaddress:[null], 
      port : [''],
    });
    this.ActionService.getUsersList();
    this.DatabaseService.ApiAddressCategory = "0";
    this.DatabaseService.ApiAddressForm = this.formbulider.group({
      customerBranchId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required , Validators.minLength(6)]],
      addressType: ['', [Validators.required]],
      
    });
    this.ActionService.getApiAddressList();
    this.DatabaseService.CustomerBranchCategory = "0";
    this.DatabaseService.currentDate=dayjs(date).format('YYYY-MM-DD');
    this.DatabaseService.CustomerBranchForm = this.formbulider.group({
      customerId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      createDate: [this.DatabaseService.currentDate, [Validators.required]],
      branchCloseTime: ['', [Validators.required]],

    });
  }

 

}
