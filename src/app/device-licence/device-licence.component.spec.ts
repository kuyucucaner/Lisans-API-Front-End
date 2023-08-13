import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLicenceComponent } from './device-licence.component';

describe('DeviceLicenceComponent', () => {
  let component: DeviceLicenceComponent;
  let fixture: ComponentFixture<DeviceLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceLicenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
