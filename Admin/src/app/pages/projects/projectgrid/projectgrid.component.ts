import { Component, OnInit } from '@angular/core';

import { Project } from '../project.model';
import * as firebaseDatabase from 'firebase';
import { projectData } from '../projectdata';
import { Router } from '@angular/router';
import { snapshortToArray, snapshortToArrayList } from 'src/environments/environment';
import { Case } from 'src/app/core/models/case.model';

@Component({
  selector: 'app-projectgrid',
  templateUrl: './projectgrid.component.html',
  styleUrls: ['./projectgrid.component.scss']
})

/**
 * Projects-grid component
 */
export class ProjectgridComponent implements OnInit {

  ref = firebaseDatabase.database().ref('cases/');

  // bread crumb items
  breadCrumbItems: Array<{}>;

  projectData: Project[];
  casesToReport: Case[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Casos' }, { label: 'Administrar Casos', active: true }];
    this.projectData = projectData;
    this.ref.on('value', resp => {
      this.casesToReport = snapshortToArray(resp) as any;
      console.log(this.casesToReport)
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  redirectToCreate(){
      this.router.navigate(['/projects/create']);
  }

}
