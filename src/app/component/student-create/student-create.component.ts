import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/domain/student';
import { StudentService } from 'src/app/service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  public student: Student = new Student(0, '', '', new Date(), '');
  //public student!: Student;

  public showMsg: boolean = false;
  public msg: string = '';
  public type: string = '';
  
  

  constructor (public studentService: StudentService,
    public router: Router){}

  ngOnInit(): void {
  }

  public create(){
    if(this.student.LastName === ''){
      this.showMsg = true;
      this.msg = 'The field Last Name is required';
      this.type =  'warning';
      return;
    }

    this.studentService.create(this.student).subscribe(data => {      
      this.router.navigate(['student-list']);
    }, error => {
      this.showMsg = true;
      this.msg = error;
      this.type =  'danger';
    });
  }

}
