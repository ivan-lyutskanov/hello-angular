import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // Delete from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Delete from server
    this.todoService.deleteTodo(todo).subscribe(() => {console.log('todo was deleted from server')});
  }

  addTodo(todo: {title: string, completed: boolean}) {
    this.todoService.addTodo(todo).subscribe((t: Todo) => {
      console.log(t);
      this.todos.push(t);
    });
  }

}
