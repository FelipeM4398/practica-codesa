import { Component, OnInit } from '@angular/core';
import { ComunicadorService } from 'src/app/services/comunicador.service';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  search = new FormControl();

  constructor(
    private comService: ComunicadorService,
    private usrService: UserService
  ) {}

  ngOnInit(): void {}

  cleanFields() {
    this.comService.isCleaning$.emit();
    this.search.reset();
    this.emitUsers();
  }

  searchUsers() {
    if (this.search.value != null && this.search.value != '') {
      this.usrService.getUsersByName(this.search.value).subscribe((users) => {
        //Se emite la lista filtrada
        this.comService.userList$.emit(users);
      });
    } else {
      this.emitUsers();
    }
  }

  emitUsers() {
    this.usrService.getUsers().subscribe((users) => {
      this.comService.userList$.emit(users);
    });
  }
}
