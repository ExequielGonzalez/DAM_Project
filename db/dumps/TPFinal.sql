-- MySQL Script generated by MySQL Workbench
-- Thu Sep 26 12:08:58 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DAM
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DAM
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DAM` DEFAULT CHARACTER SET utf8 ;
USE `DAM` ;

-- -----------------------------------------------------
-- Table `DAM`.`Electrovalvulas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DAM`.`Electrovalvulas` ;

CREATE TABLE IF NOT EXISTS `DAM`.`Electrovalvulas` (
  `electrovalvulaId` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`electrovalvulaId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DAM`.`Dispositivos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DAM`.`Dispositivos` ;

CREATE TABLE IF NOT EXISTS `DAM`.`Dispositivos` (
  `dispositivoId` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NULL,
  `ubicacion` VARCHAR(200) NULL,
  `electrovalvulaId` INT NOT NULL,
  PRIMARY KEY (`dispositivoId`, `electrovalvulaId`),
  INDEX `fk_Dispositivos_Electrovalvulas1_idx` (`electrovalvulaId` ASC) ,
  CONSTRAINT `fk_Dispositivos_Electrovalvulas1`
    FOREIGN KEY (`electrovalvulaId`)
    REFERENCES `DAM`.`Electrovalvulas` (`electrovalvulaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DAM`.`Mediciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DAM`.`Mediciones` ;

CREATE TABLE IF NOT EXISTS `DAM`.`Mediciones` (
  `medicionId` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL,
  `valor` VARCHAR(100) NULL,
  `dispositivoId` INT NOT NULL,
  PRIMARY KEY (`medicionId`, `dispositivoId`),
  INDEX `fk_Mediciones_Dispositivos_idx` (`dispositivoId` ASC) ,
  CONSTRAINT `fk_Mediciones_Dispositivos`
    FOREIGN KEY (`dispositivoId`)
    REFERENCES `DAM`.`Dispositivos` (`dispositivoId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DAM`.`Log_Riegos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DAM`.`Log_Riegos` ;

CREATE TABLE IF NOT EXISTS `DAM`.`Log_Riegos` (
  `logRiegoId` INT NOT NULL AUTO_INCREMENT,
  `apertura` TINYINT NULL,
  `fecha` DATETIME NULL,
  `electrovalvulaId` INT NOT NULL,
  PRIMARY KEY (`logRiegoId`, `electrovalvulaId`),
  INDEX `fk_Log_Riegos_Electrovalvulas1_idx` (`electrovalvulaId` ASC) ,
  CONSTRAINT `fk_Log_Riegos_Electrovalvulas1`
    FOREIGN KEY (`electrovalvulaId`)
    REFERENCES `DAM`.`Electrovalvulas` (`electrovalvulaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO DAM.Electrovalvulas (electrovalvulaId, nombre) VALUES (1, 'Patio');
INSERT INTO DAM.Electrovalvulas (electrovalvulaId, nombre) VALUES (2, 'Cocina');
INSERT INTO DAM.Electrovalvulas (electrovalvulaId, nombre) VALUES (3, 'Cantero');
INSERT INTO DAM.Electrovalvulas (electrovalvulaId, nombre) VALUES (4, 'Ventana');
INSERT INTO DAM.Electrovalvulas (electrovalvulaId, nombre) VALUES (5, 'Invernadero1');
INSERT INTO DAM.Electrovalvulas (electrovalvulaId, nombre) VALUES (6, 'Invernadero2');
INSERT INTO DAM.Electrovalvulas (electrovalvulaId, nombre) VALUES (7, 'invernadero3');
INSERT INTO DAM.Dispositivos (electrovalvulaId, nombre, ubicacion) VALUES (1, 'Sensor1', 'Patio');
INSERT INTO DAM.Dispositivos (electrovalvulaId, nombre, ubicacion) VALUES (2, 'Sensor2', 'Cocina');
INSERT INTO DAM.Dispositivos (electrovalvulaId, nombre, ubicacion) VALUES (3, 'Sensor3', 'Cantero');
INSERT INTO DAM.Dispositivos (electrovalvulaId, nombre, ubicacion) VALUES (4, 'Sensor4', 'Ventana');
INSERT INTO DAM.Dispositivos (electrovalvulaId, nombre, ubicacion) VALUES (5, 'Sensor5', 'Invernadero1');
INSERT INTO DAM.Dispositivos (electrovalvulaId, nombre, ubicacion) VALUES (6, 'Sensor6', 'Invernadero2');
INSERT INTO DAM.Dispositivos (electrovalvulaId, nombre, ubicacion) VALUES (7, 'Sensor7', 'Invernadero3');
INSERT INTO DAM.Mediciones (dispositivoId, fecha, valor) VALUES (1,'2022-10-09 10:10:10', 15);
INSERT INTO DAM.Mediciones (dispositivoId, fecha, valor) VALUES (2,'2022-10-09 13:35:00', 15);
INSERT INTO DAM.Mediciones (dispositivoId, fecha, valor) VALUES (3,'2022-10-09 13:40:00', 15);
INSERT INTO DAM.Mediciones (dispositivoId, fecha, valor) VALUES (4,'2022-10-09 13:45:00', 15);
INSERT INTO DAM.Mediciones (dispositivoId, fecha, valor) VALUES (5,'2022-10-09 13:50:00', 15);
INSERT INTO DAM.Mediciones (dispositivoId, fecha, valor) VALUES (6,'2022-10-09 13:55:00', 15);
INSERT INTO DAM.Mediciones (dispositivoId, fecha, valor) VALUES (7,'2022-10-09 14:00:00', 15);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
