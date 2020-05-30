import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable()

export class ValueMasterService {

  constructor(private valueService: ValueService) { }

    getValue() { return this.valueService.getValue(); }
}
