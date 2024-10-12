import { Component } from '@angular/core';
import * as _ from 'underscore';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Jainsy Anjirwala Mail';

  constructor( private router: Router, private activatedRoute: ActivatedRoute,private location: Location){
    if(this.location.path() !== "/home"){
      this.router.navigateByUrl('/noPage');
    }
  }
}
