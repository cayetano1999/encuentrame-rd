import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { UIModule } from '../../shared/ui/ui.module';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule, NgbDatepickerModule, NgbNavModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

import { ProjectgridComponent } from './projectgrid/projectgrid.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReportsComponent } from './reports/reports.component';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { CreateReportComponent } from './create-reports/create-reports.component';

@NgModule({
    
    declarations: [ProjectgridComponent, ProjectlistComponent, OverviewComponent, CreateComponent, ReportsComponent, CreateReportComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgApexchartsModule,
    DropzoneModule,
    FormsModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    WidgetModule,

    NgbNavModule,
    NgbModalModule,
    Ng2SearchPipeModule,
    Ng5SliderModule,
    NgSelectModule,
    NgbPaginationModule
    
  ],
  providers:[DatePipe]
})

export class ProjectsModule { }
