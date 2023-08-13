import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAddressComponent } from './api-address.component';

describe('ApiAddressComponent', () => {
  let component: ApiAddressComponent;
  let fixture: ComponentFixture<ApiAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
