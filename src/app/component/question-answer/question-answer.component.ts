import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuestionanswerService } from 'src/app/core/services/questionanswer/questionanswer.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})

export class QuestionAnswerComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('replyMessage') public replyMsg: ElementRef;
  @ViewChild('questionAsked') public qAsked: ElementRef;
  constructor(private route: ActivatedRoute, private notesService: NotesService,
    public router: Router, public quesService: QuestionanswerService) { }
  private noteId;
  private noteTitle;
  private noteDescription;
  public noteDetails;
  private checkList = [];
  private noteColor;
  private message;
  private parentId;
  private userName;
  private userDetails;
  private img;
  private profilePic;
  private replyId;
  private questionAnswerArray;
  private show = false;
  replyQuestion;
  private value;
  private avgRate;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.noteId = params['noteid'];
      LoggerService.log('noteDetails', this.noteId);
    });
    this.getNoteDetailsInQuestion();
  }

  getNoteDetailsInQuestion() {
    this.notesService.getQuestions(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('getNoteDetail', data);
        this.userDetails = data['data']['data'][0].user;
        this.profilePic = environment.profileUrl;
        this.noteDetails = data['data'].data[0];
        this.noteTitle = this.noteDetails.title;
        this.noteDescription = this.noteDetails.description;

        for (var i = 0; i < data['data']['data'][0].noteCheckLists.length; i++) {
          if (data['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checkList.push(data['data']['data'][0].noteCheckLists[i])
          }
        }

        if (this.noteDetails.questionAndAnswerNotes[0] != undefined) {
          this.message = this.noteDetails.questionAndAnswerNotes[0].message;
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;
          this.img == environment.profileUrl + this.noteDetails.questionAndAnswerNotes[0].user.imageUrl;
        }

        if (this.noteDetails.questionAndAnswerNotes != undefined) {
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;
          LoggerService.log('questionAnswerArray', this.questionAnswerArray)
        }

      })
  }

  closeQuestion() {
    this.router.navigate(['homepage/notes']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  askQuestion() {
    var content = {
      'message': this.qAsked.nativeElement.innerHTML,
      'notesId': this.noteId
    }
    this.quesService.askAQuestion(content).subscribe(data => {
      this.getNoteDetailsInQuestion();
      LoggerService.log('success in adding', data);
      this.message = data['data']['details'].message;
      this.getNoteDetailsInQuestion();
    })
  }

  like(value) {
    LoggerService.log(value);
    var content = {
      'like': true,
    }
    this.quesService.likeQnA(value, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetailsInQuestion();
        LoggerService.log('success in like', data);
      });
    this.getNoteDetailsInQuestion();
  }

  ratingAnswer(value, event) {
    var content = {
      'rate': event
    }
    this.quesService.rateAnswer(value.id, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetailsInQuestion();
        LoggerService.log('success in rating', data);
      })
  }

  leaveReply(value) {
    let content = {
      'message': this.replyMsg.nativeElement.innerHTML
    }
    LoggerService.log(content.message);
    LoggerService.log(value);
    this.quesService.replyQnA(value, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetailsInQuestion();
        LoggerService.log('success in replying', data);
      })
  }

  averageRating(rateArray) {
    this.value = 0;
    if (rateArray.length != 0) {
      for (let i = 0; i < rateArray.length; i++) {
        this.value += rateArray[i].rate
      }
      this.avgRate = this.value / rateArray.length;
      return this.avgRate;
    }
  }

}
