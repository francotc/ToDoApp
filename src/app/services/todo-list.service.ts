import { Injectable } from '@angular/core';
import { Tarea } from '../models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  tareas: Tarea[] = [];


  constructor() { }


  recuperarTareas() {
    if (localStorage.getItem('tareas')) {
      this.tareas = JSON.parse(localStorage.getItem('tareas'));
    }
  }
  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }


  addTask(texto: string) {
    if (texto) {
      this.tareas.push({ texto, estado: false });
      this.guardarTareas();
    }
  }

  editTask(index: number, texto: string) {
    if (texto) {
      this.tareas[index].texto = texto;
      this.guardarTareas();
    }
  }

  removeTask(index: number) {
    this.tareas.splice(index, 1);
    this.guardarTareas();
  }

  toggleTask(index: number) {
    this.tareas[index].estado = !this.tareas[index].estado;
    this.guardarTareas();
  }

  getTaskText(index: number) {
    return this.tareas[index].texto;
  }

}
