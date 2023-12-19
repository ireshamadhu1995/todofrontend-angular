import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../todo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  template: `
    <form class="todo-form" autocomplete="off" [formGroup]="todoForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="title" placeholder="title" required>
        <label for="title">Title</label>
      </div>

      <div *ngIf="title.invalid && (title.dirty || title.touched)" class="alert alert-danger">
        <div *ngIf="title.errors?.['required']">
          Title is required.
        </div>
        <div *ngIf="title.errors?.['minlength']">
          Title must be at least 5 characters long.
        </div>
      </div>

      <div class="mb-3">
      <label for="description">Description</label>
        <textarea class="form-control" type="text" formControlName="description" placeholder="description" rows="6" required></textarea>
      </div>

      <div *ngIf="description.invalid && (description.dirty || description.touched)" class="alert alert-danger">

        <div *ngIf="description.errors?.['required']">
        description is required.
        </div>
        <div *ngIf="description.errors?.['minlength']">
        description must be at least 10 characters long.
        </div>
      </div>

      <div class="mb-3" *ngIf="!isNewTodo()">
        <div class="form-check">
        <input class="form-check-input" type="checkbox" formControlName="status" id="status-completed">
    <label class="form-check-label" for="status-completed">Completed</label>
        </div>
      </div>

      <div class="text-end mb-3">
      <button class="btn btn-secondary" type="button" (click)="cancelForm()">Cancel</button>
      <span style="margin-right: 10px;"></span>
      <button class="btn btn-primary" type="submit" [disabled]="todoForm.invalid" *ngIf="isNewTodo()">Add</button>
      <button class="btn btn-primary" type="submit" [disabled]="todoForm.invalid" *ngIf="!isNewTodo()">Update</button>
    </div>
    </form>
  `,
  styles: [
    `.todo-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})
export class TodoFormComponent implements OnInit {
  isNewTodo(): boolean {
    return !this.initialState.value._id;
  }
  @Input()
  initialState: BehaviorSubject<Todo> = new BehaviorSubject<Todo>({} as Todo);
  @Output()
  formValuesChanged = new EventEmitter<Todo>();

  @Output()
  formSubmitted = new EventEmitter<Todo>();

  todoForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    ) { }

  get title() { return this.todoForm.get('title')!; }
  get description() { return this.todoForm.get('description')!; }
  get status() { return this.todoForm.get('status')!; }

  ngOnInit() {
    this.initialState.subscribe(todo => {
      this.todoForm = this.fb.group({
        title: [ todo.title, [Validators.required, Validators.minLength(5) ] ],
        description: [ todo.description, [ Validators.required, Validators.minLength(10) ] ],
        status: [ todo.status?todo.status: false, Validators.required ]
      });
    });

    this.todoForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.todoForm.value);
  }
  cancelForm() {
    this.router.navigate(['/todos']);
  }

}
