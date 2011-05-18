CREATE DATABASE  IF NOT EXISTS `truedataerp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `truedataerp`;
-- MySQL dump 10.13  Distrib 5.1.34, for apple-darwin9.5.0 (i386)
--
-- Host: 127.0.0.1    Database: truedataerp
-- ------------------------------------------------------
-- Server version	5.1.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `territorio`
--

DROP TABLE IF EXISTS `territorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `territorio` (
  `id_territorio` int(11) NOT NULL AUTO_INCREMENT,
  `nom_territorio` varchar(255) NOT NULL,
  `id_region` int(11) NOT NULL,
  `estado` int(1) NOT NULL,
  PRIMARY KEY (`id_territorio`),
  KEY `region_territorio_fk` (`id_region`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `territorio`
--

LOCK TABLES `territorio` WRITE;
/*!40000 ALTER TABLE `territorio` DISABLE KEYS */;
/*!40000 ALTER TABLE `territorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tap`
--

DROP TABLE IF EXISTS `tap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tap` (
  `id_tap` int(11) NOT NULL AUTO_INCREMENT,
  `nom_tap` varchar(100) NOT NULL,
  `cant_borne` int(10) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `direccion_referencial` varchar(150) DEFAULT NULL,
  `ubicacion_referencial` varchar(150) DEFAULT NULL,
  `longitud` float(10,6) DEFAULT NULL,
  `latitud` float(10,6) DEFAULT NULL,
  `fec_instalacion` date DEFAULT NULL,
  `num_serie` varchar(50) DEFAULT NULL,
  `id_modelo` int(11) unsigned NOT NULL,
  `id_marca` int(11) unsigned NOT NULL,
  `id_ered` int(11) unsigned NOT NULL,
  `id_ered_padre` int(11) DEFAULT NULL,
  `flag` tinyint(11) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_tap`),
  UNIQUE KEY `idx_nom_tap` (`nom_tap`),
  KEY `marca_tap_fk` (`id_marca`),
  KEY `modelo_tap_fk` (`id_modelo`),
  KEY `fk_tab_marca` (`id_marca`),
  KEY `fk_tap_ered` (`id_ered`),
  KEY `idmodelo` (`id_modelo`),
  CONSTRAINT `fk_tab_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tap_ered` FOREIGN KEY (`id_ered`) REFERENCES `elemento_red` (`id_ered`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idmodelo` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tap`
--

LOCK TABLES `tap` WRITE;
/*!40000 ALTER TABLE `tap` DISABLE KEYS */;
INSERT INTO `tap` VALUES (1,'TAP0001-3',4,'SDSD','SDS','DSD',-77.081367,-12.001586,'2009-04-20','SDSDSD',3,2,3,1,1),(2,'TAP0001',8,'SASA','SAS','ASASASA',-77.066689,-11.995688,'2009-03-30','H45454',3,1,4,1,1),(3,'TAP0001-2',4,'GFGG','FGFG','FGFGF',-77.072395,-12.009183,'2009-04-21','454545',2,2,3,1,1),(4,'TapSM1',2,'Calle A','Parque Juan Pablo II','Edificio E',-77.081154,-12.076505,'2009-04-28','sdfwd22342332',1,3,3,4,1),(5,'TAP0001-5',4,'TEST','TEST2','TEST3',-77.068748,-11.993799,'2009-04-21','123456',3,1,4,1,1);
/*!40000 ALTER TABLE `tap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `amplificador`
--

DROP TABLE IF EXISTS `amplificador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amplificador` (
  `id_amplificador` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nom_amplificador` varchar(100) NOT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `direccion_referencial` varchar(150) DEFAULT NULL,
  `ubicacion_referencial` varchar(150) DEFAULT NULL,
  `latitud` float(10,6) DEFAULT NULL,
  `longitud` float(10,6) DEFAULT NULL,
  `fec_instalacion` date DEFAULT NULL,
  `num_serie` varchar(50) DEFAULT NULL,
  `num_puertos` smallint(11) DEFAULT NULL,
  `id_modelo` int(11) unsigned NOT NULL,
  `id_marca` int(11) unsigned NOT NULL,
  `id_ered` int(11) unsigned NOT NULL,
  `id_ered_padre` int(11) unsigned DEFAULT NULL,
  `flag` tinyint(11) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_amplificador`),
  UNIQUE KEY `idx_nom_amplificador` (`nom_amplificador`),
  KEY `marca_amplificador_fk` (`id_marca`),
  KEY `modelo_amplificador_fk` (`id_modelo`),
  KEY `fk_amplificador_modelo` (`id_modelo`),
  KEY `fk_amplificador_marca` (`id_marca`),
  KEY `fk_amplificador_ered` (`id_ered`),
  CONSTRAINT `fk_amplificador_ered` FOREIGN KEY (`id_ered`) REFERENCES `elemento_red` (`id_ered`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_amplificador_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_amplificador_modelo` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amplificador`
--

LOCK TABLES `amplificador` WRITE;
/*!40000 ALTER TABLE `amplificador` DISABLE KEYS */;
INSERT INTO `amplificador` VALUES (1,'AMP0001','DSGSGS','GFGSG','GSGSGS',-12.006530,-77.075699,'2009-04-13','34343434',2,3,1,4,1,1),(4,'AmpSM1','Av La Mar 122','Universidad PUCP','Edificio C',-12.077386,-77.079735,'2009-04-28','1232423423asw',2,1,3,4,10,1),(5,'Amp005','kjhkjh','lkjkljkl','l;kjlk;jkkl',-10.585022,-77.211914,'2009-07-14','jlx',4,3,3,4,11,1);
/*!40000 ALTER TABLE `amplificador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedor`
--

DROP TABLE IF EXISTS `vendedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendedor` (
  `id_vendedor` int(11) NOT NULL AUTO_INCREMENT,
  `cod_vendedor` varchar(11) NOT NULL,
  `ap_paterno` varchar(200) NOT NULL,
  `ap_materno` varchar(255) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `dni` int(10) NOT NULL,
  `fec_nacimiento` date NOT NULL,
  `fec_ingreso` date NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono_celular` int(10) NOT NULL,
  `telefono_celular_1` int(10) NOT NULL,
  `telefono_fijo` int(10) NOT NULL,
  `estado` int(1) NOT NULL,
  PRIMARY KEY (`id_vendedor`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedor`
--

LOCK TABLES `vendedor` WRITE;
/*!40000 ALTER TABLE `vendedor` DISABLE KEYS */;
INSERT INTO `vendedor` VALUES (1,'ven001','De la Torre','Ganoza','Ricardo',1234567,'1974-08-29','2009-01-08','junin 802',91232456,1234567,4624910,1),(2,'ven002','Lopez','Perez','Jose',12317573,'1984-03-04','2009-01-04','Test 1',98979711,98921821,43241612,1);
/*!40000 ALTER TABLE `vendedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_material`
--

DROP TABLE IF EXISTS `pedido_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido_material` (
  `id_pedido` int(11) NOT NULL,
  `id_material` int(11) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `unidad` int(10) NOT NULL,
  KEY `material_pedido_material_fk` (`id_material`),
  KEY `pedido_pedido_material_fk` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_material`
--

LOCK TABLES `pedido_material` WRITE;
/*!40000 ALTER TABLE `pedido_material` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturacion`
--

DROP TABLE IF EXISTS `facturacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facturacion` (
  `id_facturacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_estado_pago` int(1) NOT NULL DEFAULT '1',
  `num_recibo` int(11) DEFAULT NULL,
  `monto` float(10,3) DEFAULT NULL,
  `f_vencimiento` date DEFAULT NULL,
  `dias_facturados` int(2) DEFAULT '0',
  `periodo` varchar(24) DEFAULT NULL,
  `f_pago` datetime DEFAULT NULL,
  PRIMARY KEY (`id_facturacion`),
  UNIQUE KEY `idx_pedido_fvencimiento` (`id_pedido`,`f_vencimiento`),
  KEY `FK_facturacion_estado_pago` (`id_estado_pago`),
  KEY `FK_facturacion_cliente` (`id_cliente`),
  CONSTRAINT `FK_facturacion_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON UPDATE CASCADE,
  CONSTRAINT `FK_facturacion_estado_pago` FOREIGN KEY (`id_estado_pago`) REFERENCES `estados_pago` (`id_estado_pago`) ON UPDATE CASCADE,
  CONSTRAINT `FK_facturacion_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturacion`
--

LOCK TABLES `facturacion` WRITE;
/*!40000 ALTER TABLE `facturacion` DISABLE KEYS */;
INSERT INTO `facturacion` VALUES (1,1,36,2,NULL,45.000,'2009-04-26',30,'26-04-2009 al 26-05-2009','2009-04-26 19:52:32'),(2,2,36,2,NULL,90.000,'2009-04-26',30,'26-04-2009 al 26-05-2009','2009-04-26 20:15:14'),(3,3,36,2,NULL,85.000,'2009-04-26',30,'26-04-2009 al 26-05-2009','2009-04-26 20:20:37'),(4,4,36,2,NULL,125.000,'2009-04-26',30,'26-04-2009 al 26-05-2009','2009-04-26 20:24:50'),(5,5,36,2,NULL,90.000,'2009-04-26',30,'26-04-2009 al 26-05-2009','2009-04-26 20:30:57'),(6,6,40,2,NULL,90.000,'2009-07-11',30,'11-07-2009 al 11-08-2009','2009-07-11 15:28:24'),(7,7,36,2,NULL,90.000,'2010-03-08',30,'08-03-2010 al 08-04-2010','2010-03-08 22:02:28'),(8,8,48,2,NULL,85.000,'2011-04-22',30,'22-04-2011 al 22-05-2011','2011-04-22 00:32:13'),(9,9,48,2,NULL,90.000,'2011-04-22',30,'22-04-2011 al 22-05-2011','2011-04-22 06:47:48');
/*!40000 ALTER TABLE `facturacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciudad` (
  `id_ciudad` int(11) NOT NULL AUTO_INCREMENT,
  `desc_ciudad` varchar(50) NOT NULL,
  `id_zonal` int(11) NOT NULL,
  `estado` int(1) NOT NULL,
  PRIMARY KEY (`id_ciudad`),
  KEY `idx_zonal` (`id_zonal`),
  KEY `idx_estado` (`estado`),
  CONSTRAINT `FK_ciudad_dpto` FOREIGN KEY (`id_zonal`) REFERENCES `zonal` (`id_zonal`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'CALLAO',11,1),(2,'LIMA',11,1),(3,'HUACHO',11,1),(4,'CHICLAYO',3,1),(5,'PIMENTEL',3,1),(6,'ANCON',11,1);
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moneda`
--

DROP TABLE IF EXISTS `moneda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moneda` (
  `id_moneda` int(11) NOT NULL AUTO_INCREMENT,
  `nom_moneda` varchar(20) NOT NULL,
  `pref_moneda` varchar(3) NOT NULL,
  `flag` int(1) NOT NULL,
  PRIMARY KEY (`id_moneda`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moneda`
--

LOCK TABLES `moneda` WRITE;
/*!40000 ALTER TABLE `moneda` DISABLE KEYS */;
INSERT INTO `moneda` VALUES (1,'Nuevos soles','S/.',0),(2,'Dolares Americanos','$/.',0),(4,'Colones - Costa Rica','â‚¡',1);
/*!40000 ALTER TABLE `moneda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geo_comercial`
--

DROP TABLE IF EXISTS `geo_comercial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geo_comercial` (
  `id_geo_comercial` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `coord_x` float(10,6) NOT NULL,
  `coord_y` float(10,6) NOT NULL,
  PRIMARY KEY (`id_geo_comercial`),
  KEY `FK_geo_comercial_pedido` (`id_pedido`),
  CONSTRAINT `FK_geo_comercial_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geo_comercial`
--

LOCK TABLES `geo_comercial` WRITE;
/*!40000 ALTER TABLE `geo_comercial` DISABLE KEYS */;
INSERT INTO `geo_comercial` VALUES (1,6,-12.117460,-77.043686),(2,7,-11.896832,-77.046173),(3,8,0.000000,0.000000),(4,9,-11.898344,-77.052444);
/*!40000 ALTER TABLE `geo_comercial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonal`
--

DROP TABLE IF EXISTS `zonal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zonal` (
  `id_zonal` int(11) NOT NULL AUTO_INCREMENT,
  `desc_zonal` varchar(50) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_zonal`),
  KEY `idx_estado` (`estado`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonal`
--

LOCK TABLES `zonal` WRITE;
/*!40000 ALTER TABLE `zonal` DISABLE KEYS */;
INSERT INTO `zonal` VALUES (1,'AREQUIPA',1),(2,'CHIMBOTE',1),(3,'CHICLAYO',1),(4,'CUZCO',1),(5,'JUNIN',1),(6,'ICA',1),(7,'IQUITOS',1),(8,'PIURA',1),(9,'TACNA',1),(10,'TRUJILLO',1),(11,'LIMA',1),(12,'HUANUCO',1),(13,'HUANCAVELICA',1),(14,'MADRE DE DIOS',1),(15,'UCAYALI',1),(16,'TUMBES',1),(17,'CAJAMARCA',1),(18,'SAN MARTIN',1),(19,'MOQUEGUA',1),(20,'PUNO',1),(21,'AYACUCHO',1),(22,'APURIMAC',1),(23,'CERRO DE PASCO',1),(24,'ANCASH',1);
/*!40000 ALTER TABLE `zonal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_estado`
--

DROP TABLE IF EXISTS `pedido_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido_estado` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `desc_estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_estado`
--

LOCK TABLES `pedido_estado` WRITE;
/*!40000 ALTER TABLE `pedido_estado` DISABLE KEYS */;
INSERT INTO `pedido_estado` VALUES (1,'REGISTRADO'),(2,'FORMULADO'),(3,'PROGRAMADO'),(4,'DESPACHADO'),(5,'RECHAZADO'),(6,'LIQUIDADO'),(7,'CANCELADO'),(8,'Baja');
/*!40000 ALTER TABLE `pedido_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicio`
--

DROP TABLE IF EXISTS `servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicio` (
  `id_servicio` int(8) NOT NULL AUTO_INCREMENT,
  `nom_servicio` varchar(150) NOT NULL,
  `precio_unitario` float(10,2) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '1',
  `desc_servicio` longtext,
  `habilita_cantidad` int(1) NOT NULL DEFAULT '0',
  `precio_por_dia` float(10,2) DEFAULT NULL,
  `monto_por_tv_adicional` float(10,2) DEFAULT '0.00',
  `id_moneda` int(11) NOT NULL,
  `id_tiposervicio` int(11) NOT NULL,
  PRIMARY KEY (`id_servicio`),
  KEY `FK_servicio_moneda` (`id_moneda`),
  KEY `FK_servicio_tipo_servicio` (`id_tiposervicio`),
  CONSTRAINT `FK_servicio_moneda` FOREIGN KEY (`id_moneda`) REFERENCES `moneda` (`id_moneda`) ON UPDATE CASCADE,
  CONSTRAINT `FK_servicio_tipo_servicio` FOREIGN KEY (`id_tiposervicio`) REFERENCES `tipo_servicio` (`id_tiposervicio`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicio`
--

LOCK TABLES `servicio` WRITE;
/*!40000 ALTER TABLE `servicio` DISABLE KEYS */;
INSERT INTO `servicio` VALUES (1,'INTERNET 600K',60.00,1,'Servicio de Internet de 600 Kb, adecuado para usuarios que usan em Messenger, o Correo Electronico.',0,2.00,0.00,1,2),(2,'INTERNET 1M',90.00,1,'Servicio de Internet de Alta Velocidad 1Mb, para usuarios que usan el Messenger, Correo Electronico y que descargan archivos.',0,3.00,0.00,1,2),(3,'Cable Estelar',45.00,1,'Servicio de cable Premium. La instalacion incluye 1 TV gratis, los adicionales tienen un costo de S/. 20.00.c/u, con un maximo de 3 TV para un cliente residencial',1,1.50,20.00,1,1),(4,'SuperNet300',50.00,1,'Velocidad de 300Kbps',1,NULL,0.00,1,2),(5,'SuperNet700',100.00,1,'Velocidad 700kbps',1,NULL,0.00,1,2);
/*!40000 ALTER TABLE `servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_movimientos`
--

DROP TABLE IF EXISTS `pedido_movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido_movimientos` (
  `id_pedido_mov` int(11) NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `f_movimiento` datetime NOT NULL,
  `id_estado` int(8) NOT NULL,
  `id_tecnico` int(11) NOT NULL,
  `id_user` int(8) NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  PRIMARY KEY (`id_pedido_mov`),
  KEY `FK_pedido_movimientos` (`id_pedido`),
  KEY `FK_pedido_mov_estado` (`id_estado`),
  KEY `FK_pedido_mov_usuario` (`id_user`),
  KEY `FK_pedido_tecnico` (`id_tecnico`),
  CONSTRAINT `FK_pedido_movimientos` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON UPDATE CASCADE,
  CONSTRAINT `FK_pedido_movimientos_estado` FOREIGN KEY (`id_estado`) REFERENCES `pedido_estado` (`id_estado`) ON UPDATE CASCADE,
  CONSTRAINT `FK_pedido_movimientos_tecnico` FOREIGN KEY (`id_tecnico`) REFERENCES `tecnico` (`id_tecnico`) ON UPDATE CASCADE,
  CONSTRAINT `FK_pedido_movimientos_user` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_movimientos`
--

LOCK TABLES `pedido_movimientos` WRITE;
/*!40000 ALTER TABLE `pedido_movimientos` DISABLE KEYS */;
INSERT INTO `pedido_movimientos` VALUES (1,1,'2009-04-26 19:52:00',1,1,1,''),(2,2,'2009-04-26 20:15:00',1,1,1,''),(3,3,'2009-04-26 20:20:00',1,1,1,''),(4,4,'2009-04-26 20:24:00',1,1,1,''),(5,5,'2009-04-26 20:30:00',1,1,1,''),(6,6,'2009-07-11 15:28:00',1,1,1,''),(7,7,'2010-03-08 22:02:00',1,1,1,''),(8,8,'2011-04-22 05:32:00',1,1,1,''),(9,9,'2011-04-22 11:47:00',1,1,1,'');
/*!40000 ALTER TABLE `pedido_movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cable_modem`
--

DROP TABLE IF EXISTS `cable_modem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cable_modem` (
  `id_cable_modem` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nom_cable_modem` varchar(150) NOT NULL,
  `num_mac` varchar(17) NOT NULL,
  `latitud` float(10,6) DEFAULT NULL,
  `longitud` float(10,6) DEFAULT NULL,
  `fec_instalacion` date NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_modelo` int(11) unsigned NOT NULL,
  `id_marca` int(11) unsigned NOT NULL,
  `id_ered` int(11) unsigned NOT NULL,
  `id_ered_padre` int(11) unsigned DEFAULT NULL,
  `flag` tinyint(11) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_cable_modem`),
  UNIQUE KEY `idx_nom_cable_modem` (`nom_cable_modem`),
  KEY `marca_cable_modem_fk` (`id_marca`),
  KEY `modelo_cable_modem_fk` (`id_modelo`),
  KEY `fk_cable_modem_modelo` (`id_modelo`),
  KEY `fk_cable_modem_marca` (`id_marca`),
  KEY `fk_cable_modem_ered` (`id_ered`),
  CONSTRAINT `fk_cable_modem_ered` FOREIGN KEY (`id_ered`) REFERENCES `elemento_red` (`id_ered`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cable_modem_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_cable_modem_modelo` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cable_modem`
--

LOCK TABLES `cable_modem` WRITE;
/*!40000 ALTER TABLE `cable_modem` DISABLE KEYS */;
INSERT INTO `cable_modem` VALUES (2,'cm0003','001095123527',-11.992959,-77.068466,'2009-04-21',0,1,2,2,5,1),(3,'cm0005','00152f468544',-11.995247,-77.066086,'2009-04-07',0,3,2,2,2,1),(4,'cm0001','0010950b597e',-11.994937,-77.066452,'2009-04-27',0,1,2,2,2,1),(5,'cm0002','0011804DFEB6',-11.996150,-77.065392,'2009-04-15',0,1,2,2,2,1),(6,'cm0006','000f9f1ac54c',-12.009981,-77.071899,'2009-05-04',0,2,2,2,3,1),(7,'cm0004','000f9f1ac0a8',-12.073567,-77.099480,'2009-05-05',0,1,4,2,4,1),(8,'cm100','009064afdab1',-11.996564,-77.065666,'2009-05-12',0,3,6,2,2,1),(9,'cm0008','0010950f7969',-12.082542,-77.086708,'2009-07-11',0,1,8,2,2,1),(10,'cm0007','0010950b5dd8',-12.070960,-77.100677,'2010-02-03',0,3,8,2,2,1);
/*!40000 ALTER TABLE `cable_modem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_abonado`
--

DROP TABLE IF EXISTS `tipo_abonado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_abonado` (
  `id_tipo_abonado` int(11) NOT NULL AUTO_INCREMENT,
  `desc_tipo_abonado` varchar(50) NOT NULL,
  `estado` int(1) NOT NULL,
  PRIMARY KEY (`id_tipo_abonado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_abonado`
--

LOCK TABLES `tipo_abonado` WRITE;
/*!40000 ALTER TABLE `tipo_abonado` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_abonado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfil` (
  `idperfil` int(11) NOT NULL DEFAULT '0',
  `desc_perfil` varchar(20) NOT NULL,
  `opciones` varchar(255) DEFAULT NULL,
  `flag` int(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (2,'Administrador',NULL,1),(3,'operador',NULL,1);
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_vivienda`
--

DROP TABLE IF EXISTS `tipo_vivienda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_vivienda` (
  `id_tipo_vivienda` int(11) NOT NULL AUTO_INCREMENT,
  `desc_tipo_vivienda` varchar(20) NOT NULL,
  `estado` int(1) DEFAULT '1',
  PRIMARY KEY (`id_tipo_vivienda`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_vivienda`
--

LOCK TABLES `tipo_vivienda` WRITE;
/*!40000 ALTER TABLE `tipo_vivienda` DISABLE KEYS */;
INSERT INTO `tipo_vivienda` VALUES (1,'Propia',1),(2,'Familiar',1),(3,'Alquilada',1),(4,'Multifamiliar',1);
/*!40000 ALTER TABLE `tipo_vivienda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distrito`
--

DROP TABLE IF EXISTS `distrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `distrito` (
  `id_distrito` int(11) NOT NULL AUTO_INCREMENT,
  `cod_distrito` varchar(10) NOT NULL,
  `desc_distrito` varchar(50) NOT NULL,
  `estado` int(1) NOT NULL,
  `id_ciudad` int(11) DEFAULT NULL,
  `id_historico` int(11) NOT NULL,
  PRIMARY KEY (`id_distrito`),
  KEY `idx_idciudad` (`id_ciudad`),
  KEY `idx_estado` (`estado`),
  CONSTRAINT `FK_distrito_ciudad` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id_ciudad`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distrito`
--

LOCK TABLES `distrito` WRITE;
/*!40000 ALTER TABLE `distrito` DISABLE KEYS */;
INSERT INTO `distrito` VALUES (1,'LI01','EL CERCADO',1,2,0),(2,'LI02','ANCON',1,6,0),(3,'LI03','ATE-VITARTE',1,2,0),(4,'LI04','BARRANCO',1,2,0),(5,'LI05','BRENA',1,2,0),(6,'LI06','CARABAYLLO',1,2,0),(7,'LI07','COMAS',1,2,0),(8,'LI08','CHACLACAYO',1,2,0),(9,'LI09','CHORRILLOS',1,2,0),(10,'LI10','EL AGUSTINO',1,2,0),(11,'LI11','JESUS MARIA',1,2,0),(12,'LI12','LA MOLINA',1,2,0),(13,'LI13','LA VICTORIA',1,2,0),(14,'LI14','LINCE',1,2,0),(15,'LI15','LURIGANCHO',1,2,0),(16,'LI16','LURIN',1,2,0),(17,'LI17','MAGDALENA DEL MAR',1,2,0),(18,'LI18','MIRAFLORES',1,2,0),(19,'LI19','PACHACAMAC',1,2,0),(20,'LI20','PUCUSANA',1,2,0),(21,'LI21','PUEBLO LIBRE',1,2,0),(22,'LI22','PUENTE PIEDRA',1,2,0),(23,'LI23','PUNTA NEGRA',1,2,0),(24,'LI24','PUNTA HERMOSA',1,2,0),(25,'LI25','RIMAC',1,2,0),(26,'LI26','SAN BARTOLO',1,2,0),(27,'LI27','SAN ISIDRO',1,2,0),(28,'LI28','INDEPENDENCIA',1,2,0),(29,'LI29','SAN JUAN DE MIRAFLORES',1,2,0),(30,'LI30','SAN LUIS',1,2,0),(31,'LI31','SAN MARTIN DE PORRES',1,2,0),(32,'LI32','SAN MIGUEL',1,2,0),(33,'LI33','SANTIAGO DE SURCO',1,2,0),(34,'LI34','SURQUILLO',1,2,0),(35,'LI35','VILLA MARIA DEL TRIUNFO',1,2,0),(36,'LI36','SAN JUAN DE LURIGANCHO',1,2,0),(37,'LI37','SANTA MARIA DEL MAR',1,2,0),(38,'LI38','SANTA ROSA',1,2,0),(39,'LI39','LOS OLIVOS',1,2,0),(40,'LI40','CIENEGUILLA',1,2,0),(41,'LI41','SAN BORJA',1,2,0),(42,'LI42','VILLA EL SALVADOR',1,2,0),(43,'LI43','SANTA ANITA',1,2,0),(44,'LI91','RICARDO PALMA',1,2,0),(45,'LI92','SANTA EULALIA',1,2,0),(46,'LI81','CALLAO',1,1,0),(47,'LI82','BELLAVISTA',1,1,0),(48,'LI83','CARMEN DE LA LEGUA',1,1,0),(49,'LI84','LA PERLA',1,1,0),(50,'LI85','LA PUNTA',1,1,0),(51,'LI86','VENTANILLA',1,2,0),(52,'LI87','CHOSICA',1,2,0),(53,'AS01','ASIA',1,2,0),(54,'CH01','CHANCAY',1,2,0),(55,'CK01','CHILCA',1,2,0),(56,'CL01','CALANGO',1,2,0),(57,'CO01','STA. CRUZ DE COCACHA',1,2,0),(58,'CA01','CERCADO CALLAO',1,2,0),(59,'CA02','BELLAVISTA',1,2,0),(60,'CA03','CARMEN DE LA LEGUA',1,2,0),(61,'CA04','LA PERLA',1,2,0),(62,'CA05','LA PUNTA',1,2,0),(63,'CA06','VENTANILLA',1,2,0),(64,'CP01','CASAPALCA',1,2,0),(65,'CQ01','CACACHAQUI',1,2,0),(66,'CT01','CANTA',1,2,0),(67,'HU01','HUARAL',1,2,0),(68,'MA01','MATUCANA',1,2,0),(69,'ML01','MALA',1,2,0),(70,'SM01','SAN MATEO',1,2,0),(71,'YA01','YANGAS',1,2,0);
/*!40000 ALTER TABLE `distrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permiso` (
  `id_user` int(11) NOT NULL,
  `id_func` int(10) NOT NULL,
  KEY `funcion_permiso_fk` (`id_func`),
  KEY `usuario_permiso_fk` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcion`
--

DROP TABLE IF EXISTS `funcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcion` (
  `id_func` int(10) NOT NULL AUTO_INCREMENT,
  `nom_funcion` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `url` varchar(150) NOT NULL,
  PRIMARY KEY (`id_func`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcion`
--

LOCK TABLES `funcion` WRITE;
/*!40000 ALTER TABLE `funcion` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_servicio`
--

DROP TABLE IF EXISTS `tipo_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_servicio` (
  `id_tiposervicio` int(11) NOT NULL AUTO_INCREMENT,
  `nom_tiposervicio` varchar(10) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_tiposervicio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_servicio`
--

LOCK TABLES `tipo_servicio` WRITE;
/*!40000 ALTER TABLE `tipo_servicio` DISABLE KEYS */;
INSERT INTO `tipo_servicio` VALUES (1,'CABLE',1),(2,'INTERNET',1);
/*!40000 ALTER TABLE `tipo_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_cliente`
--

DROP TABLE IF EXISTS `historico_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historico_cliente` (
  `id_historico` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_accion` int(11) NOT NULL,
  `f_movimiento` datetime NOT NULL,
  `id_tipo_doc` int(11) NOT NULL,
  `num_documento` varchar(20) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `modulo` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_historico`),
  KEY `FK_historico_accion` (`id_accion`),
  KEY `FK_historico_usuario` (`id_user`),
  KEY `FK_historico_cliente` (`id_tipo_doc`),
  KEY `FK_historico_clientes` (`id_cliente`),
  CONSTRAINT `FK_historico_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_historico_accion` FOREIGN KEY (`id_accion`) REFERENCES `accion_user` (`id_accion`) ON UPDATE CASCADE,
  CONSTRAINT `FK_historico_cliente_tipodoc` FOREIGN KEY (`id_tipo_doc`) REFERENCES `tipo_documento` (`id_tipo_doc`) ON UPDATE CASCADE,
  CONSTRAINT `FK_historico_usuario` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_cliente`
--

LOCK TABLES `historico_cliente` WRITE;
/*!40000 ALTER TABLE `historico_cliente` DISABLE KEYS */;
INSERT INTO `historico_cliente` VALUES (1,1,1,'2009-07-11 15:26:07',1,'23454546',47,'Registro Cliente'),(2,1,1,'2011-04-21 23:51:09',1,'12345678',48,'Registro Cliente'),(3,1,1,'2011-04-22 14:34:26',1,'12345678',48,'Registro Cliente'),(11,1,1,'2011-04-22 15:44:43',1,'12345677',57,'Registro Cliente');
/*!40000 ALTER TABLE `historico_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hub`
--

DROP TABLE IF EXISTS `hub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hub` (
  `id_hub` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nom_hub` varchar(150) NOT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `direccion_referencial` varchar(150) DEFAULT NULL,
  `ubicacion_referencial` varchar(150) DEFAULT NULL,
  `latitud` float(10,6) DEFAULT NULL,
  `longitud` float(10,6) DEFAULT NULL,
  `fec_instalacion` date DEFAULT NULL,
  `rx_f` smallint(11) DEFAULT NULL,
  `tx_f` smallint(11) DEFAULT NULL,
  `rx_r` smallint(11) DEFAULT NULL,
  `tx_r` smallint(11) DEFAULT NULL,
  `redundancia` tinyint(1) DEFAULT NULL,
  `id_ered_redundancia` int(11) unsigned DEFAULT NULL,
  `id_ered_padre_redundancia` int(11) unsigned DEFAULT NULL,
  `id_ered` int(11) unsigned NOT NULL,
  `id_ered_padre` int(11) DEFAULT NULL,
  `obs` longtext,
  `flag` tinyint(11) DEFAULT '1',
  PRIMARY KEY (`id_hub`),
  UNIQUE KEY `idc_nom_hub` (`nom_hub`),
  KEY `fk_hub_ered` (`id_ered`),
  CONSTRAINT `fk_hub_ered` FOREIGN KEY (`id_ered`) REFERENCES `elemento_red` (`id_ered`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hub`
--

LOCK TABLES `hub` WRITE;
/*!40000 ALTER TABLE `hub` DISABLE KEYS */;
INSERT INTO `hub` VALUES (1,'HUB0001','UNIVERSITARIA / IZAGUIRRE','CRUCE','POSTE10',-11.991595,-77.083298,'2009-04-20',1,2,3,4,0,NULL,NULL,6,1,'',1),(2,'HUB0002','AAAAAAAAAAA','BBBBBBBB','CCCCCCCCCCC',-12.025805,-77.074844,'2009-04-27',1,3,9,2,0,NULL,NULL,5,1,'',1),(11,'HUB000001','AAAAAAAA','BBBBBBB','CCCCCCCC',-12.112781,-77.031372,'2009-04-22',1,2,3,5,1,6,12,6,12,'TEST1\r\nTEST2',1),(12,'HUBSM1','Av Lituma 122','Por el ICPNA','Edificio 2C',-12.076966,-77.087807,'2009-04-28',1,5,4,4,1,6,13,6,13,'Test',1);
/*!40000 ALTER TABLE `hub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados_pago`
--

DROP TABLE IF EXISTS `estados_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados_pago` (
  `id_estado_pago` int(1) NOT NULL AUTO_INCREMENT,
  `estado_pago` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`id_estado_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados_pago`
--

LOCK TABLES `estados_pago` WRITE;
/*!40000 ALTER TABLE `estados_pago` DISABLE KEYS */;
INSERT INTO `estados_pago` VALUES (1,'Pendiente'),(2,'Pagado');
/*!40000 ALTER TABLE `estados_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodo`
--

DROP TABLE IF EXISTS `nodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nodo` (
  `id_nodo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nom_nodo` varchar(150) NOT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `direccion_referencial` varchar(150) DEFAULT NULL,
  `ubicacion_referencial` varchar(150) DEFAULT NULL,
  `latitud` float(10,6) DEFAULT NULL,
  `longitud` float(10,6) DEFAULT NULL,
  `fec_instalacion` date DEFAULT NULL,
  `num_serie` varchar(50) DEFAULT NULL,
  `num_puertos_fr` smallint(11) DEFAULT NULL,
  `rx` smallint(11) DEFAULT NULL,
  `tx` smallint(11) DEFAULT NULL,
  `id_modelo` int(11) unsigned NOT NULL,
  `id_marca` int(11) unsigned NOT NULL,
  `id_ered` int(11) unsigned NOT NULL,
  `id_ered_padre` int(11) DEFAULT NULL,
  `id_area_nodo` int(11) unsigned DEFAULT NULL,
  `flag` tinyint(11) DEFAULT '1',
  PRIMARY KEY (`id_nodo`),
  UNIQUE KEY `idc_nom_nodo` (`nom_nodo`),
  KEY `marca_nodo_fk` (`id_marca`),
  KEY `modelo_nodo_fk` (`id_modelo`),
  KEY `fk_id_area_nodo` (`id_area_nodo`),
  KEY `fk_id_marca` (`id_marca`),
  KEY `fk_nodo_ered` (`id_ered`),
  KEY `fk_nodo_modelo` (`id_modelo`),
  CONSTRAINT `fk_id_area_nodo` FOREIGN KEY (`id_area_nodo`) REFERENCES `area_nodo` (`id_area_nodo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_nodo_ered` FOREIGN KEY (`id_ered`) REFERENCES `elemento_red` (`id_ered`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_nodo_modelo` FOREIGN KEY (`id_modelo`) REFERENCES `modelo` (`id_modelo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodo`
--

LOCK TABLES `nodo` WRITE;
/*!40000 ALTER TABLE `nodo` DISABLE KEYS */;
INSERT INTO `nodo` VALUES (1,'NOD0001','DDD','SDSD','SDSDSD',-11.994827,-77.071625,'2009-04-20','111111111',1,2,1,3,1,6,1,1,1),(2,'NOD0002','SAA','DAD','ADADADAD',-12.016739,-77.071236,'2009-04-07','232323',2,2,1,3,1,5,2,2,1),(10,'NODSM1','Av Riva Aguero 122','Burger King La Marina','Edificio D',-12.077554,-77.084282,'2009-04-28','1223123',1,1,1,3,3,5,12,6,1),(11,'Nodo01','123 xcnvsdfajl','Catedral','Plaza de armas',-13.515896,-71.979202,'2009-04-30','hkjdhkj',4,1,1,3,3,6,12,7,1),(12,'N100','jhkjh','kjkljlkjk','Plateros',-13.516105,-71.980103,'2009-04-30','000001',4,1,1,3,3,6,13,7,1),(13,'adhsf','hgjg','kjhkjh','.jhkj',-12.066685,-77.128319,'2009-04-30','636367',2,2,2,3,3,6,NULL,NULL,1),(14,'NODOSM2','Test','Test','Test',-12.072392,-77.097755,'2009-04-30','1212312',1,1,0,1,7,6,13,6,1);
/*!40000 ALTER TABLE `nodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `id_material` int(11) NOT NULL AUTO_INCREMENT,
  `nom_material` varchar(150) DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL,
  `cantidad` int(10) DEFAULT NULL,
  `unidad` varchar(10) DEFAULT NULL,
  `estandar` int(10) DEFAULT NULL,
  `adicional` int(10) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL,
  `otro` int(10) DEFAULT NULL,
  PRIMARY KEY (`id_material`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Cable Coaxial RJ 06',100,0,'Mts',0,0,1,0),(2,'Bola de Proteccion RG 6',5,0,'Und',0,0,1,0),(3,'Empalme F',10,0,'Und',0,0,1,0),(4,'Espirales de retencion',10,0,'Und',0,0,1,0),(5,'Grapas Tipo Q',10,0,'Und',0,0,1,0),(6,'Splitter de 3 vias',20,0,'Und',0,0,1,0),(7,'Splitter de 2 vias',20,0,'Und',0,0,1,0),(8,'Grapas de cemento',30,0,'Und',0,0,1,0),(9,'Conector RG 11',50,0,'Und',0,0,1,0),(10,'Cable Coaxial RG 11',50,0,'Mts',0,0,1,0),(11,'Conector RG 06',50,0,'Und',0,0,1,0);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zona` (
  `id_zona` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc_zona` varchar(150) NOT NULL,
  `flag` tinyint(3) unsigned NOT NULL,
  `puntos` text NOT NULL,
  PRIMARY KEY (`id_zona`),
  UNIQUE KEY `idx_desc_zona` (`desc_zona`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona`
--

LOCK TABLES `zona` WRITE;
/*!40000 ALTER TABLE `zona` DISABLE KEYS */;
INSERT INTO `zona` VALUES (1,'PERU',1,'-0.439449,-82.880859|-0.263671,-69.082031|-18.729502,-68.027344|-18.562947,-82.265625'),(2,'LIMA',1,'-11.940586,-77.158356|-11.943273,-76.925583|-12.131977,-76.909790|-12.134663,-77.149429'),(3,'LOS OLIVOS',1,'-11.950998,-77.090378|-11.947975,-77.071152|-11.994659,-77.063942|-11.991973,-77.098961'),(4,'San Martin de Porres',1,'-11.971486,-77.115784|-11.971486,-77.071152|-11.996003,-77.072182|-11.994659,-77.115612'),(5,'La victoria',1,'-12.059466,-77.040768|-12.081457,-77.036304|-12.074238,-77.000427|-12.049226,-77.010040'),(6,'BARRANCO',1,'-12.128341,-77.043686|-12.156647,-77.041454|-12.158661,-77.008495|-12.120956,-77.017593'),(7,'Carabayllo',1,'-11.894564,-77.047806|-11.908674,-77.031841|-11.897666,-77.013302|-11.881204,-76.993389|-11.868101,-77.012959|-11.869949,-77.030811'),(8,'Cuzco-Centro',1,'-13.508902,-71.984825|-13.514077,-71.989117|-13.521921,-71.992722|-13.525927,-71.979847|-13.525927,-71.971436|-13.528597,-71.958218|-13.516413,-71.950150|-13.507066,-71.962852|-13.510405,-71.977615'),(9,'Cuzco-Este',1,'-13.537777,-71.964226|-13.545620,-71.948261|-13.543284,-71.920109|-13.544953,-71.907921|-13.552796,-71.887665|-13.552796,-71.874275|-13.543451,-71.872902|-13.538277,-71.887836|-13.535607,-71.900883|-13.526261,-71.893673|-13.523256,-71.902943|-13.528764,-71.907749|-13.524091,-71.917534|-13.520085,-71.936588|-13.512575,-71.951008'),(10,'ZonaCallao',1,'-11.987092,-77.131920|-11.988099,-77.101021|-11.988099,-77.063255|-12.042835,-77.050896|-12.075738,-77.069435|-12.085138,-77.099991|-12.066673,-77.141533|-12.071038,-77.163506|-12.030075,-77.142220'),(11,'Mozilla',1,'-3.577750,-75.102539|-5.198906,-77.080078|-5.592660,-74.223633'),(12,'Hrz',1,'-9.530543,-77.531891|-9.540785,-77.531290|-9.533802,-77.522578|-9.540404,-77.525711');
/*!40000 ALTER TABLE `zona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendedor_territorio`
--

DROP TABLE IF EXISTS `vendedor_territorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendedor_territorio` (
  `id_territorio` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  KEY `territorio_vendedor_territorio_fk` (`id_territorio`),
  KEY `vendedor_vendedor_territorio_fk` (`id_vendedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendedor_territorio`
--

LOCK TABLES `vendedor_territorio` WRITE;
/*!40000 ALTER TABLE `vendedor_territorio` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendedor_territorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marca` (
  `id_marca` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc_marca` varchar(150) NOT NULL,
  `id_ered` int(11) unsigned NOT NULL,
  `flag` tinyint(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Siemmens',0,1),(2,'Nokia',0,1),(3,'Motorola',0,1),(4,'General Instruments',0,1),(5,'Scientific Atlanta',0,1),(6,'C-Cor',0,1),(7,'Triple Crown',0,1),(8,'Magnavox',0,1),(9,'Jerrold',0,1);
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelo`
--

DROP TABLE IF EXISTS `modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modelo` (
  `id_modelo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc_modelo` varchar(150) NOT NULL,
  `id_ered` int(11) unsigned NOT NULL,
  `flag` tinyint(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_modelo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo`
--

LOCK TABLES `modelo` WRITE;
/*!40000 ALTER TABLE `modelo` DISABLE KEYS */;
INSERT INTO `modelo` VALUES (1,'Alpha300',0,1),(2,'Solaris',0,1),(3,'RG-2000',0,1);
/*!40000 ALTER TABLE `modelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pais` (
  `id_pais` int(11) NOT NULL AUTO_INCREMENT,
  `desc_pais` varchar(50) NOT NULL,
  `estado` int(1) NOT NULL,
  PRIMARY KEY (`id_pais`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elemento_red`
--

DROP TABLE IF EXISTS `elemento_red`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `elemento_red` (
  `id_ered` int(11) unsigned NOT NULL,
  `desc_ered` varchar(150) NOT NULL,
  `flag` tinyint(11) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_ered`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elemento_red`
--

LOCK TABLES `elemento_red` WRITE;
/*!40000 ALTER TABLE `elemento_red` DISABLE KEYS */;
INSERT INTO `elemento_red` VALUES (1,'Modem',1),(2,'Tap',1),(3,'Amplificador',1),(4,'Nodo',1),(5,'Hub',1),(6,'Cabecera',1);
/*!40000 ALTER TABLE `elemento_red` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cintillo`
--

DROP TABLE IF EXISTS `cintillo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cintillo` (
  `id_cintillo` int(11) NOT NULL AUTO_INCREMENT,
  `id_dir_inst` int(11) NOT NULL,
  `cintillo` varchar(20) NOT NULL,
  `estado` int(1) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  PRIMARY KEY (`id_cintillo`),
  KEY `FK_cintillo_pedido` (`id_pedido`),
  CONSTRAINT `FK_cintillo_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cintillo`
--

LOCK TABLES `cintillo` WRITE;
/*!40000 ALTER TABLE `cintillo` DISABLE KEYS */;
/*!40000 ALTER TABLE `cintillo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_documento` (
  `id_tipo_doc` int(11) NOT NULL AUTO_INCREMENT,
  `desc_tipo_doc` varchar(30) DEFAULT NULL,
  `estado` int(1) DEFAULT '1',
  PRIMARY KEY (`id_tipo_doc`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'DNI',1),(2,'RUC',1);
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relacion_laboral`
--

DROP TABLE IF EXISTS `relacion_laboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relacion_laboral` (
  `id_tipo_relab` int(11) NOT NULL AUTO_INCREMENT,
  `desc_relaboral` varchar(20) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_tipo_relab`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_laboral`
--

LOCK TABLES `relacion_laboral` WRITE;
/*!40000 ALTER TABLE `relacion_laboral` DISABLE KEYS */;
INSERT INTO `relacion_laboral` VALUES (1,'Dependiente',1),(2,'Independiente',1);
/*!40000 ALTER TABLE `relacion_laboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facilidades_pedido`
--

DROP TABLE IF EXISTS `facilidades_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facilidades_pedido` (
  `id_pedido` int(11) NOT NULL,
  `latitud` int(10) NOT NULL,
  `longitud` int(10) NOT NULL,
  `id_amplificador` int(10) NOT NULL,
  `id_tap` int(10) NOT NULL,
  `id_nodo` int(11) NOT NULL,
  `id_cabecera` int(10) NOT NULL,
  `borne` int(10) NOT NULL,
  `troncal` int(10) NOT NULL,
  `poste` int(10) NOT NULL,
  `id_cable_modem` int(11) NOT NULL,
  `borne_ocupado` int(11) NOT NULL,
  `borne_libre` int(11) NOT NULL,
  `direccion_tap` varchar(255) NOT NULL,
  KEY `cable_modem_facilidades_pedido_fk` (`id_cable_modem`),
  KEY `cabecera_facilidades_pedido_fk` (`id_cabecera`),
  KEY `nodo_facilidades_pedido_fk` (`id_nodo`),
  KEY `amplificador_facilidades_pedido_fk` (`id_amplificador`),
  KEY `tap_facilidades_pedido_fk` (`id_tap`),
  KEY `pedido_facilidades_pedido_fk` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilidades_pedido`
--

LOCK TABLES `facilidades_pedido` WRITE;
/*!40000 ALTER TABLE `facilidades_pedido` DISABLE KEYS */;
INSERT INTO `facilidades_pedido` VALUES (16,0,0,0,0,0,0,12,1,12,0,12,12,'12'),(18,0,0,0,0,0,0,1234,987,1,0,5,3,'test'),(17,0,0,0,0,0,0,1,0,1,0,2,3,'Ingresar Direccion TAP...'),(17,0,0,0,0,0,0,10,0,10,0,5,1,'Ingresar Direccion TAP...'),(19,0,0,0,0,0,0,10,0,12,0,2,2,'Ingresar Direccion TAP...');
/*!40000 ALTER TABLE `facilidades_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `ap_paterno` varchar(150) NOT NULL,
  `ap_materno` varchar(150) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `usuario` varchar(15) NOT NULL,
  `clave` varchar(15) NOT NULL,
  `dni` varchar(11) NOT NULL,
  `fec_ultimo_ingreso` date NOT NULL,
  `idsess` varchar(50) NOT NULL,
  `estado` int(1) NOT NULL,
  `idperfil` int(1) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'De la Torre','Ganoza','Ricardo','rdelatorreg','123','1234567','2011-04-21','K320406050611065rdelatorreg',1,2),(2,'Ramirez','Salazar','Grover Marino','gramirezs','28052805','40033954','2010-03-04','K320347084710475gramirezs',1,2),(3,'Pena','Davila','Henry','hpenad','p3n4d4v1l4','12345678','2009-08-16','K320820102009205hpenad',1,2),(4,'Pena','Davila','Franz','fpenad','p3n4d4v1l4','12345678','2009-08-26','K320830093009305fpenad',1,2),(5,'Paredes','','Luis','lparedes','p4r3d35','12345678','2009-02-08','K320209060909095lparedes',1,2),(6,'Mamani','Carpio','Elsa Yolanda','eymamanic','m4m4n1c','12345678','2009-04-28','K320441084109415eymamanic',1,2),(7,'test1','test2','test3','test','desarrollo','1234567','2009-08-16','K320846104609465test',1,2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area_nodo`
--

DROP TABLE IF EXISTS `area_nodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area_nodo` (
  `id_area_nodo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `desc_area_nodo` varchar(150) NOT NULL,
  `flag` tinyint(11) unsigned NOT NULL,
  `color_area` varchar(20) NOT NULL,
  `transparencia_area` varchar(5) NOT NULL,
  `color_linea` varchar(20) NOT NULL,
  `transparencia_linea` varchar(5) NOT NULL,
  `ancho_linea` varchar(5) NOT NULL,
  `puntos` text NOT NULL,
  PRIMARY KEY (`id_area_nodo`),
  UNIQUE KEY `idx_desc_area_nodo` (`desc_area_nodo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area_nodo`
--

LOCK TABLES `area_nodo` WRITE;
/*!40000 ALTER TABLE `area_nodo` DISABLE KEYS */;
INSERT INTO `area_nodo` VALUES (1,'A_NOD0001',1,'#FFFF00','0.5','#FF0000','0.5','5','-11.991301,-77.081451|-11.996753,-77.084713|-12.012536,-77.080078|-12.008506,-77.061539|-11.990204,-77.063942|-11.991469,-77.075100'),(2,'A_NOD0002',1,'#CCFFCC','0.5','#FF0000','0.5','5','-12.013000,-77.079563|-12.022655,-77.074413|-12.024334,-77.074499|-12.026600,-77.075529|-12.028615,-77.070208|-12.028195,-77.067204|-12.029706,-77.065144|-12.030378,-77.060165|-12.028699,-77.057848|-12.016274,-77.059908|-12.008635,-77.061453|-12.009978,-77.066946|-12.011657,-77.072010'),(3,'A_NOD0003',1,'#FFCC99','0.5','#FF0000','0.5','5','-11.991675,-77.083340|-11.990751,-77.093897|-11.989156,-77.104797|-11.990797,-77.106943|-11.995079,-77.104969|-12.009687,-77.097502|-12.013549,-77.095098|-12.011992,-77.090464|-12.012663,-77.086773|-12.013503,-77.083082|-12.013251,-77.079649|-12.006451,-77.082481|-11.996964,-77.084799|-11.993690,-77.083254'),(4,'A_NOD0004',1,'#00FF00','0.2','#FF0000','0.5','5','-11.991591,-77.082825|-11.989408,-77.081022|-11.983950,-77.078190|-11.978157,-77.077246|-11.976898,-77.083082|-11.976058,-77.086000|-11.974379,-77.088232|-11.981012,-77.095699|-11.989324,-77.105141|-11.991171,-77.092867'),(6,'San Miguel',1,'#FFFF99','0.5','#FF6600','0.5','5','-12.076331,-77.113552|-12.063238,-77.108402|-12.058705,-77.075100|-12.081703,-77.065487|-12.091271,-77.084713'),(7,'Nodo120',1,'#FFFF00','0.5','#FF0000','0.5','5','-13.511701,-71.977959|-13.518210,-71.973925|-13.522049,-71.977787|-13.516708,-71.982937|-13.511701,-71.981993'),(8,'N300',1,'#FFFF00','0.5','#FF0000','0.5','5','-13.528914,-71.923928|-13.535340,-71.924314|-13.531919,-71.915646|-13.528247,-71.917920'),(9,'Nodo121',1,'#FFFF00','0.5','#FF0000','0.5','5','-12.071508,-77.060938|-12.074446,-77.055016|-12.085692,-77.063427|-12.083594,-77.065058|-12.082083,-77.067118'),(10,'Nodo123',1,'#FF99CC','0.5','#993366','0.5','5','-12.060009,-77.127714|-12.063870,-77.120590|-12.072263,-77.124538|-12.069661,-77.132349|-12.064541,-77.132263|-12.059589,-77.129774'),(11,'miraflores',1,'#FFFF00','0.5','#FF0000','0.5','5','-12.117021,-77.043643|-12.124070,-77.042828|-12.123734,-77.034030|-12.119245,-77.034330|-12.115804,-77.038193');
/*!40000 ALTER TABLE `area_nodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `id_region` int(11) NOT NULL AUTO_INCREMENT,
  `nom_region` varchar(150) NOT NULL,
  PRIMARY KEY (`id_region`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accion_user`
--

DROP TABLE IF EXISTS `accion_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accion_user` (
  `id_accion` int(11) NOT NULL AUTO_INCREMENT,
  `desc_accion` varchar(20) NOT NULL,
  PRIMARY KEY (`id_accion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accion_user`
--

LOCK TABLES `accion_user` WRITE;
/*!40000 ALTER TABLE `accion_user` DISABLE KEYS */;
INSERT INTO `accion_user` VALUES (1,'Registro'),(2,'Modificacion'),(3,'Eliminacion'),(4,'Cambio de Estado');
/*!40000 ALTER TABLE `accion_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `f_reg_ped` datetime NOT NULL,
  `f_prg_ped` date DEFAULT NULL,
  `f_eje_ped` datetime DEFAULT NULL,
  `observaciones` longtext,
  `id_tipo_venta` int(11) NOT NULL,
  `id_estado` int(10) NOT NULL,
  `direccion_inst` varchar(64) NOT NULL,
  `id_distrito` int(8) NOT NULL,
  `num_domicilio` int(8) NOT NULL,
  `mza_lte` varchar(20) DEFAULT NULL,
  `id_servicio` int(8) NOT NULL,
  `cant_eq` int(8) DEFAULT '1',
  `descuento` float(10,2) DEFAULT NULL,
  `f_liq_ped` datetime DEFAULT NULL,
  `f_dev_ped` datetime DEFAULT NULL,
  `p_contacto` varchar(50) DEFAULT NULL,
  `t_contacto` int(9) DEFAULT NULL,
  `d_contacto` int(8) DEFAULT NULL,
  `conforme` int(1) DEFAULT NULL,
  `h_inicio` varchar(5) DEFAULT NULL,
  `h_fin` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `FK_pedido_cliente` (`id_cliente`),
  KEY `FK_pedido_tipo_venta` (`id_tipo_venta`),
  KEY `FK_pedido_estado` (`id_estado`),
  KEY `FK_pedido_dir_inst` (`direccion_inst`),
  KEY `FK_pedido_distrito` (`id_distrito`),
  KEY `FK_pedido` (`id_vendedor`),
  KEY `FK_pedido_servicio` (`id_servicio`),
  CONSTRAINT `FK_pedido` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedor` (`id_vendedor`) ON UPDATE CASCADE,
  CONSTRAINT `FK_pedido_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON UPDATE CASCADE,
  CONSTRAINT `FK_pedido_distrito` FOREIGN KEY (`id_distrito`) REFERENCES `distrito` (`id_distrito`) ON UPDATE CASCADE,
  CONSTRAINT `FK_pedido_estado` FOREIGN KEY (`id_estado`) REFERENCES `pedido_estado` (`id_estado`) ON UPDATE CASCADE,
  CONSTRAINT `FK_pedido_servicio` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id_servicio`) ON UPDATE CASCADE,
  CONSTRAINT `FK_pedido_tipo_venta` FOREIGN KEY (`id_tipo_venta`) REFERENCES `tipo_venta` (`id_tipo_venta`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,36,1,'2009-04-26 19:52:00',NULL,NULL,'NO HAY',1,1,'JUNIN',54,802,'MZA A',3,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,36,1,'2009-04-26 20:15:00',NULL,NULL,'',1,1,'JUNIN',54,802,'MZA A',2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,36,1,'2009-04-26 20:20:00',NULL,NULL,'',1,1,'JUNIN',54,802,'MZA A',3,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,36,2,'2009-04-26 20:24:00',NULL,NULL,'',1,1,'JUNIN',54,802,'MZA A',3,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,36,1,'2009-04-26 20:30:00',NULL,NULL,'',1,1,'JUNIN',54,802,'MZA A',2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,40,1,'2009-07-11 15:28:00',NULL,NULL,'TEST',1,1,'LIMA',55,234,'MZA A',2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,36,1,'2010-03-08 22:02:00',NULL,NULL,'EERR',1,1,'SSSS',64,123,'1DS',2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,48,1,'2011-04-22 05:32:00',NULL,NULL,'SE ADQUIERE 2 PAQUETES CABLE ESTELAR',2,1,'JUNIN',17,854,'A',3,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,48,1,'2011-04-22 11:47:00',NULL,NULL,'NINGUNA',1,1,'NINGUNA',8,13,'A',2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tecnico`
--

DROP TABLE IF EXISTS `tecnico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tecnico` (
  `id_tecnico` int(11) NOT NULL AUTO_INCREMENT,
  `cod_tecnico` varchar(20) DEFAULT NULL,
  `ap_paterno` varchar(50) NOT NULL,
  `ap_materno` varchar(50) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `telefono_casa` int(11) DEFAULT NULL,
  `telefono_celular` int(11) DEFAULT NULL,
  `dni` varchar(20) NOT NULL,
  `estado` int(1) DEFAULT '1',
  PRIMARY KEY (`id_tecnico`),
  UNIQUE KEY `idx_dni_tecnico` (`dni`(8))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecnico`
--

LOCK TABLES `tecnico` WRITE;
/*!40000 ALTER TABLE `tecnico` DISABLE KEYS */;
INSERT INTO `tecnico` VALUES (1,'SIS000','SISTEMA','---','---',NULL,0,'',1),(2,'SIS001','Mendoza','Miranda','Sergio',1232131,2131231,'231312311',1),(3,'SIS002','Perez','Perez','Luis',2312312,0,'SIS000',1);
/*!40000 ALTER TABLE `tecnico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keymap`
--

DROP TABLE IF EXISTS `keymap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keymap` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `key` varchar(250) NOT NULL,
  `ip` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keymap`
--

LOCK TABLES `keymap` WRITE;
/*!40000 ALTER TABLE `keymap` DISABLE KEYS */;
INSERT INTO `keymap` VALUES (1,'ABQIAAAATU_QaAK6ctarcM0DWuBfxRSQuWl4BUHKt_WaBHfoT2LV0p9Q7xSTz6dgrNppflWWfrx_jF4_SY4OFA','10.200.0.2'),(4,'ABQIAAAATU_QaAK6ctarcM0DWuBfxRQ0gWU82O-wO9E2ULsHTIXZduCRqBRdrwR6nMBKYy_FvZd3YJ48fmsEBA','190.43.71.228'),(5,'ABQIAAAAi9oNr2NOq720SyjJ7NHDyhQuCsXjp19U-h8FIf2drImgVbTjCxRM0HfpFbTRoOVusw2L-wSZqkMohg','201.240.51.117'),(6,'ABQIAAAAi9oNr2NOq720SyjJ7NHDyhT1pbgs9Eq_S4EDVBbgygFa3txDCRQljTXyHQ5mv9GInzoGzeBzk2OcuA','201.240.42.224'),(7,'ABQIAAAAi9oNr2NOq720SyjJ7NHDyhTkdTLH1kqsSNC8qOhnCPuAcm3CPxT6vZXcmYlBwKRu97lpZJisXSkQvQ','190.43.71.57');
/*!40000 ALTER TABLE `keymap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_cliente`
--

DROP TABLE IF EXISTS `tipo_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_cliente` (
  `id_tipo_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_cliente` varchar(30) NOT NULL,
  PRIMARY KEY (`id_tipo_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_cliente`
--

LOCK TABLES `tipo_cliente` WRITE;
/*!40000 ALTER TABLE `tipo_cliente` DISABLE KEYS */;
INSERT INTO `tipo_cliente` VALUES (1,'Residencial'),(2,'Comercial - Hoteles, Hostales');
/*!40000 ALTER TABLE `tipo_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_pedido`
--

DROP TABLE IF EXISTS `historico_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historico_pedido` (
  `id_historico` int(8) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_accion` int(11) NOT NULL,
  `f_movimiento` datetime NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `modulo` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_historico`),
  KEY `FK_historico_accion` (`id_accion`),
  KEY `FK_historico_usuario` (`id_user`),
  KEY `FK_historico_cliente` (`id_pedido`),
  CONSTRAINT `FK_historico_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON UPDATE CASCADE,
  CONSTRAINT `FK_historico_ped_accion` FOREIGN KEY (`id_accion`) REFERENCES `accion_user` (`id_accion`) ON UPDATE CASCADE,
  CONSTRAINT `FK_historico_ped_user` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_pedido`
--

LOCK TABLES `historico_pedido` WRITE;
/*!40000 ALTER TABLE `historico_pedido` DISABLE KEYS */;
INSERT INTO `historico_pedido` VALUES (1,1,1,'2009-04-26 19:52:00',1,'Venta Prod. y Servicios'),(2,1,1,'2009-04-26 20:15:00',2,'Venta Prod. y Servicios'),(3,1,1,'2009-04-26 20:20:00',3,'Venta Prod. y Servicios'),(4,1,1,'2009-04-26 20:24:00',4,'Venta Prod. y Servicios'),(5,1,1,'2009-04-26 20:30:00',5,'Venta Prod. y Servicios'),(6,1,1,'2009-07-11 15:28:00',6,'Venta Prod. y Servicios'),(7,1,1,'2010-03-08 22:02:00',7,'Venta Prod. y Servicios'),(8,1,1,'2011-04-22 05:32:00',8,'Venta Prod. y Servicios'),(9,1,1,'2011-04-22 11:47:00',9,'Venta Prod. y Servicios');
/*!40000 ALTER TABLE `historico_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabecera`
--

DROP TABLE IF EXISTS `cabecera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabecera` (
  `id_cabecera` int(10) NOT NULL AUTO_INCREMENT,
  `nom_cabecera` varchar(50) NOT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `latitud` float(10,6) DEFAULT NULL,
  `longitud` float(10,6) DEFAULT NULL,
  `id_ered` int(11) NOT NULL,
  `flag` tinyint(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_cabecera`),
  UNIQUE KEY `idx_nom_cabecera` (`nom_cabecera`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabecera`
--

LOCK TABLES `cabecera` WRITE;
/*!40000 ALTER TABLE `cabecera` DISABLE KEYS */;
INSERT INTO `cabecera` VALUES (1,'CAB0001','ALFREDO MENDIOLA / CARLOS IZAGUIRRE',-11.990293,-77.064369,0,1),(12,'HEAD000001','AV. AREQUIPA CON AV. ANGAMOS',-12.112865,-77.030037,0,1),(13,'CABSM1','Av La Marina 134',-12.077176,-77.093422,0,1),(14,'Cabeceracallao','Colonia 123',-12.065045,-77.130547,0,1);
/*!40000 ALTER TABLE `cabecera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_civil`
--

DROP TABLE IF EXISTS `estado_civil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_civil` (
  `id_estado_civil` int(11) NOT NULL AUTO_INCREMENT,
  `desc_estado_civil` varchar(20) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_estado_civil`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_civil`
--

LOCK TABLES `estado_civil` WRITE;
/*!40000 ALTER TABLE `estado_civil` DISABLE KEYS */;
INSERT INTO `estado_civil` VALUES (1,'Soltero',1),(2,'Casado',1),(3,'Viudo',1),(4,'Divorciado',1);
/*!40000 ALTER TABLE `estado_civil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `ap_paterno` varchar(50) NOT NULL,
  `ap_materno` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_tipo_doc` int(11) NOT NULL,
  `num_documento` varchar(20) NOT NULL,
  `telefono_casa` int(11) NOT NULL,
  `telefono_trabajo` int(11) NOT NULL,
  `telefono_celular` int(11) NOT NULL,
  `id_tipo_vivienda` int(11) NOT NULL,
  `sexo` char(1) NOT NULL,
  `profesion` varchar(50) DEFAULT NULL,
  `empresa` varchar(50) DEFAULT NULL,
  `cargo` varchar(40) DEFAULT NULL,
  `id_tipo_relab` int(11) NOT NULL,
  `id_estado_civil` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `direccion_postal` varchar(64) CHARACTER SET latin1 NOT NULL,
  `id_distrito` int(8) NOT NULL,
  `num_domicilio` int(10) NOT NULL,
  `mza_lte` varchar(20) DEFAULT NULL,
  `conyuge` varchar(60) DEFAULT NULL,
  `ref_familiar` varchar(100) DEFAULT NULL,
  `oficina` varchar(50) DEFAULT NULL,
  `piso` varchar(3) DEFAULT NULL,
  `f_registro` date DEFAULT NULL,
  `id_vendedor` int(11) DEFAULT NULL,
  `id_tipo_cliente` int(11) NOT NULL,
  `codcli` varchar(45) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `NewIndex1` (`id_tipo_doc`,`num_documento`),
  KEY `FK_tipo_vivienda` (`id_tipo_vivienda`),
  KEY `FK_relacion_laboral` (`id_tipo_relab`),
  KEY `FK_estado_civil` (`id_estado_civil`),
  KEY `FK_cliente_distrito` (`id_distrito`),
  KEY `FK_cliente_vendedor` (`id_vendedor`),
  KEY `FK_tippo_cliente` (`id_tipo_cliente`),
  CONSTRAINT `FK_cliente_distrito` FOREIGN KEY (`id_distrito`) REFERENCES `distrito` (`id_distrito`) ON UPDATE CASCADE,
  CONSTRAINT `FK_cliente_vendedor` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedor` (`id_vendedor`) ON UPDATE CASCADE,
  CONSTRAINT `FK_estado_civil` FOREIGN KEY (`id_estado_civil`) REFERENCES `estado_civil` (`id_estado_civil`) ON UPDATE CASCADE,
  CONSTRAINT `FK_relacion_laboral` FOREIGN KEY (`id_tipo_relab`) REFERENCES `relacion_laboral` (`id_tipo_relab`) ON UPDATE CASCADE,
  CONSTRAINT `FK_tipo_documento` FOREIGN KEY (`id_tipo_doc`) REFERENCES `tipo_documento` (`id_tipo_doc`) ON UPDATE CASCADE,
  CONSTRAINT `FK_tipo_vivienda` FOREIGN KEY (`id_tipo_vivienda`) REFERENCES `tipo_vivienda` (`id_tipo_vivienda`) ON UPDATE CASCADE,
  CONSTRAINT `FK_tippo_cliente` FOREIGN KEY (`id_tipo_cliente`) REFERENCES `tipo_cliente` (`id_tipo_cliente`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (36,'DE LA TORRE','GANOZA','RICARDO',1,'10087413',2102200,0,999060034,1,'M','NINGUNA','NINGUNA','NINGUNA',1,2,'test@gmail.com','JUNIN',54,802,'MZA A',NULL,NULL,NULL,NULL,NULL,NULL,1,'COD36'),(37,'SSDSDSD','SDFDF','SFFDF',1,'4545454',0,0,0,2,'M','','','',2,1,'usuario@dominio.com','DFDFDF',55,3434,'',NULL,NULL,NULL,NULL,NULL,NULL,1,'COD37'),(38,'ERETEY','PEREZ','JUAN',1,'121213',0,0,0,1,'M','','','',1,1,'usuario@dominio.com','WEWEW',8,343,'',NULL,NULL,NULL,NULL,NULL,NULL,1,'COD38'),(39,'TESTING','TESTING','TESTING',2,'123456',0,0,0,1,'M','','','',1,1,'usuario@dominio.com','DIRECCION',55,151,'MZA Z',NULL,NULL,NULL,NULL,NULL,NULL,1,'COD39'),(40,'TEST PA','TEST MA','TEST NOMBRE',1,'123456',0,0,0,1,'M','','','',1,1,'usuario@dominio.com','LIMA',55,234,'MZA A',NULL,NULL,NULL,NULL,NULL,NULL,1,'COD40'),(43,'DE LA TORRE','GANOZA','PRUEBA',1,'7654321',2102200,0,99990909,1,'M','ELECTRONICA','NINGUNA','TECNICO3',1,2,'rdelatorreg@gmail.com','JUNIN 401',58,401,'MZA A','FLOR PAREDES','NINGUNA','NINGUNA','4','2009-02-16',1,1,'COD43'),(44,'HERNANDEZ','MIRANDA','ERNESTO',1,'121234',34343434,0,0,1,'M','','','',1,1,'usuario@dominio.com','SAN FELIPE',6,709,'MZA/LTE...','','','','2','2009-03-04',1,1,'COD44'),(45,'PRUEBA','PRUEBA','PRUEBAEEE',1,'55555',0,0,0,1,'M','','','',2,1,'usuario@dominio.com','HUHU',54,245,'MZA/LTE...','','','','PIS','2009-03-11',1,1,'COD45'),(46,'HENRY','PENA','DAVILA',1,'9551303',5378435,0,0,1,'M','','','',2,2,'henry@desnetel.com','JR. LOS TULIPANES',6,301,'MZA/LTE...','','','','PIS','2009-03-15',1,1,'COD46'),(47,'TSUKAZAN','NAKAIMA','SUSANA',1,'23454546',12345456,0,98868676,1,'F','DSFSDF','ASDFASDAS','ASEDAE',1,1,'test@test.com','TESY',32,121,'A','','','','2','2009-07-11',1,1,'COD47'),(48,'DE LA TORRE','GANOZA','MERLIN',1,'12345678',2105526,0,99999999,1,'M','NINGUNA','ARYGE','TECNICO',1,1,'ninguno@gmail.com','AV SAN FELIPE',34,123,'A','','NINGUNA DIRECCION FAMILIAR','LIMA','1','2011-04-21',1,1,'COD48'),(57,'TESTAPELLIDOPA','TESTAPELLIDOMA','TESTNOMBRE',1,'12345677',1212123,0,121212122,1,'M','','','',2,1,'','LIMA',53,123,'Q','','','','1','2011-04-22',1,1,'COD57');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docsis_modem`
--

DROP TABLE IF EXISTS `docsis_modem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docsis_modem` (
  `modem_macaddr` varchar(15) NOT NULL DEFAULT '',
  `ipaddr` varchar(16) NOT NULL DEFAULT '',
  `cmts_vlan` mediumint(9) NOT NULL DEFAULT '0',
  `serialnum` varchar(30) NOT NULL DEFAULT '',
  `subnum` bigint(20) unsigned NOT NULL DEFAULT '0',
  `config_file` varchar(50) NOT NULL DEFAULT '',
  `cfg_freq_ds` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_freq_us` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_auth` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_sclass` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_sflow_ds` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_sflow_us` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_sflow_sp1` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_sflow_sp2` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_bpi` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_filter1` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_filter2` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_filter3` int(10) unsigned NOT NULL DEFAULT '0',
  `cfg_static_ip` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `cfg_dynamic_ip` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`modem_macaddr`),
  UNIQUE KEY `serialnum` (`serialnum`),
  UNIQUE KEY `ipaddr` (`ipaddr`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docsis_modem`
--

LOCK TABLES `docsis_modem` WRITE;
/*!40000 ALTER TABLE `docsis_modem` DISABLE KEYS */;
INSERT INTO `docsis_modem` VALUES ('000f9f1ac54c','0.0.38.221',0,'cm0006',0,'cortado.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('00152f468544','0.0.38.220',0,'cm0005',0,'sabado2.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('000f9f1ac0a8','0.0.38.219',0,'cm0004',0,'CC500Sim.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('001095123527','0.0.38.218',0,'cm0003',0,'s500x128.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('0011804DFEB6','0.0.38.217',0,'cm0002',0,'S256x64.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('0010950b597e','0.0.38.216',0,'cm0001',0,'sabado2.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('009064afdab1','0.0.38.214',0,'cm100',0,'sabado2.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('000f9f8af3aa','0.0.38.215',0,'cm200',0,'sabado2.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('0010950b5dd8','0.0.38.222',0,'cm0007',0,'s500x128.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0),('0010950f7969','0.0.38.223',0,'cm0008',0,'s500x128.md5',0,0,0,0,0,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `docsis_modem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_venta`
--

DROP TABLE IF EXISTS `tipo_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_venta` (
  `id_tipo_venta` int(11) NOT NULL AUTO_INCREMENT,
  `desc_tipo_venta` varchar(20) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_tipo_venta`),
  UNIQUE KEY `id_tipo_venta` (`id_tipo_venta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_venta`
--

LOCK TABLES `tipo_venta` WRITE;
/*!40000 ALTER TABLE `tipo_venta` DISABLE KEYS */;
INSERT INTO `tipo_venta` VALUES (1,'Directo',1),(2,'Oficina',1),(3,'Otro',1);
/*!40000 ALTER TABLE `tipo_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'truedataerp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-04-22 20:50:07
