import { SchoolData, SchoolService } from './services/school.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { HeaderComponent } from './components/header/header.component';
import { Observable, filter, from, map, of, pipe, switchMap, zip } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public title = 'todo-list-16';
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  private zipSchoolResponses$ = zip(
    this.getStudentsDatas(),
    this.getTeachersDatas(),
  );

  private ages = of(20, 30, 40, 50, 60, 70);
  private peopleDatas = from([
    {name: 'Fabrício Lacerda', age: 40, profession: 'Software Deleloper'},
    {name: 'Manuela Andrade', age: 19, profession: 'UX Designer'},
    {name: 'Shirley Andrade', age: 25, profession: 'Scrum Master'},
    {name: 'Sebastião', age: 50, profession: 'Software Deleloper'},
    {name: 'Carla', age: 30, profession: 'Software Deleloper'},
  ]);
  private studentUserId = '2';

    constructor (private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.getSchoolDatas();
    this.getMultipliedAges();
    this.getPeopleProfessions();
    this.getSoftwareDeveloperNames();
    this.handleFindStudentsById();
  }

  public handleFindStudentsById(): void {
    this.getStudentsDatas().pipe(
      switchMap((students) => this.findStudentsById(students, this.studentUserId))
    ).subscribe({
      next: (response) => console.log('RETORNO ESTUDANTE FILTRADO', response),
    });
  }

  public findStudentsById(students: Array<SchoolData>, userId: string) {
    return of([students.find((student) => student.id === userId)]);
  }

  public getMultipliedAges(): void {
    this.ages.pipe(map((age) => age * age))
    .subscribe({
      next: (response) => console.log('IDADE MULTIPLICADA', response),
    });
  }

  public getPeopleProfessions(): void {
    this.peopleDatas.pipe(map((people) => people.profession))
    .subscribe({
      next: (response) => console.log('PROFISSÃO', response),
    });
  }

  public getSoftwareDeveloperNames(): void {
    this.peopleDatas
      .pipe(
        filter((people) => people.profession === 'Software Deleloper'),
        map((people) => people.name)
      )
    .subscribe({
      next: (response) => console.log('NOME DO DESENVOLVEDOR', response),
    });
  }

  public getSchoolDatas(): void {
    this.zipSchoolResponses$.subscribe({
      next: (response) => {
        console.log('STUDENTS', response[0]);
        console.log('TEACHERS', response[1]);
      },
    });
  }

  getStudentsDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudentes();
  }

  getTeachersDatas(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }

}
