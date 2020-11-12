package com.backend.back.repository;

import com.backend.back.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    @Query("select u from Usuario u where u.nombre like %:nombre%")
    List<Usuario> findLikeName(@Param("nombre") String nombre);

    @Query("select u from Usuario u where u.nombre = :nombre")
    Optional<Usuario> findByName(@Param("nombre") String nombre);
}
