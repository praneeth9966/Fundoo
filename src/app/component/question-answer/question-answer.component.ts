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
  @ViewChild("questionEntered") public questionText: ElementRef;
  @ViewChild("replyEntered") public replyText: ElementRef;
  content: { "message": string; };

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
  private img1;
  private questionAnswerArray;
  private hide = false;
  private open = true;
  private close = true;
  private starRating;
  private averageRate;
  replyQuestion;
  private noOfReply;

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
        this.img = environment.profileUrl;
        this.noteDetails = data['data'].data[0];
        this.noteTitle = this.noteDetails.title;
        this.noteDescription = this.noteDetails.description;
        this.noteColor = this.noteDetails.color;

        for (var i = 0; i < data['data']['data'][0].noteCheckLists.length; i++) {
          if (data['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checkList.push(data['data']['data'][0].noteCheckLists[i])
          }
        }

        if (this.noteDetails.questionAndAnswerNotes[0] != undefined) {
          this.message = this.noteDetails.questionAndAnswerNotes[0].message;
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;
          this.img1 = environment.profileUrl + this.noteDetails.questionAndAnswerNotes[0].user.imageUrl

        }
        if (this.noteDetails.questionAndAnswerNotes != undefined) {
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;

          LoggerService.log('questionArray', this.questionAnswerArray)
        }
      })
  }
  closeQuestion() {
    this.router.navigate(['home/notes']);
  }

  /******************************Asking a question ********************************************* */

  askQuestion() {
    console.log(this.questionText.nativeElement.innerHTML);

    var content = {
      'message': this.questionText.nativeElement.innerHTML,
      'notesId': this.noteId
    }
    this.quesService.askAQuestion(content).subscribe(data => {
      this.getNoteDetailsInQuestion();
      LoggerService.log('success in adding', data);
      this.message = data['data']['details'].message;
    })
  }
  /******************************Give the likes to question or reply********************************************* */

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
  }
  /******************************Give the Rating  to question or reply********************************************* */

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
  /******************************Give the Rating Average to question or reply********************************************* */

  ratingAverage(ratingGiven) {
    this.starRating = 0;
    if (ratingGiven.length != 0) {
      for (let i = 0; i < ratingGiven.length; i++) {
        this.starRating += ratingGiven[i].rate
      }
      this.averageRate = this.starRating / ratingGiven.length;
      let avg = this.averageRate.toFixed(1);
      return avg;
    }

  }
  /******************************Give the Replies to question or reply********************************************* */

  leaveReply(replyId) {
    let replySend = this.replyText.nativeElement.innerHTML;
    LoggerService.log('msgggg', replySend);
    let content = {
      'message': replySend
    }
    LoggerService.log(replyId);
    this.quesService.replyQnA(replyId, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetailsInQuestion();
        LoggerService.log('success in replying', data);

      })
    // this.replyText='';
  }
  /******************************Count the number of Replies to display********************************************* */
  numberOfReplies(array) {
    this.noOfReply = 0;
    for (let i = 0; i < this.questionAnswerArray.length; i++) {
      if (array.id == this.questionAnswerArray[i].parentId) {
        this.noOfReply++;
      }
    }
    return this.noOfReply;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}