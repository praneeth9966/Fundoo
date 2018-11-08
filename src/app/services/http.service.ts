
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HttpService {
  // url = 'http://34.213.106.173/api'

  constructor(private http: HttpClient) { }



  getHttpData(nexturl) {
    return this.http.get(environment.baseUrl + '/' + nexturl)

  }



  postHttpData(nexturl, body) {
    return this.http.post(environment.baseUrl+ '/' + nexturl, body)
  }

  httpPasswordUpdate(nextUrl, token, body) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token

      })

    };
    return this.http.post(environment.baseUrl + "/" + nextUrl, this.getFormUrlEncoded(body), httpOptions)
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

  httpLogout(nexturl, token) {

    var httpAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token

      })
    }
    return this.http.post(environment.baseUrl + '/' + nexturl, {}, httpAuthentication);
  }


  httpAddNotes(nexturl, input, token) {

    var httpAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token

      })
    }
    return this.http.post(environment.baseUrl + '/' + nexturl, this.getFormUrlEncoded(input), httpAuthentication);
  }


  httpGetNotes(nexturl, token) {

    var httpAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token

      })
    }
    return this.http.get(environment.baseUrl + '/' + nexturl, httpAuthentication);
  }

  httpDeleteNotes(nexturl, body, token) {
    var httpAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token

      })
    }
    return this.http.post(environment.baseUrl + '/' + nexturl, body, httpAuthentication);
  }


  httpPostArchive(nexturl, body, token) {
    var httpAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token

      })
    }
    return this.http.post(environment.baseUrl + '/' + nexturl, body, httpAuthentication);
  }


  httpGetArchive(nexturl, token) {
    var httpAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token

      })
    }
    return this.http.post(environment.baseUrl + '/' + nexturl, httpAuthentication);
  }

  httpColorNotes(nexturl, body, token) {
    var httpAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token

      })
    }
    return this.http.post(environment.baseUrl + '/' + nexturl, body, httpAuthentication);
  }

  httpUpdateNotes(nextUrl, body, token) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token

      })

    };
    return this.http.post(environment.baseUrl + "/" + nextUrl, this.getFormUrlEncoded(body), httpOptions)
  }

  httpDeleteLabel(nexturl,token) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token

      })

    };
    return this.http.delete(environment.baseUrl+ "/" + nexturl,httpOptions)
  }


httpUpdateLabel(nexturl, body, token) {
  var httpAuthentication = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  }
  return this.http.post(environment.baseUrl+ '/' + nexturl, body, httpAuthentication);
}

httpAddImage(nexturl,body,token){
  console.log(token);
  var httpOptions={
    headers:new HttpHeaders({
     
     'Authorization':token
    })
  };
  return this.http.post(environment.baseUrl+"/"+nexturl,body,httpOptions)
}

httpAddReminder(nexturl,body,token){
  console.log(token);
  var httpOptions={
    headers:new HttpHeaders({
     
     'Authorization':token
    })
  };
  return this.http.post(environment.baseUrl+"/"+nexturl,body,httpOptions)
}

httpGetReminder(nexturl,token){
  console.log(token);
  var httpOptions={
    headers:new HttpHeaders({
     
     'Authorization':token
    })
  };
  return this.http.get(environment.baseUrl+"/"+nexturl,httpOptions)
}
}
