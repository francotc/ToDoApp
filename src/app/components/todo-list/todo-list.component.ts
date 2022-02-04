import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tareas.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  tareas: Tarea[] = [];
  constructor() { }

  ngOnInit(): void {
    this.recuperarTareas();
  }


  recuperarTareas() {
    if (localStorage.getItem('tareas')) {
      this.tareas = JSON.parse(localStorage.getItem('tareas'));
    }
  }
  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }


  modifyTarea(accion: string, index: number) {
    switch (accion) {
      case 'edit':
        // this.tareas[index].editing = true;
        break;
      case 'delete':
        this.tareas.splice(index, 1);
        // this.guardarTareas();
        break;
      case 'toggle':
        this.tareas[index].estado = !this.tareas[index].estado;
        // this.guardarTareas();
        break;
    }
  }

  openModal() {

  }

}
