import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list-16';
}
