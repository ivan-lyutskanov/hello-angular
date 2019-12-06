import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);

    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.spinner.hide();
    });
  }

  deleteTodo(todo: Todo) {
    // Delete from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Delete from server
    this.todoService.deleteTodo(todo).subscribe(() => {console.log('todo was deleted from server')});
  }

  addTodo(todo: {title: string, completed: boolean}) {
    this.spinner.show();
    this.todoService.addTodo(todo).subscribe((t: Todo) => {
      console.log(t);
      this.todos.push(t);
      this.spinner.hide();
    });
  }

}
