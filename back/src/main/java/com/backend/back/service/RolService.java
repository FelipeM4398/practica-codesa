package com.backend.back.service;

import com.backend.back.entity.Rol;
import com.backend.back.exception.Database;
import com.backend.back.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {

    @Autowired
    private RolRepository repository;

    /**
     * Retorna la lista de roles registrados en la base de datos
     * @return List<Rol>
     */
    public List<Rol> getAll() {
        try {
            return repository.findAll();
        } catch (Exception error) {
            throw new Database(error.getMessage());
        }
    }
}
