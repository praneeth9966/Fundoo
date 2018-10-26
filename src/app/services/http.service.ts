
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    
httpPasswordUpdate(nextUrl,token, body) {
  var httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': token
  
  })
  
  };
  return this.http.post(this.url+"/"+nextUrl,this.getFormUrlEncoded(body),httpOptions)
  }
  getFormUrlEncoded(toConvert) {
  const formBody = [];
  for (const property in toConvert) {
  const encodedKey = encodeURIComponent(property);
  const encodedValue = encodeURIComponent(toConvert[property]);
  formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
  }

  httpLogout(nexturl,token){
   
    var httpAuthentication = {
      headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
      
      })
    }
    return this.http.post(this.url+'/'+nexturl,{},httpAuthentication);
  }

  httpAddNotes(nexturl,input,token){
   
    var httpAuthentication = {
      headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
      
      })
    }
    return this.http.post(this.url+'/'+nexturl,this.getFormUrlEncoded(input),httpAuthentication);
  }

  httpGetNotes(nexturl,token){
   
    var httpAuthentication = {
      headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
      
      })
    }
    return this.http.get(this.url+'/'+nexturl,httpAuthentication);
  }

  httpDeleteNotes(nexturl,body,token){
    var httpAuthentication = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
      
      })
    }
    return this.http.post(this.url+'/'+nexturl,body,httpAuthentication);
  }

  
  httpPostArchive(nexturl,body,token){
    var httpAuthentication = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
      
      })
    }
    return this.http.post(this.url+'/'+nexturl,body,httpAuthentication);
  }


  httpGetArchive(nexturl,token){
    var httpAuthentication = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
      
      })
    }
    return this.http.post(this.url+'/'+nexturl,httpAuthentication);
  }

  httpColorNotes(nexturl,body,token){
    var httpAuthentication = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
      
      })
    }
    return this.http.post(this.url+'/'+nexturl,body,httpAuthentication);
  }

}
