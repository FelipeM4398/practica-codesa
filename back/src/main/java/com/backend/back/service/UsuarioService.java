package com.backend.back.service;

import com.backend.back.entity.Usuario;
import com.backend.back.exception.AlreadyExists;
import com.backend.back.exception.Database;
import com.backend.back.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    public UsuarioRepository repository;

    /**
     * Retorna la lista de usuarios registrados en la base de datos
     * @return List<Usuario>
     */
    public List<Usuario> getAll() {
        try {
            return repository.findAll();
        } catch (Exception error) {
            throw new Database(error.getMessage());
        }
    }

    /**
     * Retorna una lista de usuarios filtrados por el nombre
     * @param name
     * @return List<Usuario>
     */
    public List<Usuario> getByName(String name) {
        try {
            return repository.findLikeName(name);
        } catch (Exception error) {
            throw new Database(error.getMessage());
        }
    }

    /**
     * Retorna un usuario filtrado por el id
     * @param id
     * @return Usuario
     */
    public Usuario getById(int id) {
        try {
            return repository.findById(id).get();
        } catch (Exception error) {
            throw new Database(error.getMessage());
        }
    }

    /**
     * Valida si el nombre ya se encuentra registrado en la base de datos
     * @param name
     * @return boolean
     */
    public boolean existName(String name) {
        try {
            return repository.findByName(name).isPresent();
        } catch (Exception error) {
            throw new Database(error.getMessage());
        }
    }

    /**
     * Registra o actualiza un usuario en la base de datos
     * @param user
     * @param isEditing
     * @return Usuario
     */
    public Usuario save(Usuario user, boolean isEditing) {
        if (existName(user.getNombre()) && !isEditing) {
            throw new AlreadyExists("Ya existe un usuario con el mismo nombre.");
        }
        try {
            return repository.save(user);
        } catch (Exception error) {
            throw new Database(error.getMessage());
        }
    }

    /**
     * Elimina un usuario de la base de datos
     * @param user
     */
    public void delete(Usuario user) {
        try {
            repository.delete(user);
        } catch (Exception error) {
            throw new Database(error.getMessage());
        }
    }
}
