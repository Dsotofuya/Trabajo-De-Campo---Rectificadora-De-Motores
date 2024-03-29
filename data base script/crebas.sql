/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     17/07/2022 6:09:07 p. m.                     */
/*==============================================================*/


drop table if exists DETALLES_ORDEN;

drop table if exists DETALLES_REPORTE;

drop table if exists HISTORICOS_MOTORES;

drop table if exists MEDIDAS;

drop table if exists MOTORES;

drop table if exists NUEVOS_REPUESTOS;

drop table if exists ORDENES;

drop table if exists PARTES;

drop table if exists PERSONAS;

drop table if exists REPORTES;

drop table if exists TALLERES;

drop table if exists TRABAJOS;

/*==============================================================*/
/* Table: DETALLES_ORDEN                                        */
/*==============================================================*/
create table DETALLES_ORDEN
(
   ID_DETALLE_ORDEN     int not null AUTO_INCREMENT,
   ID_ORDEN             int not null,
   ID_TRABAJO           int,
   ID_REPUESTO          int,
   ID_PARTE             int,
   CANTIDAD             numeric(3,0),
   primary key (ID_DETALLE_ORDEN)
);

/*==============================================================*/
/* Table: DETALLES_REPORTE                                      */
/*==============================================================*/
create table DETALLES_REPORTE
(
   ID_DETALLE_REPORTE   int not null AUTO_INCREMENT,
   ID_REPORTE           int not null,
   ID_TRABAJO           int not null,
   primary key (ID_DETALLE_REPORTE)
);

/*==============================================================*/
/* Table: HISTORICOS_MOTORES                                    */
/*==============================================================*/
create table HISTORICOS_MOTORES
(
   ID_HISTORICO         int not null AUTO_INCREMENT,
   ID_MEDIDA_INICIAL    int not null,
   ID_MEDIDA_FINAL      int not null,
   ID_DETALLE_ORDEN     int,
   primary key (ID_HISTORICO)
);

/*==============================================================*/
/* Table: MEDIDAS                                               */
/*==============================================================*/
create table MEDIDAS
(
   ID_MEDIDA            int not null AUTO_INCREMENT,
   ID_PARTE             int not null,
   NOMBRE_MEDIDA        varchar(32) not null,
   VALOR_MEDIDA         float(10) not null,
   primary key (ID_MEDIDA)
);

/*==============================================================*/
/* Table: MOTORES                                               */
/*==============================================================*/
create table MOTORES
(
   ID_MOTOR             int not null AUTO_INCREMENT,
   NOMBRE_MOTOR         varchar(32) not null,
   primary key (ID_MOTOR)
);

/*==============================================================*/
/* Table: NUEVOS_REPUESTOS                                      */
/*==============================================================*/
create table NUEVOS_REPUESTOS
(
   ID_REPUESTO          int not null AUTO_INCREMENT,
   NOMBRE_REPUESTO      varchar(32) not null,
   primary key (ID_REPUESTO)
);

/*==============================================================*/
/* Table: ORDENES                                               */
/*==============================================================*/
create table ORDENES
(
   ID_ORDEN             int not null AUTO_INCREMENT,
   ID_MOTOR             int not null,
   ID_TALLER            int not null,
   CC_PERSONA           numeric(15,0) not null,
   PLACA                varchar(6),
   FECHA_RECIBIDO       datetime not null,
   FECHA_ENTREGA        datetime not null,
   ESTADO_ORDEN         varchar(128) not null default 'En Espera',
   primary key (ID_ORDEN)
);

/*==============================================================*/
/* Table: PARTES                                                */
/*==============================================================*/
create table PARTES
(
   ID_PARTE             int not null AUTO_INCREMENT,
   NOMBRE_PARTE         varchar(32) not null,
   primary key (ID_PARTE)
);

/*==============================================================*/
/* Table: PERSONAS                                              */
/*==============================================================*/
create table PERSONAS
(
   CC_PERSONA           numeric(15,0) not null,
   NOMBRES_APELLIDOS    varchar(64) not null,
   TELEFONO_PERSONA     numeric(10,0) not null,
   primary key (CC_PERSONA)
);

/*==============================================================*/
/* Table: REPORTES                                              */
/*==============================================================*/
create table REPORTES
(
   ID_REPORTE           int not null AUTO_INCREMENT,
   CC_PERSONA           numeric(15,0) not null,
   TOTAL                numeric(8,0) not null,
   primary key (ID_REPORTE)
);

/*==============================================================*/
/* Table: TALLERES                                              */
/*==============================================================*/
create table TALLERES
(
   ID_TALLER            int not null AUTO_INCREMENT,
   NOMBRE_TALLER        varchar(64) not null,
   NOMBRE_PROPIETARIO   varchar(64),
   TELEFONO_TALLER      numeric(10,0) not null,
   primary key (ID_TALLER)
);

/*==============================================================*/
/* Table: TRABAJOS                                              */
/*==============================================================*/
create table TRABAJOS
(
   ID_TRABAJO           int not null AUTO_INCREMENT,
   NOMBRE_TRABAJO       varchar(32) not null,
   VALOR_TRABAJO        numeric(10,0) not null,
   primary key (ID_TRABAJO)
);

alter table DETALLES_ORDEN add constraint FK_DET_TRAB_ORD foreign key (ID_TRABAJO)
      references TRABAJOS (ID_TRABAJO) on delete restrict on update restrict;

alter table DETALLES_ORDEN add constraint FK_NUEV_REPUES_DET_ORD foreign key (ID_REPUESTO)
      references NUEVOS_REPUESTOS (ID_REPUESTO) on delete restrict on update restrict;

alter table DETALLES_ORDEN add constraint FK_ORD_DET foreign key (ID_ORDEN)
      references ORDENES (ID_ORDEN) on delete restrict on update restrict;

alter table DETALLES_ORDEN add constraint FK_PART_DET_ORD foreign key (ID_PARTE)
      references PARTES (ID_PARTE) on delete restrict on update restrict;

alter table DETALLES_REPORTE add constraint FK_DET_REP foreign key (ID_REPORTE)
      references REPORTES (ID_REPORTE) on delete restrict on update restrict;

alter table DETALLES_REPORTE add constraint FK_DET_TRAB_REP foreign key (ID_TRABAJO)
      references TRABAJOS (ID_TRABAJO) on delete restrict on update restrict;

alter table HISTORICOS_MOTORES add constraint FK_DET_TRAB_HIST foreign key (ID_DETALLE_ORDEN)
      references DETALLES_ORDEN (ID_DETALLE_ORDEN) on delete restrict on update restrict;

alter table HISTORICOS_MOTORES add constraint FK_MED_FIN_HIST foreign key (ID_MEDIDA_FINAL)
      references MEDIDAS (ID_MEDIDA) on delete restrict on update restrict;

alter table HISTORICOS_MOTORES add constraint FK_MED_INI_HIST foreign key (ID_MEDIDA_INICIAL)
      references MEDIDAS (ID_MEDIDA) on delete restrict on update restrict;

alter table MEDIDAS add constraint FK_PART_MED foreign key (ID_PARTE)
      references PARTES (ID_PARTE) on delete restrict on update restrict;

alter table ORDENES add constraint FK_MOT_ORD foreign key (ID_MOTOR)
      references MOTORES (ID_MOTOR) on delete restrict on update restrict;

alter table ORDENES add constraint FK_PER_ORD foreign key (CC_PERSONA)
      references PERSONAS (CC_PERSONA) on delete restrict on update restrict;

alter table ORDENES add constraint FK_TALL_ORD foreign key (ID_TALLER)
      references TALLERES (ID_TALLER) on delete restrict on update restrict;

alter table REPORTES add constraint FK_REP_PER foreign key (CC_PERSONA)
      references PERSONAS (CC_PERSONA) on delete restrict on update restrict;

