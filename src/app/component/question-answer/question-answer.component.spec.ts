//utilities like TestBed and async to make testing asynchronous code, components, directives or services easier.
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionAnswerComponent } from './question-answer.component';
/*
describe blocks define a test suite and each it block is for an individual test
*/
describe('QuestionAnswerComponent', () => {
  let component: QuestionAnswerComponent;
  let fixture: ComponentFixture<QuestionAnswerComponent>;

/*
beforeEach runs before each test and is used for the setup part of a test. 
*/
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionAnswerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
it block is for an individual test
*/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('note should have title description ', async(()=>{
    expect(component.noteDetails.title).toEqual('note');
    expect(component.noteDetails.title).toBeTruthy();
    expect(component.noteDetails.description).toEqual('abcdefghi4567');
    expect(component.noteDetails.description).toBeTruthy();
  }));
  
  it('note should  title description not empty', async(()=>{
    expect(component.noteDetails.title).toEqual('');
    expect(component.noteDetails.title).toBeFalsy();
    expect(component.noteDetails.description).toEqual('');
    expect(component.noteDetails.description).toBeFalsy();
  }));

  it('question to be asked', () => {
    let content={
      "message": "what is architecture overview of angular",
      "notesId": "123abcd456ughtefg5678"
    }
        expect(component.askQuestion()).toBeTruthy();
        content = {
        "message": "",
        "notesId": ""
      }
        expect(component.askQuestion()).toBeFalsy();
      });
    
  
  it('to be liked', () => {
    let like=[{
      like:Boolean,
      userId:"123abcd456ughtefg5678"
    }]
    let content={
      like: like
    }
    expect(component.like(content)).toBeTruthy();
     like=[{
      like:null,
      userId:""
    }]
     content={
      like:null
    }
    expect(component.like(content)).toBeFalsy();
  });

   
  it('rating to be given', () => {
    let content = {
      id: "123abcd456ughtefg5678"
    }
    expect(component.ratingAnswer(content,event)).toBeTruthy();
    content = {
      id: ""
    }
    expect(component.ratingAnswer(content,event)).toBeFalsy();
  });

  it('reply to be given', () => {
    let ques = {
      id: "123abcd456ughtefg5678"
    }
    expect(component.replyQuestion(ques)).toBeTruthy();
    ques = {
      id: ""
    }
    expect(component.replyQuestion(ques)).toBeFalsy();
  });
 
});