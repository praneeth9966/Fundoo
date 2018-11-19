// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ LoginComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });



import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de = DebugElement;
  let el = HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        BrowserModule]
    })
      .compileComponents().then(()=>{
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        this.de= fixture.debugElement.query(By.css('form'));
        this.el=this.de.nativeElement;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid', async(()=>{
      expect(component.body.email).toEqual('');
      expect(component.body.email).toEqual('@bb.AA.com');
      expect(component.body.email).toEqual('AA.23@bbb.com');
      expect(component.body.password).toEqual('');
      expect(component.body.password).toEqual('ak');
      expect(component.body.password).toEqual('aaaaaaaaaaaaaaaaaaa');
      expect(component.body.password).toEqual('aaaaaaaaaaaaaaaaaaa858578');
     
      expect(component.body.email).toBeFalsy();
      expect(component.body.password).toBeFalsy();
  }))
  it('form should be valid', async(()=>{
    expect(component.body.email).toEqual('aass@bbbb.com');
    expect(component.body.password).toEqual('akm123');
    expect(component.body.password).toEqual('Akm@12345');
    expect(component.body.email).toBeTruthy();
      expect(component.body.password).toBeTruthy();

  }))
});