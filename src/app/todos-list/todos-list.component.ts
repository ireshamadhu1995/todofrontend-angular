import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  template: `
   <h2 class="text-center m-3">To-Do List</h2>
    <div class="text-end mb-3">
      <button class="btn btn-primary" [routerLink]="['new']">Add a New Todo</button>
    </div>
    <table class="table table-bordered">
        <thead>
            <tr>
            <th>Title</th>
                <!-- <th>Description</th> -->
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr *ngFor="let todo of todos$ | async" [ngClass]="{ 'completed-todo': todo.status }">
            <td>{{todo.title}}</td>
                <!-- <td>{{todo.description}}</td> -->
                <td>{{ todo.status ? 'completed' : 'pending' }}</td>
                <td>
                    <button class="btn btn-primary me-1" [routerLink]="['edit/', todo._id]">Edit</button>
                    <button class="btn btn-danger" (click)="deleteTodo(todo._id || '')">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
  `
})
export class TodosListComponent implements OnInit {
  todos$: Observable<Todo[]> = new Observable();

  constructor(private todosService: TodoService) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  deleteTodo(id: string): void {
    this.todosService.deleteTodo(id).subscribe({
      next: () => this.fetchTodos()
    });
  }

  private fetchTodos(): void {
    this.todos$ = this.todosService.getTodos();
  }
}

