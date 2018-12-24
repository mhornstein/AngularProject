import { Component, OnInit} from '@angular/core';
import { digest } from '@angular/compiler/src/i18n/serializers/xmb';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';

import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  dish: Dish;
  commentForm: FormGroup;
  comment: Comment;

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
    private location: Location, private route: ActivatedRoute, private fb: FormBuilder) {
      this.createForm();
      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged(); // (re)set form validation messages
    }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.dishService.getDish(id).subscribe(dish => this.dish = dish);
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

  }
}
