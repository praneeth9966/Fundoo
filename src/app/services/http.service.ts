
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url='http://34.213.106.173/api'
 
  constructor(private http: HttpClient) { }



  getHttpData(nexturl) {
    return this.http.get(this.url+'/'+nexturl)
    
  }
postHttpData(nexturl,body){
  return this.http.post(this.url+'/'+nexturl,body)
}
    
  

}
