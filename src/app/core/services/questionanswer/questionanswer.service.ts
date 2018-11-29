import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionanswerService {

  constructor(private note: HttpClient,
    private service: HttpService) { }
  url = environment.baseUrl;/**url */

  askAQuestion(body) {
    let url = this.url + "questionAndAnswerNotes/addQuestionAndAnswer";
    return this.service.httpPost(url, body);
  }

  likeQnA(id, body) {
    let url = this.url + "questionAndAnswerNotes/like/" + id;
    return this.service.httpPost(url, body);
  }

  replyQnA(id, body) {
    let url = this.url + "questionAndAnswerNotes/reply/" + id
      return this.service.httpPost(url, body);
    }
}
