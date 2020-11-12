package com.backend.back.entity;

import javax.persistence.*;

@Entity
@Table(name = "ROLES")
public class Rol {
    @Id
    @Column(name = "id_rol")
    private int idRol;
    private String nombre;

    public Rol() { }

    public Rol(int idRol, String nombre) {
        this.idRol = idRol;
        this.nombre = nombre;
    }

    public int getIdRol() {
        return idRol;
    }

    public String getNombre() {
        return nombre;
    }
}
