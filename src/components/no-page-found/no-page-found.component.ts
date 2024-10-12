import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrl: './no-page-found.component.scss'
})
export class NoPageFoundComponent implements OnInit{
  public showSection = true;
  public nofoundPageObj = this.fetchPageObj();

  constructor(private router: Router){
    
  }

  ngOnInit(){
    
  }

  redirectToHomePage(){
    this.router.navigateByUrl('/home');
  }

  fetchPageObj(){
    return {
      'imgHeight': 600,
      'imgwidth': 1300,
    }
  }

}
