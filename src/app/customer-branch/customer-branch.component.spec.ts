import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBranchComponent } from './customer-branch.component';

describe('CustomerBranchComponent', () => {
  let component: CustomerBranchComponent;
  let fixture: ComponentFixture<CustomerBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
