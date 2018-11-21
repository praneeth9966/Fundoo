import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../services/http/http.service'

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private user: HttpClient,
    private service: HttpService) { }

  url = environment.baseUrl;/**url */

  postlogout() {
    let url = this.url + "user/logout";
    return this.service.httpPost(url, {});/**passing the input & calling the  getFormUrlEncoded()*/
  }

  getDataService1() {
    let url = this.url + "user/service";
    return this.user.get(url);
  }

  getDataService2() {
    let url = this.url + "user";
    return this.user.get(url);
  }

  postsignup(body)/**post() service to post he data */ {
    let url = this.url + "user/userSignUp";
    return this.user.post(url, body);/**post the data */
  }

  postlogin(body) {
    let url = this.url + "user/login";
    return this.user.post(url, body);/**post the data */

  }

  postreset(body) {
    let url = this.url + "user/reset";
    return this.user.post(url, body);/**post the data */
  }
}