import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stats, Tarea } from '../models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  tareas: Tarea[] = [];

  private taskStats = new BehaviorSubject<Stats>({ pending: 0, completed: 0 });
  taskStats$ = this.taskStats.asObservable();


  constructor() { }


  recuperarTareas() {
    const localStorageData = localStorage.getItem('tareas');
    if (localStorageData) {
      this.tareas = JSON.parse(localStorageData);
      this.updateTaskStats();
    }
  }
  private guardarTareas() {
    const parsedData = JSON.stringify(this.tareas);
    console.log(parsedData);
    localStorage.setItem('tareas', parsedData);
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
