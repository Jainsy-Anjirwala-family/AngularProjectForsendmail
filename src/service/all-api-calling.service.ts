import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllApiCallingService {
  public env:any = null;
  public url = "https://backendusingnodemailer.onrender.com/";
  // public url = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  postMethodApi(endUrl:any, payload:any){
    return this.http.post(this.url+endUrl, JSON.parse(JSON.stringify(payload))).pipe(
        map((response) => {
          return response;
      }),
        catchError((res)=>{
          return res;
        })
    );
  }

}
