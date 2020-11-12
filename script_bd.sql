CREATE TABLE roles (
    id_rol   NUMBER PRIMARY KEY,
    nombre   VARCHAR2(25) NOT NULL
);

INSERT INTO roles (
    id_rol,
    nombre
) VALUES (
    1,
    'ADMINISTRADOR'
);

INSERT INTO roles (
    id_rol,
    nombre
) VALUES (
    2,
    'AUDITOR'
);

INSERT INTO roles (
    id_rol,
    nombre
) VALUES (
    3,
    'AUXILIAR'
);

CREATE TABLE usuarios (
    id_usuario   NUMBER PRIMARY KEY,
    nombre       VARCHAR2(25) NOT NULL,
    activo       CHAR(1) NOT NULL,
    id_rol       NUMBER NOT NULL
);

ALTER TABLE usuarios
    ADD CONSTRAINT fk_usr_rol FOREIGN KEY ( id_rol )
        REFERENCES roles ( id_rol );

CREATE SEQUENCE seq_usr START WITH 1 INCREMENT BY 1;

CREATE TRIGGER trig_usr BEFORE
    INSERT ON usuarios
    FOR EACH ROW
BEGIN
    SELECT
        seq_usr.NEXTVAL
    INTO :new.id_usuario
    FROM
        dual;

END;