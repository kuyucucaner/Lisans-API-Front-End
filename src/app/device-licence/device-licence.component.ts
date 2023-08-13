
import { Component, OnInit  } from '@angular/core';
import { FormBuilder  } from '@angular/forms';
import { ActionService } from '../service/action.service';
import { ApiRootService } from '../service/api-root.service';
import { DatabaseService } from '../service/database.service';
import { HttpRequestService } from '../service/http-request.service';

@Component({
  selector: 'app-device-licence',
  templateUrl: './device-licence.component.html',
  styleUrls: ['./device-licence.component.css']
})
export class DeviceLicenceComponent implements OnInit {


  constructor(private formbulider: FormBuilder,
    public ActionService: ActionService,
    public ApiRootService:ApiRootService,
    public DatabaseService:DatabaseService,
    public HttpRequestService:HttpRequestService,
) { }

  ngOnInit() {

this.ActionService.getDeviceLicenceListTata();

  }
 
}
