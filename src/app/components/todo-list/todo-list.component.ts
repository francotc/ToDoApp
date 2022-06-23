import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TodoListService } from 'src/app/services/todo-list.service';
import { ModalAddTaskComponent } from '../modals/modal-add-task/modal-add-task.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  modalRef: MdbModalRef<ModalAddTaskComponent> | null = null;

  taskStats = this.todoListService.taskStats$;

  constructor(
    private modalService: MdbModalService,
    private todoListService: TodoListService,
  ) { }

  ngOnInit(): void {
    this.todoListService.recuperarTareas();

    this.taskStats.subscribe(stats => {
      console.log(stats);
    });
  }

  modifyTarea(accion: string, index: number) {
    switch (accion) {
      case 'edit':
        this.openEdit(index);
        break;
      case 'delete':
        this.todoListService.removeTask(index);
        break;
      case 'toggle':
        this.todoListService.toggleTask(index);
        break;
    }
  }

  openAdd() {
    this.modalRef = this.modalService.open(ModalAddTaskComponent, {
      modalClass: 'modal-frame modal-bottom',
    })
    this.modalRef.onClose.subscribe((texto: any) => {
      this.todoListService.addTask(texto);
    });
  }
  openEdit(index: number) {
    const content = this.todoListService.getTaskText(index);
    this.modalRef = this.modalService.open(ModalAddTaskComponent, {
      data: { content },
      modalClass: 'modal-frame modal-bottom',
    })
    this.modalRef.onClose.subscribe((texto: any) => {
      this.todoListService.editTask(index, texto);
    });
  }

  get tareas() {
    return this.todoListService.tareas;
  }
  get taskStats$() {
    return this.todoListService.taskStats$;
  }

}
