import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './Auth/auth-guard.service';
import { LoginComponent } from './Login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent} from './home/home.component';
import { __values } from 'tslib';
import { UsersComponent } from './Users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerBranchComponent } from './customer-branch/customer-branch.component';
import { DeviceComponent } from './device/device.component';
import { DeviceLicenceComponent } from './device-licence/device-licence.component';
import { ApiAddressComponent } from './api-address/api-address.component';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { DevicelicencestatusComponent } from './devicelicencestatus/devicelicencestatus.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UseraddComponent } from './useradd/useradd.component';







//all components routes
const routes: Routes = [
 //{ path: '', component: HomeComponent },
 //{ path: 'login', component: LoginComponent },
 //{ path: 'users', component: UsersComponent },
 //{ path: 'customers', component: CustomersComponent },
 //{ path: 'customerbranch', component: CustomerBranchComponent },
 //{ path: 'device', component: DeviceComponent },
 //{ path: 'apiaddress', component: ApiAddressComponent },
 //{ path: 'devicelicence', component: DeviceLicenceComponent },
];

//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    CustomersComponent,
    DeviceComponent,
    DeviceLicenceComponent,
    CustomerBranchComponent,
    ApiAddressComponent,
    DevicelicencestatusComponent,
    HeaderComponent,
    SidebarComponent,
    UseraddComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule,
    ButtonModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSelectModule,
    AutoCompleteModule,
    MatAutocompleteModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputTextModule,

    SweetAlert2Module.forRoot(),
    NgbModule,
    MessagesModule,
    TableModule,
    RadioButtonModule,
    PaginatorModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7164"],
        disallowedRoutes: []
      }
  }),
  ToastrModule.forRoot(),

  ],
  
  exports: [RouterModule,],
  providers: [AuthGuard,ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
