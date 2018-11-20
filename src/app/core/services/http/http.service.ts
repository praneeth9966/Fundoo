import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  httpPasswordUpdate(nextUrl,body) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post(environment.baseUrl + "/" + nextUrl, this.getFormUrlEncoded(body), httpOptions)
  }

  public httpPost(url, body) {
    var httpAuthOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, body, httpAuthOptions2);/**passing the input & calling the  getFormUrlEncoded()*/
  }

  public httpget(url) {
    var httpAuthOptions3 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })

    };
    return this.http.get(url, httpAuthOptions3);
  }

  public httppostpassword(url, body) {
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(body), httpAuthOptions1)/**passing the input & calling the  getFormUrlEncoded()*/
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

  public httpImage(url, body) {
    var http = {
      headers: new HttpHeaders({

      })
    };
    return this.http.post(url, body, http)
  }

}
