import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  corporateLeader: Leader;

  constructor(private dishService: DishService, 
    private promituinService: PromotionService,
    private leaderService: LeaderService) { }

  ngOnInit() {
    this.dishService.getFeaturedDish().then(dish => this.dish = dish);
    this.promituinService.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    this.leaderService.getCorporateLeader().then(corporateLeader => this.corporateLeader = corporateLeader);
  }

}
