import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ComunicadorService } from 'src/app/services/comunicador.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'rol', 'activo'];
  dataSource: Usuario[];

  constructor(
    private comService: ComunicadorService,
    private usrService: UserService
  ) {}

  ngOnInit(): void {
    this.usrService.getUsers().subscribe((data) => {
      this.comService.userList$.emit(data);
    });
    this.comService.userList$.subscribe((users) => {
      this.dataSource = users;
    });
  }

  showUser(user: Usuario) {
    this.comService.isEditing$.emit(user);
  }

  createUser() {
    this.comService.isCreating$.emit(true);
  }
}
