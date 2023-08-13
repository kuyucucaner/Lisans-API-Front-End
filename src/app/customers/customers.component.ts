
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import dayjs from 'dayjs';

import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
  
 
})
export class CustomersComponent implements OnInit {


  constructor(private formbulider: FormBuilder,
    public ActionService: ActionService,
    public ApiRootService:ApiRootService,
    public DatabaseService:DatabaseService,
    public HttpRequestService:HttpRequestService,
) {  }

  ngOnInit() {
    this.DatabaseService.CustomersCategory = "0";
    const date:Date= new Date();
    this.DatabaseService.currentDate=dayjs(date).format('YYYY-MM-DD');
    this.DatabaseService.CustomersForm = this.formbulider.group({
      name: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      alias: ['', [Validators.required]],
      address: ['', [Validators.required]],
      taxNumber: ['', [Validators.required]],
      taxOffice: ['', [Validators.required]],
      createDate: [this.DatabaseService.currentDate, [Validators.required]],
      userId: ['', [Validators.required]],
    });
    ///////////////////////////////////////////////
    this.DatabaseService.ApiAddressCategory = "0";
    this.DatabaseService.ApiAddressForm = this.formbulider.group({
      customerBranchId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required , Validators.minLength(6)]],
      addressType: ['', [Validators.required]],
      
    });
    this.ActionService.getApiAddressList();

    /////////////////////////////////////////////////

    ////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////
    this.DatabaseService.userCategory = "0";

    this.DatabaseService.currentDate=dayjs(date).format('YYYY-MM-DD');
    this.DatabaseService.finishDate=dayjs(date).add(1,'years').format('YYYY-MM-DD');
    this.DatabaseService.usersForm = this.formbulider.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      isGeneralAdmin: ['', [Validators.required]],
      isCustomerAdmin: ['', [Validators.required]],
      createDate: [this.DatabaseService.currentDate, [Validators.required]],
      expireDate: [this.DatabaseService.finishDate, [Validators.required]],
    });
    this.ActionService.getUsersList();
    this.ActionService.getCustomersList();

   
  }
 

}
