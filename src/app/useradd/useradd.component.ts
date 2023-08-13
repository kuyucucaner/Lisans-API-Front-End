import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';
@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UseraddComponent implements OnInit {

  constructor(private formbulider: FormBuilder,
    public ActionService: ActionService,
    public ApiRootService:ApiRootService,
    public DatabaseService:DatabaseService,
    public HttpRequestService:HttpRequestService,
    ) { }

  ngOnInit(): void {
    const date:Date= new Date();
    this.DatabaseService.currentDate=dayjs(date).format('YYYY-MM-DD');
    this.DatabaseService.SystemUserCategory = "0";
    this.DatabaseService.SystemUsersForm = this.formbulider.group({
      roleId: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      createDate: [this.DatabaseService.currentDate, [Validators.required]],
  }
    )
    this.ActionService.getSystemUsersList();

}}
