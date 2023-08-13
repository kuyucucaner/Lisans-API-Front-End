import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import dayjs from 'dayjs';

import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private formbulider: FormBuilder,
    public ActionService: ActionService,
    public ApiRootService: ApiRootService,
    public DatabaseService: DatabaseService,
    public HttpRequestService: HttpRequestService,
  ) { }

  ngOnInit(): void {
    this.DatabaseService.userCategory = "0";
    const date:Date= new Date();
    this.DatabaseService.expireDate=dayjs(date).add(1,'years').format('YYYY-MM-DD');
    this.DatabaseService.DeviceLicenceForm = this.formbulider.group({
      id: ['', [Validators.required]],
      expireDate: [this.DatabaseService.expireDate, [Validators.required]],
    });
    this.ActionService.getUsersList();
    this.ActionService.getDeviceLicenceTodayList();
    this.ActionService.getDeviceLicenceEndTimeList();
    this.ActionService.getCustomersList();
    this.ActionService.getCustomerBranchList();
    this.ActionService.getDeviceListHeader();
    this.ActionService.getDeviceLicenceList();
    this.ActionService.getApiAddressList();
    this.ActionService.getDeviceLicenceBossTodayConfirmList();
    this.ActionService.getDeviceLicenceTerminalTodayConfirmList();
    this.ActionService.getDeviceLicenceBossWeekConfirmList();
    this.ActionService.getDeviceLicenceTerminalWeekConfirmList();
    this.ActionService.getDeviceLicenceBossMonthConfirmList();
    this.ActionService.getDeviceLicenceTerminalMonthConfirmList();
  }
}
