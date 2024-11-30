-- Crear tabla Estudiantes
CREATE TABLE Estudiantes (
    cod_e INT AUTO_INCREMENT PRIMARY KEY,
    nom_e VARCHAR(100) NOT NULL,
    dir_e VARCHAR(255),
    tel_e VARCHAR(15),
    fech_nac DATE
);

-- Crear tabla Profesores
CREATE TABLE Profesores (
    id_p INT AUTO_INCREMENT PRIMARY KEY,
    nom_p VARCHAR(100) NOT NULL,
    dir_p VARCHAR(255),
    tel_p VARCHAR(15),
    profesion VARCHAR(100)
);

-- Crear tabla Asignaturas
CREATE TABLE Asignaturas (
    cod_a INT AUTO_INCREMENT PRIMARY KEY,
    nom_a VARCHAR(100) NOT NULL,
    int_h INT NOT NULL,
    creditos INT NOT NULL
);

//*-- Crear tabla Imparte
CREATE TABLE Imparte (
    id_p INT,
    cod_a INT,
    grupo VARCHAR(50),
    horario VARCHAR(100),
    PRIMARY KEY (id_p, cod_a),
    FOREIGN KEY (id_p) REFERENCES Profesores(id_p),
    FOREIGN KEY (cod_a) REFERENCES Asignaturas(cod_a)
);

-- Crear tabla Inscribe
CREATE TABLE Inscribe (
    cod_e INT,
    cod_a INT,
    id_p INT,
    grupo VARCHAR(50),
    n1 FLOAT DEFAULT 0.0,
    n2 FLOAT DEFAULT 0.0,
    n3 FLOAT DEFAULT 0.0,
    PRIMARY KEY (cod_e, cod_a, id_p),
    FOREIGN KEY (cod_e) REFERENCES Estudiantes(cod_e),
    FOREIGN KEY (cod_a) REFERENCES Asignaturas(cod_a),
    FOREIGN KEY (id_p) REFERENCES Profesores(id_p)
);
*//
-- Insertar datos en la tabla Estudiantes
INSERT INTO Estudiantes (nom_e, dir_e, tel_e, fech_nac) VALUES
('Carlos Pérez', 'Calle 123, Ciudad A', '123456789', '2002-03-15'),
('Ana Gómez', 'Av. Siempre Viva 742, Ciudad B', '987654321', '2001-11-20'),
('Luis Fernández', 'Barrio Central 45, Ciudad C', '456789123', '2003-06-10'),
('María López', 'Callejón Solitario 12, Ciudad A', '321654987', '2000-07-05'),
('José Martínez', 'Av. Libertad 34, Ciudad B', '789123456', '1999-12-01'),
('Lucía Díaz', 'Calle 9, Ciudad D', '654321987', '2004-02-18'),
('Pedro Ramírez', 'Urbanización Verde, Ciudad E', '147852369', '2002-09-25'),
('Laura Torres', 'Centro Histórico 67, Ciudad F', '258369147', '2001-08-14'),
('Juan Méndez', 'Sector Oeste 90, Ciudad A', '369258147', '2000-03-30'),
('Sofía Moreno', 'Residencial Amanecer, Ciudad G', '741852963', '2003-11-12');

-- Insertar datos en la tabla Profesores
INSERT INTO Profesores (nom_p, dir_p, tel_p, profesion) VALUES
('David Sánchez', 'Calle Profesor 1, Ciudad H', '963852741', 'Matemático'),
('Marta Ortiz', 'Av. Principal 8, Ciudad I', '852741963', 'Físico'),
('Jorge Ruiz', 'Urbanización Jardines, Ciudad J', '741963852', 'Químico'),
('Elena Castro', 'Calle Verde 12, Ciudad K', '369147258', 'Ingeniera'),
('Fernando Vega', 'Av. Tecnológica 23, Ciudad L', '258147369', 'Biólogo'),
('Clara Gutiérrez', 'Residencial Norte 45, Ciudad M', '987321654', 'Historiadora'),
('Andrés Morales', 'Callejón Real 78, Ciudad N', '123987456', 'Economista'),
('Sofía Herrera', 'Sector Sur 11, Ciudad O', '654789321', 'Filósofa'),
('Raúl Peña', 'Centro Urbano 56, Ciudad P', '321456789', 'Lingüista'),
('Isabel Navarro', 'Calle Larga 91, Ciudad Q', '456123789', 'Programadora');

-- Insertar datos en la tabla Asignaturas
INSERT INTO Asignaturas (nom_a, int_h, creditos) VALUES
('Matemáticas I', 40, 4),
('Física General', 45, 3),
('Química Orgánica', 50, 4),
('Historia Contemporánea', 30, 2),
('Economía Básica', 35, 3),
('Biología Molecular', 60, 5),
('Filosofía Moderna', 25, 2),
('Programación Avanzada', 70, 5),
('Lingüística Aplicada', 20, 2),
('Ingeniería de Software', 55, 4);

//*-- Insertar datos en la tabla Imparte
INSERT INTO Imparte (id_p, cod_a, grupo, horario) VALUES
(1, 1, 'A', 'Lunes y Miércoles 8:00-10:00'),
(2, 2, 'B', 'Martes y Jueves 10:00-12:00'),
(3, 3, 'A', 'Viernes 14:00-18:00'),
(4, 4, 'C', 'Lunes 8:00-12:00'),
(5, 5, 'A', 'Martes y Jueves 14:00-16:00'),
(6, 6, 'B', 'Miércoles y Viernes 16:00-18:00'),
(7, 7, 'A', 'Lunes 10:00-12:00'),
(8, 8, 'B', 'Martes y Jueves 8:00-10:00'),
(9, 9, 'A', 'Viernes 12:00-16:00'),
(10, 10, 'C', 'Lunes y Miércoles 14:00-16:00');

-- Insertar datos en la tabla Inscribe
INSERT INTO Inscribe (cod_e, cod_a, id_p, grupo, n1, n2, n3) VALUES
(1, 1, 1, 'A', 8.5, 9.0, 7.5),
(2, 2, 2, 'B', 7.0, 6.5, 8.0),
(3, 3, 3, 'A', 9.0, 8.5, 9.5),
(4, 4, 4, 'C', 6.0, 7.5, 7.0),
(5, 5, 5, 'A', 8.0, 8.5, 8.0),
(6, 6, 6, 'B', 7.5, 7.0, 8.5),
(7, 7, 7, 'A', 9.5, 9.0, 8.5),
(8, 8, 8, 'B', 7.0, 7.5, 6.5),
(9, 9, 9, 'A', 8.5, 9.0, 7.5),
(10, 10, 10, 'C', 7.5, 8.0, 8.5);
*//