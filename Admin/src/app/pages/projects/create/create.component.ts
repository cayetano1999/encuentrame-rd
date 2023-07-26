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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

/**
 * Projects-create component
 */
export class CreateComponent implements OnInit {


  files: any[] = [];
  otherFiles: any[] = [];

  case: Case;

  config: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    uploadMultiple: true,
    accept: (file) => {
      this.onFileLoad(file);
    }
  };

  configOthers: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    uploadMultiple: true,
    accept: (file) => {
      this.onOthersFiles(file);
    }
  };
  breadCrumbItems: Array<{}>;

  public Editor = ClassicEditor;

  form = new FormGroup({
    member: new FormArray([
      new FormControl(''),
    ]),
  });

  caseForm: FormGroup;

  hoveredDate: NgbDate;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  hidden: boolean;
  selected: any;

  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild('dp', { static: true }) datePicker: any;

  /**
   * Returns the form field value
   */
  get member(): FormArray { return this.form.get('member') as FormArray; }

  /**
   * Add the member field in form
   */
  addMember() {
    this.member.push(new FormControl());
  }

  /**
   * Onclick delete member from form
   */
  deleteMember(i: number) {
    this.member.removeAt(i);
  }

  constructor(private router: Router, private calendar: NgbCalendar, private fireDatabase: FireDataBaseService, private fireStorage: FireStorageService, private datePipe: DatePipe, private formBuilder: FormBuilder) {

    
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Casos' }, { label: 'Crear Caso', active: true }];
    this.hidden = true;
    this.fireDatabase._document = 'cases/'
    this.caseForm = this.formBuilder.group({
      reference: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(30)]]
    });

   

  }

  /**
   * on date selected
   * @param date date object
   */
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.selected = this.fromDate.toLocaleDateString() + '-' + this.toDate.toLocaleDateString();

      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });
      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;

    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    }
  }
  /**
   * Is hovered over date
   * @param date date obj
   */
  isHovered(date: NgbDate) {
    return this.fromNGDate && !this.toNGDate && this.hoveredDate && date.after(this.fromNGDate) && date.before(this.hoveredDate);
  }

  /**
   * @param date date obj
   */
  isInside(date: NgbDate) {
    return date.after(this.fromNGDate) && date.before(this.toNGDate);
  }

  /**
   * @param date date obj
   */
  isRange(date: NgbDate) {
    return date.equals(this.fromNGDate) || date.equals(this.toNGDate) || this.isInside(date) || this.isHovered(date);
  }


  async createCase() {
    Swal.fire({
      title: 'Guardando Caso....',
      html: `<div class="spinner-border text-primary m-1" role="status">
      <span class="sr-only">Loading...</span>
    </div>`,
      showConfirmButton: false
    })
    if (this.caseForm.invalid) {
      Swal.fire('Formulario Incompleto', 'Debes completar los campos requeridos', 'error');
      this.caseForm.markAllAsTouched();
      return;
    }
    else if (!this.files.length || !this.otherFiles.length) {
      Swal.fire('No se encontraron imámagnes', 'Favor cargar las imagenes correspondientes', 'error');
      return;
    }

    this.case = {
      code: this.generateUniqueCode(),
      caseReference: `${this.caseForm.get('reference').value}  ${this.datePipe.transform(new Date(), 'full')}`,
      description: this.caseForm.get('description').value,
      creationDate: this.datePipe.transform(new Date(), 'short'),
      user: JSON.parse(localStorage.getItem(LocalStorageEnum.USER_DATA)) as UserData,
      personImages: [],
      othersImages: [],
      status: 'pending',
    };
    debugger;
    await this.uploadFirebasePersonFiles(this.case);
    await this.uploadFirebaseOthersFiles(this.case);
    await this.fireDatabase.add(this.case);
    Swal.fire('Caso Guardado', 'El caso ha sido guardado correctamente', 'success').then(res=> {
      if(res.isConfirmed) {
        this.router.navigate(['/projects/grid'])
      }
    });
    
  }

  async onFileLoad(event: any) {
    console.log('Archivo Agregado');
    this.files.push(event);
  }

  async onOthersFiles(event: any) {
    console.log('Otro archivo Agregado');
    this.otherFiles.push(event)
  }

  async uploadFirebasePersonFiles(caseModel: Case) {
    let i = 0;
    for (const element of this.files) {
      i = i + 1;
      let url = await this.fireStorage.uploadImg(element, caseModel.caseReference + '/IMGS-PERSONA/', `img${i}`);
      this.case.personImages.push(url as string);
    }
    console.log(this.case);
  }

  async uploadFirebaseOthersFiles(caseModel: Case) {
    let i = 0;
    for (const element of this.otherFiles) {
      i = i + 1;
      let url = await this.fireStorage.uploadImg(element, caseModel.caseReference + '/IMGS-OTHERS/', `img${i}`);
      this.case.othersImages.push(url as string);
    }
    console.log(this.case);
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
}
