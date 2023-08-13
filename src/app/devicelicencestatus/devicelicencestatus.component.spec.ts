import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicelicencestatusComponent } from './devicelicencestatus.component';

describe('DevicelicencestatusComponent', () => {
  let component: DevicelicencestatusComponent;
  let fixture: ComponentFixture<DevicelicencestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicelicencestatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicelicencestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
