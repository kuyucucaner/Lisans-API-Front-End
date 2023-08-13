
import { Component, OnInit ,ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';
@Component({
  selector: 'app-api-address',
  templateUrl: './api-address.component.html',
  styleUrls: ['./api-address.component.css']
  
})
export class ApiAddressComponent implements OnInit {

  constructor(private formbulider: FormBuilder,
    public ActionService: ActionService,
    public ApiRootService:ApiRootService,
    public DatabaseService:DatabaseService,
    public HttpRequestService:HttpRequestService,
) { }

  ngOnInit() {
   
    this.DatabaseService.ApiAddressCategory = "0";
    this.DatabaseService.ApiAddressForm = this.formbulider.group({
      customerBranchId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      userName: [''],
      password: [''],
      addressType: ['', [Validators.required]],
      port : ['', [Validators.required]]
      
    });
    this.ActionService.getApiAddressList();
    this.ActionService.getCustomerBranchList();
  }

}
