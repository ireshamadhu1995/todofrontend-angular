import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-edit-todo.component.ts',
  template: `
    <h2 class="text-center m-5">Edit an Todo</h2>
    <app-todo-form [initialState]="todo" (formSubmitted)="editTodo($event)"></app-todo-form>
  `
})
export class EditTodoComponent implements OnInit {
  todo: BehaviorSubject<Todo> = new BehaviorSubject<Todo>({} as Todo);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.todoService.getTodo(id !).subscribe((todo) => {
      this.todo.next(todo);
    });
  }

  editTodo(todo: Todo) {
    this.todoService.updateTodo(this.todo.value._id || '', todo)
      .subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          alert('Failed to update todo');
          console.error(error);
        }
      })
  }
}
