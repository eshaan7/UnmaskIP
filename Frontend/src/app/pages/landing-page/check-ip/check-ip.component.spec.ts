import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIpComponent } from './check-ip.component';

describe('CheckIpComponent', () => {
  let component: CheckIpComponent;
  let fixture: ComponentFixture<CheckIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
