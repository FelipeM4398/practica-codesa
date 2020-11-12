import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Rol } from 'src/app/interfaces/rol.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ComunicadorService } from 'src/app/services/comunicador.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  isCreating: boolean = false;
  isEditing: boolean = false;
  userSelected: Usuario;
  roles: Rol[];

  userForm = this.fb.group({
    idUsuario: [{ value: '', disabled: true }],
    nombre: ['', Validators.required],
    activo: ['', Validators.required],
    rol: ['', Validators.required],
  });

  constructor(
    private comService: ComunicadorService,
    private fb: FormBuilder,
    private usrService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usrService.getRoles().subscribe((data) => {
      this.roles = data;
    });
    this.comService.isCreating$.subscribe((value: boolean) => {
      this.userForm.reset();
      this.isCreating = value;
      this.isEditing = false;
    });
    this.comService.isEditing$.subscribe((value: Usuario) => {
      this.isEditing = true;
      this.isCreating = false;
      this.userForm.setValue(value);
      this.rol.setValue(value.rol.idRol);
    });
    this.comService.isCleaning$.subscribe((value: boolean) => {
      this.userForm.reset();
      this.isCreating = false;
      this.isEditing = false;
    });
  }

  get nombre() {
    return this.userForm.get('nombre');
  }

  get rol() {
    return this.userForm.get('rol');
  }

  get activo() {
    return this.userForm.get('activo');
  }

  get user(): Usuario {
    return {
      idUsuario: this.userForm.get('idUsuario').value,
      nombre: this.nombre.value,
      activo: this.activo.value,
      rol: { idRol: this.rol.value, nombre: '' },
    };
  }

  showMessage(message: string, duration: number) {
    this._snackBar.open(message, 'Cerrar', {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  saveUser() {
    if (!this.userForm.invalid) {
      // Se subscribe al servicio de guardar usuario
      this.usrService.saveUser(this.user).subscribe(
        () => {
          this.showMessage('Guardado Exitosamente', 3000);
          this.usrService.getUsers().subscribe((users) => {
            // Se emite la lista actualizada
            this.comService.userList$.emit(users);
          });
          this.userForm.reset();
          this.isCreating = false;
        },
        (error) => {
          // En caso de error se informa
          if (
            error.error.message == 'Ya existe un usuario con el mismo nombre.'
          ) {
            this.showMessage(error.error.message, 5000);
          } else console.log(error.error);
        }
      );
    } else {
      //Marca todos los campos como invalidos
      this.userForm.markAllAsTouched();
    }
  }

  updateUser() {
    if (!this.userForm.invalid) {
      // Se subscribe al servicio de guardar usuario
      this.usrService.updateUser(this.user).subscribe(
        () => {
          this.showMessage('Actualizado Exitosamente', 3000);
          this.usrService.getUsers().subscribe((users) => {
            // Se emite la lista actualizada
            this.comService.userList$.emit(users);
          });
          this.userForm.reset();
          this.isEditing = false;
        },
        (error) => {
          // En caso de error se informa
          console.log(error.error);
        }
      );
    } else {
      //Marca todos los campos como invalidos
      this.userForm.markAllAsTouched();
    }
  }

  deleteUser() {
    this.usrService.deleteUser(this.userForm.get('idUsuario').value).subscribe(
      () => {
        this.showMessage('Eliminado Exitosamente', 3000);
        this.usrService.getUsers().subscribe((users) => {
          // Se emite la lista actualizada
          this.comService.userList$.emit(users);
        });
        this.userForm.reset();
        this.isEditing = false;
      },
      (error) => {
        // En caso de error se informa
        console.log(error.error);
      }
    );
  }
}
