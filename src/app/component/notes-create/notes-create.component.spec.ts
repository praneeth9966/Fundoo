import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCreateComponent } from './notes-create.component';

describe('NotesCreateComponent', () => {
  let component: NotesCreateComponent;
  let fixture: ComponentFixture<NotesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create note', async(()=>{
    expect(component.body.title).toEqual('note');
    expect(component.body.title).toBeTruthy();
    expect(component.body.description).toEqual('abcdefghi4567');
    expect(component.body.description).toBeTruthy();
  }));
  
  it('should not create/add note', async(()=>{
    expect(component.body.title).toEqual('');
    expect(component.body.title).toBeFalsy();
    expect(component.body.description).toEqual('');
    expect(component.body.description).toBeFalsy();
  }));
});
