package com.backend.back.controller;

import com.backend.back.entity.Usuario;
import com.backend.back.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public List<Usuario> getAll() {
        return service.getAll();
    }

    @GetMapping("/{name}")
    public List<Usuario> getByName(@PathVariable String name) {
        return service.getByName(name);
    }

    @PostMapping
    public Usuario create(@RequestBody Usuario user) {
        return service.save(user, false);
    }

    @PutMapping
    public Usuario update(@RequestBody Usuario user) {
        return service.save(user, true);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable int id) {
        Usuario user = service.getById(id);
        service.delete(user);
        return new ResponseEntity(HttpStatus.OK);
    }
}
