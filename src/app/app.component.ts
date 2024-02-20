import { TodoSignalsService } from './services/todo-signals.service';
import { Component, EventEmitter, Input, Output, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { HeaderComponent } from './components/header/header.component';
import { Todo } from './models/model/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>;

  public title = 'todo-list-16';
  public todoSignal!: WritableSignal<Todo[]>;

  constructor(private todoSignalsService : TodoSignalsService) {}

  public handleEmitEvent(): void {
    this.outputEvent.emit();
  }

  public handleCreateTodo(todo : Todo): void {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todosState;
    }
  }
}
