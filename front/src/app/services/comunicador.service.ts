import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class ComunicadorService {
  isCreating$ = new EventEmitter<boolean>();
  isEditing$ = new EventEmitter<Usuario>();
  isCleaning$ = new EventEmitter<boolean>();

  userList$ = new EventEmitter<Usuario[]>();

  constructor() {}
}
