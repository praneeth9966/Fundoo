import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        BrowserModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
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

  it('form should be invalid', async(() => {
    expect(component.body.email).toEqual('plainaddress');
    expect(component.body.email).toEqual('#@%^%#$@#$@#.com');
    expect(component.body.email).toEqual('@domain.com');
    expect(component.body.email).toEqual('Joe Smith <email@domain.com>');
    expect(component.body.email).toEqual('email.domain.com');
    expect(component.body.email).toEqual('“email”@domain.com');
    expect(component.body.password).toEqual('');
    expect(component.body.password).toEqual('a');
    expect(component.body.password).toEqual('ah');
    expect(component.body.password).toEqual('aaaaaaaaaaaaa');
    expect(component.body.password).toEqual('aaaaaaaaaaaaaaaaaaa858578');
    expect(component.body.email).toBeFalsy();
    expect(component.body.password).toBeFalsy();
  }))

  it('form should be valid', async(() => {
    expect(component.body.email).toEqual('email@domain.com');
    expect(component.body.email).toEqual('firstname.lastname@domain.com');
    expect(component.body.email).toEqual('email@subdomain.domain.com');
    expect(component.body.email).toEqual('firstname+lastname@domain.com');
    expect(component.body.email).toEqual('email@123.123.123.123');
    expect(component.body.email).toEqual('“email”@domain.com');
    expect(component.body.password).toEqual('akm123');
    expect(component.body.password).toEqual('12345bunny');
    expect(component.body.password).toEqual('praneeth');
    expect(component.body.email).toBeTruthy();
    expect(component.body.password).toBeTruthy();
  }))

});