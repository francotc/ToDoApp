import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarea } from '../models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  tareas: Tarea[] = [];

  private taskStats = new BehaviorSubject<any>({ pending: 0, completed: 0 });
  taskStats$ = this.taskStats.asObservable();


  constructor() { }


  recuperarTareas() {
    if (localStorage.getItem('tareas')) {
      this.tareas = JSON.parse(localStorage.getItem('tareas'));
      this.updateTaskStats();
    }
  }
  private guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
  private updateTaskStats() {
    const pending = this.tareas.filter(tarea => !tarea.estado).length;
    const completed = this.tareas.filter(tarea => tarea.estado).length;
    this.taskStats.next({ pending, completed });
  }
  private changeTask() {
    this.guardarTareas();
    this.updateTaskStats();
  }


  addTask(texto: string) {
    if (texto) {
      this.tareas.push({ texto, estado: false });
      this.changeTask();
    }
  }

  editTask(index: number, texto: string) {
    if (texto) {
      this.tareas[index].texto = texto;
      this.changeTask();
    }
  }

  removeTask(index: number) {
    this.tareas.splice(index, 1);
    this.changeTask();
  }

  toggleTask(index: number) {
    this.tareas[index].estado = !this.tareas[index].estado;
    this.changeTask();
  }

  getTaskText(index: number) {
    return this.tareas[index].texto;
  }

}
