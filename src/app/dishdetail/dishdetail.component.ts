import { Component, OnInit, Input} from '@angular/core';
import { digest } from '@angular/compiler/src/i18n/serializers/xmb';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})



export class DishdetailComponent implements OnInit {

  @Input()
  dish: Dish;

  constructor() { }

  ngOnInit() {
  }

}
