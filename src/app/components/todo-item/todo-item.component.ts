import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
    this.todoService.updateCompleted(this.todo).subscribe( t => {
      console.log(t);
    });
  }

  deleteItem() {
    this.deleteTodo.emit(this.todo);
  }

}
