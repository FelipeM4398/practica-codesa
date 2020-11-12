package com.backend.back.controller;

import com.backend.back.entity.Rol;
import com.backend.back.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/roles")
public class RolController {

    @Autowired
    private RolService service;

    @GetMapping
    public List<Rol> getAll() {
        return service.getAll();
    }
}
