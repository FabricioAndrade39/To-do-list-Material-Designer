import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoSignalsService } from './services/todo-signals.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from './models/model/todo.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalsService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [TodoSignalsService],
  });

  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  todoSignalsService = TestBed.inject(TodoSignalsService);
  fixture.detectChanges();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //Teste de @input()
  it('should set @input poperty correctly', () => {
    component.projectName = 'Testing Angular With Jest';
    fixture.detectChanges();
    expect(component.projectName).toEqual('Testing Angular With Jest');
  });

  //Teste de @output() e @input()
  it('should emit event with @output decorator correctly', () => {
    component.projectName = 'Testing my Angular Application';
  })

  //Teste de acionamento de serviço e de um signal
  it('should create new todo correctly and call service method', () => {
    jest.spyOn(todoSignalsService, 'updateTodos');
    const newTodo: Todo = {
      id: 1,
      title: 'Testing creating Todo',
      description: 'Test new Todo',
      done: true,
    };
    component.handleCreateTodo(newTodo);

    fixture.detectChanges();

    expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);
  })

  //Testes de elementos do DOM
  it("should not render paragraph in the DOM", () => {
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph).toBeNull();
  })

  it("should render paragraph correctly", () => {
    component.renderTestMessage = true;

    fixture.detectChanges();

    const componentDebugElemnt: DebugElement = fixture.debugElement;
    const paragraphDebugElement = componentDebugElemnt.query(By.css('p'));
    const paragraph: HTMLElement = paragraphDebugElement.nativeElement;

    expect(paragraph.textContent).toEqual("Test your Angular application");
  })

  //Teste de setTimeOut()
  it("should isDoned property to be false", () => {
    component.handleCheckIsDone();

    expect(component.isDoned).toBe(false);
  })

  it("should isDoned property to be true", fakeAsync(() => {
    component.handleCheckIsDone();
    tick(200);

    expect(component.isDoned).toBe(true);
  }))

});
