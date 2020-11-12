package com.backend.back.entity;

import javax.persistence.*;

@Entity
@Table(name = "USUARIOS")
public class Usuario {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "seq_usr")
    @SequenceGenerator(name = "seq_usr", sequenceName = "seq_usr", allocationSize = 1)
    @Column(name = "id_usuario")
    private int idUsuario;
    private String nombre;
    private char activo;
    @ManyToOne
    @JoinColumn(name = "id_rol")
    private Rol rol;

    public Usuario() { }

    public Usuario(int idUsuario, String nombre, char activo, Rol rol) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.activo = activo;
        this.rol = rol;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public char getActivo() {
        return activo;
    }

    public void setActivo(char activo) {
        this.activo = activo;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }
}
