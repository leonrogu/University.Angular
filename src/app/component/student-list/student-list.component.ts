import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import {Student} from 'src/app/domain/student';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  public students: Student[] = [];
  public subStudents: Subscription = new Subscription();

  constructor (public studentService: StudentService){}

  ngOnDestroy(): void {
    this.subStudents.unsubscribe();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll () {
    this.subStudents = this.studentService.getAll().subscribe(data => {
      this.students = data;
    })

  }

}
