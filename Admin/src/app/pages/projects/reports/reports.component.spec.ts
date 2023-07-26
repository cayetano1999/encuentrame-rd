import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReportsComponent } from './reports.component';


describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsComponent ]
    })
    .compileComponents();
  }));



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
