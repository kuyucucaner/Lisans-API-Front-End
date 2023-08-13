import { Component,OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';


@Component({
  selector: 'app-device-licence-status',
  templateUrl: './devicelicencestatus.component.html',
  styleUrls: ['./devicelicencestatus.component.css']
})
export class DevicelicencestatusComponent implements OnInit {


  constructor(private formbulider: FormBuilder,
    public ActionService: ActionService,
    public ApiRootService:ApiRootService,
    public DatabaseService:DatabaseService,
    public HttpRequestService:HttpRequestService,
) { }

  ngOnInit(): void {
  }
  }
  


