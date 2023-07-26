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
import { snapshortToArrayList } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

/**
 * Projects-create component
 */
export class ReportsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;

  transactions;

  constructor(private router: Router) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Administrar' }, { label: 'Reportes', active: true }];

    this.transactions = [
      {
        id: '67',
        name: 'Josue Cayetano',
        date: '24 Jul, 2023',
        total: 'Encontrado en los alrededores del ensanche ozama con heridas de armas...',
        status: 'Paid',
        payment: ['fab fa-cc-mastercard', '122333-23'],
        index: 1,
      },
    ];
  }

  redirectToCreate(){
    this.router.navigate(['projects/create-reports'])
  }

}
