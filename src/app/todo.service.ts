import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = 'https://localhost:7281/api';
  private todos$: Subject<Todo[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshTodos() {
    this.httpClient.get<Todo[]>(`${this.url}/todos`)
      .subscribe(todos => {
        this.todos$.next(todos);
      });
  }

  getTodos(): Subject<Todo[]> {
    this.refreshTodos();
    return this.todos$;
  }

  getTodo(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(`${this.url}/todos/${id}`);
  }

  createTodo(todo: Todo): Observable<string> {
    return this.httpClient.post(`${this.url}/todos`, todo, { responseType: 'text' });
  }

  updateTodo(id: string, todo: Todo): Observable<string> {
    return this.httpClient.put(`${this.url}/todos/${id}`, todo, { responseType: 'text' });
  }

  deleteTodo(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/todos/${id}`, { responseType: 'text' });
  }
}
