import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(readonly HttpClient: HttpClient) { }
  getAddTask(){
    return this.HttpClient.get<any[]>('api/tasks')
  }
  addTask(valueTask:any){
    return this.HttpClient.post('api/tasks', valueTask);
  }
  updateTask(valueTask:any,id:any){
    return this.HttpClient.put('api/tasks/'+id, valueTask);
  }
  deleteTask(id:any){
    return this.HttpClient.delete('api/tasks/'+id);
  }

}
