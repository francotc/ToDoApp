import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Tarea } from 'src/app/models/tareas.model';
import { ModalAddTaskComponent } from '../modals/modal-add-task/modal-add-task.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  tareas: Tarea[] = [];
  modalRef: MdbModalRef<ModalAddTaskComponent> | null = null;



  constructor(
    private modalService: MdbModalService,
  ) { }

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
        this.openEdit(index, this.tareas[index].texto);
        break;
      case 'delete':
        this.tareas.splice(index, 1);
        this.guardarTareas();
        break;
      case 'toggle':
        this.tareas[index].estado = !this.tareas[index].estado;
        this.guardarTareas();
        break;
    }
  }

  openAdd() {
    this.modalRef = this.modalService.open(ModalAddTaskComponent, {
      modalClass: 'modal-frame modal-bottom',
    })
    this.modalRef.onClose.subscribe((texto: any) => {
      if (texto) {
        this.tareas.push({ texto, estado: false });
        this.guardarTareas();
      }
    });
  }
  openEdit(index: number, content: string) {
    this.modalRef = this.modalService.open(ModalAddTaskComponent, {
      data: { content },
      modalClass: 'modal-frame modal-bottom',
    })
    this.modalRef.onClose.subscribe((texto: any) => {
      if (texto) {
        this.tareas[index].texto = texto;
        this.guardarTareas();
      }
    });
  }

}
