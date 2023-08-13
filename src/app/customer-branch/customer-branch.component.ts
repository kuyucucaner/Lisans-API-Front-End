
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';


@Component({
  selector: 'app-customer-branch',
  templateUrl: './customer-branch.component.html',
  styleUrls: ['./customer-branch.component.css']
  
  
})
export class CustomerBranchComponent implements OnInit {

  constructor(private formbulider: FormBuilder, 
       public ActionService: ActionService,
    public ApiRootService:ApiRootService,
    public DatabaseService:DatabaseService,
    public HttpRequestService:HttpRequestService,
) { }

  ngOnInit() {
    this.DatabaseService.CustomerBranchCategory = "0";
    this.DatabaseService.timee = '04:00:00';
    this.DatabaseService.port = '9001';
    const date:Date= new Date();
    this.DatabaseService.currentDate=dayjs(date).format('YYYY-MM-DD');
    this.DatabaseService.CustomerBranchForm = this.formbulider.group({
      customerId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
      createDate: [this.DatabaseService.currentDate, [Validators.required]],
      branchCloseTime: ['', [Validators.required]],
      addresstype : ['', [Validators.required]],
      apiaddress : ['', [Validators.required]],
      port : [''],
    });
    this.DatabaseService.ApiAddressCategory = "0";
    this.DatabaseService.ApiAddressForm = this.formbulider.group({
      customerBranchId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required , Validators.minLength(6)]],
      addressType: ['', [Validators.required]],
      
    });
    this.ActionService.getApiAddressList();
    this.ActionService.getCustomerBranchListTata();
    this.ActionService.getCustomersList();


  }
}
