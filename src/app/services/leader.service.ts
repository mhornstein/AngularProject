import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => 
      // simulate server delay
      {setTimeout(() => resolve(LEADERS), 2000);});
  }

  getCorporateLeader(): Promise<Leader>{
    return new Promise(resolve => 
      // simulate server delay
      {setTimeout(() => resolve(LEADERS[3]), 2000);});
  }
}