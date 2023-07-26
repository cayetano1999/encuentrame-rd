import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CreateReportComponent } from './create-reports.component';


describe('CreateReportComponent', () => {
  let component: CreateReportComponent;
  let fixture: ComponentFixture<CreateReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReportComponent ]
    })
    .compileComponents();
  }));



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
