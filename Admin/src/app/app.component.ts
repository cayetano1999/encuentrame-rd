import { Component , OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import * as firebaseApp from '../../node_modules/firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  /**
   *
   */
  constructor() {
    firebaseApp.initializeApp(environment.firebaseConfig);
  }

  ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
}
