import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveIconComponent } from './archive-icon.component';

describe('ArchiveIconComponent', () => {
  let component: ArchiveIconComponent;
  let fixture: ComponentFixture<ArchiveIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should unarchive', async(()=>{
    expect(component.body['isArchived']).toEqual(false)
    expect(component.body['isArchived']).toBeTruthy();
  }));
  it('should not unarchive', async(()=>{
    expect(component.body['isArchived']).toEqual(true)
    expect(component.body['isArchived']).toBeFalsy();
  }));
});
