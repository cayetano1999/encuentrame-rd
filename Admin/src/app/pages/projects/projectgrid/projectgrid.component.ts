import { Component, OnInit } from '@angular/core';

import { Project } from '../project.model';
import * as firebaseDatabase from 'firebase';
import { projectData } from '../projectdata';
import { Router } from '@angular/router';
import { Case } from '../../../core/models/case.model';
import { snapshortToArray } from '../../../../environments/environment';
import { UserData } from '../../../core/models/user-data.mode';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  userData: UserData = JSON.parse(localStorage.getItem('userData'));


  constructor(private router: Router) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Casos' }, { label: 'Administrar Casos', active: true }];
    this.projectData = projectData;
    this.ref.on('value', resp => {
      this.casesToReport = snapshortToArray(resp) as any;
      debugger;
      if(this.userData.user.policeCenterDto) {
        this.casesToReport = this.casesToReport.filter(e=> e.user.user.policeCenterDto != null && e.user.user.policeCenterDto.address != 'N/A');
      }

      console.log(this.casesToReport)
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  redirectToCreate(){
      this.router.navigate(['/projects/create']);
  }

}
