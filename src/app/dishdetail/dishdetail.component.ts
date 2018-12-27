import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { digest } from '@angular/compiler/src/i18n/serializers/xmb';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { switchMap } from 'rxjs/operators';

import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishCopy: Dish;
  commentForm: FormGroup;
  @ViewChild('fform') commentFormDirective;
  errMess: string;

  dishIds: string[];
  prev: string;
  next: string;


  formErrors = {
    'author': '',
    'rating': '',
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'rating': {

    },
    'comment': {
      'required':      'comment is required.',
      'minlength':     'comment must be at least 2 characters long.'
    }
  };

  constructor( private dishService: DishService,
    private location: Location, private route: ActivatedRoute, private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      this.createForm();
      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged(); // (re)set form validation messages
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: ['', [Validators.required] ],
      comment: ['', [Validators.required, Validators.minLength(2)] ],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    const comment = this.commentForm.value;
    comment['date'] = new Date(Date.now()).toISOString();
    console.log(comment);
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
    this.commentFormDirective.resetForm();
    this.dishCopy.comments.push(comment);
    this.dishService.putDish(this.dishCopy)
      .subscribe(dish => {
        this.dish = dish; this.dishCopy = dish; },
        errmess => {this.dish  = null; this.dishCopy = null; this.errMess = <any>errmess; } );
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
}
