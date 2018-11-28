import { TestBed } from '@angular/core/testing';

import { QuestionanswerService } from './questionanswer.service';

describe('QuestionanswerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionanswerService = TestBed.get(QuestionanswerService);
    expect(service).toBeTruthy();
  });
});
