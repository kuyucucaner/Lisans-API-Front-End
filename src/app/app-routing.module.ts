import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiAddressComponent } from './api-address/api-address.component';
import { CustomerBranchComponent } from './customer-branch/customer-branch.component';
import { CustomersComponent } from './customers/customers.component';
import { DeviceLicenceComponent } from './device-licence/device-licence.component';
import { DeviceComponent } from './device/device.component';
import { DevicelicencestatusComponent } from './devicelicencestatus/devicelicencestatus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Login/login.component';
import { UseraddComponent } from './useradd/useradd.component';
import { UsersComponent } from './Users/users.component';

const routes: Routes = [ 
  { path: 'devicelicencestatus', component: DevicelicencestatusComponent},
  { path: 'users', component: UsersComponent },
  { path: '', component: HomeComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customerbranch', component: CustomerBranchComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'apiaddress', component: ApiAddressComponent },
  { path: 'devicelicence', component: DeviceLicenceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'useradd', component: UseraddComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
