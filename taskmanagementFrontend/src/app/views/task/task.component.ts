import {Component, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TaskService} from '../../services/task.service';
import {DatePipe} from '@angular/common';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [DatePipe]
})
export class TaskComponent {

addTaskFormGrp=new FormGroup({
  id: new FormControl(null),
  title: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  dueDate: new FormControl('', [Validators.required]),
  taskStatus: new FormControl('inprocess', [Validators.required])
});

  errorMessage= ''
tableColumns = ['Task ID', 'Title', 'Description', 'Due Date', 'Status', 'Action'];
tableRows:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  loginUser: any = '';

  constructor(private _toastr: ToastrService, private _taskService: TaskService, private _authService:AuthService) {
    this.getAllTasks()
  }


  tableSearch($event: any) {
    console.log($event);
  }

  getAllTasks(){
    this._taskService.getAddTask().pipe().subscribe(task => {
      if (task) {
        this.tableRows.next(task);
      }
    })
  }

  AddTask() {
    if(this.addTaskFormGrp.valid){
      let req = {
        name: this.addTaskFormGrp.get('title')?.value ?? '',
        description: this.addTaskFormGrp.get('description')?.value ?? '',
        dueDate: this.addTaskFormGrp.get('dueDate')?.value ?? '',
        isCompleted: this.addTaskFormGrp.get('taskStatus')?.value == 'inprocess' ?? ''
      }
      this._taskService.addTask(req).pipe().subscribe((val:any)=>{
        let temrows:any = this.tableRows.value
        temrows.push(val)
        this.tableRows.next(temrows)
        this._toastr.success('Task successfully added!', 'Added Task');
        this.addTaskFormGrp.reset()
        }
      )
    }else{
      this._toastr.error('Please fill all the fields before adding task', '');
      // this.errorMessage = 'Please fill all the fields.';
    }
  }
  updateTask(){
    let req = {
      id: this.addTaskFormGrp.get('id')?.value ?? '',
      name: this.addTaskFormGrp.get('title')?.value ?? '',
      description: this.addTaskFormGrp.get('description')?.value ?? '',
      dueDate: this.addTaskFormGrp.get('dueDate')?.value ?? '',
      isCompleted: this.addTaskFormGrp.get('taskStatus')?.value == 'inprocess' ?? ''
    }
    this._taskService.updateTask(req,this.addTaskFormGrp.get('id')?.value).pipe().subscribe((val:any)=>{
      this.getAllTasks()
      this._toastr.info(`Task "${this.addTaskFormGrp.get('title')?.value}" successfully updated!`, 'Updated Task');
      this.addTaskFormGrp.reset()
    })
  }

  dateChange($event: any) {
    if($event)
   this.addTaskFormGrp.get('dueDate')?.patchValue($event.target.value) ;
  }

  editTask($event: any) {
    this.addTaskFormGrp.patchValue({
      id: $event.id,
      dueDate: $event['dueDate'],
      title: $event.name,
      taskStatus: $event.isCompleted ? 'inprocess' : 'completed',
      description: $event.description,
    })
  }

  deleteTask($event: any) {
    Swal.fire({
      title: `Delete ${$event.name}?`,
      text: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      }
    ).then((result) => {
      if (result.value) {
        this._taskService.deleteTask($event.id).pipe().subscribe((val:any)=>{
          console.log(val);
          this.getAllTasks()

        })
      }
    })


  }
}
