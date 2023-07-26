import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';

import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FireDataBaseService } from '../../../core/services/firebase/fire-database.service';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Case } from '../../../core/models/case.model';
import { LocalStorageEnum } from '../../../core/enums/localStorageEnum';
import { UserData } from '../../../core/models/user-data.mode';
import { FireStorageService } from '../../../core/services/firebase/fire-storage.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as firebaseDatabase from 'firebase';
import { snapshortToArray, snapshortToArrayList } from 'src/environments/environment';
import { Router } from '@angular/router';
import { revenueBarChart, statData } from '../../../pages/contacts/profile/data';
import { ChartType } from '../../../pages/contacts/profile/profile.model';
import { Report } from '../../../core/models/report.model';

export class PersonData {
  name: string = "N/A";
  lastName: string = "N/A";
  address: string = "N/A";
  city: string = "N/A";
  skinColor: string = 'Piel Morena';
  gender: string = 'Masculino';
  hairBorm: string = 'Negro';
  birthDate: Date;
  age: number = 0;
  specialCondition: string = "N/A";
}

@Component({
  selector: 'app-create-reports',
  templateUrl: './create-reports.component.html',
  styleUrls: ['./create-reports.component.scss']
})

/**
 * Projects-create component
 */
export class CreateReportComponent implements OnInit {
  // bread crumb items
  // bread crumb items
  breadCrumbItems: Array<{}>;

  revenueBarChart: ChartType;
  statData;
  casesToReport: Case[];
  ref = firebaseDatabase.database().ref('cases/');
  personForm: FormGroup;
  public Editor = ClassicEditor;
  caseSelected: Case;
  report: Report;

  constructor(private formBuilder: FormBuilder, private fireDataBase: FireDataBaseService, private router: Router) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.personForm = this.formBuilder.group(new PersonData());
    this.fireDataBase._document = 'reports/'
    // fetches the data
    this._fetchData();

    this.ref.on('value', resp => {
      this.casesToReport = snapshortToArray(resp) as any;
      console.log(this.casesToReport)
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }

  onSubmit() {
    const formData: PersonData = this.personForm.value;
    console.log(formData);
    // Aquí puedes realizar acciones con los datos enviados.
  }

  selectCase(caseData: Case){
    Swal.fire({
      title: 'Completando información basada en las imágenes...',
      html: `<div class="spinner-border text-primary m-1" role="status">
      <span class="sr-only">Loading...</span>
      </div>`,
      showConfirmButton: false
    })
    
    
    setTimeout(() => {
      this.caseSelected = caseData;
      Swal.close();
    }, 5000);


  }

  unSelectCase(caseData: Case){
    this.caseSelected = undefined;
  }

  generateUniqueCode(): string {
    const currentDate = new Date();
    const dateNumber = currentDate.getTime().toString();
  
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueCode = '';
  
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueCode += characters.charAt(randomIndex);
    }
  
    uniqueCode = dateNumber + uniqueCode.substring(0, 6);
  
    return uniqueCode;
  }


  createReport() {
    // code: string;
    // description: string;
    // publishDate: Date;
    // comments: {userName: string, comment: string}[];
    // person: PersonData;
    // caseData: Case
    Swal.fire({
      title: 'Creando Reporte...',
      html: `<div class="spinner-border text-primary m-1" role="status">
      <span class="sr-only">Loading...</span>
    </div>`,
      showConfirmButton: false
    })
    this.report = {
      code: this.generateUniqueCode(),
      description: this.caseSelected.description,
      publishDate: new Date(),
      comments: [],
      person: this.personForm.value,
      caseData: this.caseSelected
    }
    this.fireDataBase.add(this.report);
    Swal.fire('Reporte Realizado', 'Se ha notificado a los usuarios de Encuentrame RD', 'success').then(res=> {
      if(res.isConfirmed) {
        this.router.navigate(['/projects/grid'])
      }
    });

  }

}
