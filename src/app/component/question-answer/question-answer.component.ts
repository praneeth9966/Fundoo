import { Component, OnInit, Input } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionanswerService } from 'src/app/core/services/questionanswer/questionanswer.service';
import { environment } from 'src/environments/environment';

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
  private replyAnswer;
  private hide=0;
  private replyDisplay=0;
  private parentId;
  private likeCount;
  private createdDate;
  private question;
  private fullArray=[];
  image = localStorage.getItem('imageUrl');
  profile = environment.profileUrl + this.image;
  private replyAnswerShow : string = ''
  private reply : string = ''
  // owner=this.data["user"];
  // ownerProfile = environment.profileUrl + this.owner.imageUrl;
  
  constructor(private notesService: NotesService, public route: ActivatedRoute,
    private questionService:QuestionanswerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.notesId = params['noteid']
    })
    this.notesService.getQuestions(this.notesId)
      .subscribe(data => {
        console.log(data);
        this.question= data['data']['data'][0]
        this.title = this.question.title;
        this.description = this.question.description;
        this.fullArray=this.question['questionAndAnswerNotes'];
        console.log(this.fullArray);
        
        if(this.question.questionAndAnswerNotes[0]!=undefined){
        this.askAQuestion=this.question['questionAndAnswerNotes'][0].message;
        this.parentId=this.question['questionAndAnswerNotes'][0].id;
          this.createdDate=this.question.createdDate;
        }
        
        this.like();
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
        this.hide = 1
      })
  }

  like(){
    let requestBody={
    "like":true
    }
    this.questionService.likeQnA(this.parentId,requestBody).subscribe(data=>{
    console.log("like: ", data);
    this.likeCount=data['data']['details'].count;
    console.log(this.likeCount);
    })
    }

    replyQuestion(reply){
      let requestBody={
        "message":reply
        }
        this.reply = ''
        this.questionService.replyQnA(this.parentId,requestBody).subscribe(data=>{
        console.log("reply: ", data);
        // this.replyDisplay=1;
        // this.replyAnswer=data['data']['details'].message
        })
    }
}


