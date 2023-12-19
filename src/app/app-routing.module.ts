import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component'; 
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodosListComponent },
  { path: 'todos/new', component: AddTodoComponent }, 
  { path: 'todos/edit/:id', component: EditTodoComponent }]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
