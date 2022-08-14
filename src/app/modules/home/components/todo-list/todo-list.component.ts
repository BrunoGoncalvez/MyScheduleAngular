import { Component, DoCheck, OnInit } from '@angular/core';

// Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || "[]");

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public setEmitTaskList(event: string){
    console.log(event);
    this.taskList.push({task:event, checked: false});
  }

  public deleteItemTaskList(index:number){
    this.taskList.splice(index, 1);
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Você tem certeza que deseja deletar todas tarefas?");

    if(confirm){
     this.taskList = [];
    }
  }

  public validationInput(event:string, index:number){
    if(!event.length){
      const confirm = window.confirm("Task está vazia. Deseja deletar?");
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

}
