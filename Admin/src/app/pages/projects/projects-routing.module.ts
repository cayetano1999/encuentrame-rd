import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectgridComponent } from './projectgrid/projectgrid.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateReportComponent } from './create-reports/create-reports.component';

const routes: Routes = [
    {
        path: 'grid',
        component: ProjectgridComponent
    },
    {
        path: 'list',
        component: ProjectlistComponent
    },
    {
        path: 'reports',
        component: ReportsComponent
    },
    {
        path: 'create',
        component: CreateComponent
    }, 
    {
        path: 'create-reports',
        component: CreateReportComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {}
