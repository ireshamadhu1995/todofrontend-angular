import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  template: `
    <h2 class="text-center m-5">Add a New Todo</h2>
    <app-todo-form (formSubmitted)="addTodo($event)"></app-todo-form>
  `
})
export class AddTodoComponent {
  constructor(
    private router: Router,
    private todoService: TodoService
  ) { }

  addTodo(todo: Todo) {
    this.todoService.createTodo(todo)
      .subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          alert("Failed to create todo");
          console.error(error);
        }
      });
  }
}
