import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionanswerService } from 'src/app/core/services/questionanswer/questionanswer.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {
  private notesId;
  private title;
  private description;
  private askAQuestion;
  private hide=0;
  constructor(private notesService: NotesService, public route: ActivatedRoute,
    private questionService:QuestionanswerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.notesId = params['noteid']
    })
    this.notesService.getQuestions(this.notesId)
      .subscribe(res => {
        this.title = res['data']['data'][0].title;
        this.description = res['data']['data'][0].description;
        console.log(res);
        console.log(this.title);
        console.log(this.description);
      });
  }

  postQuestion(question) {
    this.questionService.askAQuestion({
      "message": question,
      "notesId": this.notesId
    })
      .subscribe(data => {
        console.log(data);
        this.askAQuestion=data['data']['details'].message
        console.log(this.askAQuestion);
        this.hide = 1
      })
  }
}


