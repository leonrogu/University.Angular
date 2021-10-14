import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/domain/student';
import { StudentService } from 'src/app/service/student.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent implements OnInit {

  public id: number = 0;
  public student: Student = new Student(0, '', '', new Date(), '');
  //public student!: Student;

  public showMsg: boolean = false;
  public msg: string = '';
  public type: string = '';
  
  

  constructor (public studentService: StudentService,
    public router: Router,
    public activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getById(); 
  }

  getById(){
    let param = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = Number(param);

    this.studentService.getById(this.id).subscribe(data => {
      this.student= data;
    })
  }

  public delete(){

    this.studentService.delete(this.student.ID).subscribe(data => {      
      this.router.navigate(['student-list']);
    }, error => {
      this.showMsg = true;
      this.msg = error;
      this.type =  'danger';
    });
  }

}
