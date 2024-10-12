import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { MessageService } from 'primeng/api';
import { AllApiCallingService } from '../../service/all-api-calling.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  public homePageObj:any = this.fetchHomePageObj();
  constructor(private messageService:MessageService, private allApiCallingService:AllApiCallingService){

    }
  ngOnInit() {
  }

  emitEvent(event:any){
    if(event && event.eventType && event.eventType === "AddEmail"){
      const obj = {
        'id': ((this.homePageObj.emailList.length)+1),
        'emailInputField' : null,
        'subjectInputField' : null,
        'msgInputField' : null,
      };
      this.homePageObj.emailList.push(obj)
    }
    else if(event && event.eventType && event.eventType === "submitBtn"){
      if(_.isArray(event.eventData) && event.eventData.length > 0 && this.validationField(event.eventData)){
        const payload = {
          'send_to': _.uniq(_.compact(_.pluck(event.eventData, 'emailInputField'))).toString(),
          'subject': event.eventData[0]['subjectInputField'],
          "send_text": event.eventData[0]['msgInputField']
        }
        this.homePageObj.showLoader = true;
        this.allApiCallingService.postMethodApi('send-email',payload).subscribe((res:any)=>{
          if(res && !res.error_status && res.msgCode === 'SEND_MAIL_200'){
            this.homePageObj.emailList = [];
            this.homePageObj.showLoader = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Mail sent successfully!' });
          }else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fail to sent Mail!' });
          }
        },(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fail to sent Mail!' });
        })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Enter Valid Input' });
      }
    }
  }

  fetchHomePageObj(){
    return {
      'emailList': [],
      'showLoader': false
    }
  }

  validationField(arrList: any){
    let flag = false;
    flag = arrList.filter((el:any,i:any)=> !el.emailInputField || el.emailInputField === "" || (i === 0 && ( !el.msgInputField || el.msgInputField === "" || !el.subjectInputField || el.subjectInputField === ""))).length > 0 ? false : 
    arrList.filter((el:any)=> el && el.emailInputField && (!el.emailInputField.toString().includes('@') || !el.emailInputField.toString().includes('.'))).length > 0 ? false :true;
    return flag;
  }
}
