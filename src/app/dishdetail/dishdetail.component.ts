import { Component, OnInit} from '@angular/core';
import { digest } from '@angular/compiler/src/i18n/serializers/xmb';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})



export class DishdetailComponent implements OnInit {
  dish: Dish;

  constructor( private dishService: DishService,
    private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.dishService.getDish(id).then(dish => this.dish);
    debugger
  }

  goBack(): void {
    this.location.back();
  }

}
