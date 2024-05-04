import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  isLoading = new Subject<boolean>();

  constructor() { }
}
