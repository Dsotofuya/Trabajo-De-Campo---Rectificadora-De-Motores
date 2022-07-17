import DetallesOrdenModel from "../models/DetallesOrdenModel.js";
import DetallesReporteModel from "../models/DetallesReporteModel.js";
import HistoricoReportesModel from "../models/HistoricoMotores.js";
import MedidasModel from "../models/MedidasModel.js";
import MotorModel from "../models/MotorModel.js";
import NuevosRepuestosModel from "../models/NuevosRepuestosModel.js";
import OrdenModel from "../models/OrdenModel.js";
import PartesModel from "../models/PartesModel.js";
import PersonasModel from "../models/PersonasModel.js";
import ReportesModel from "../models/ReportesModel.js";
import TalleresModel from "../models/TalleresModel.js";
import TrabajosModel from "../models/TrabajosModel.js";
import db from "../db/RectimotorDB.js";
// Metodos


// Obtener todas las personas
export const getAllPersons = async (req, res) => {
    try {
        const orders = await PersonasModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener Persona Por Cc
export const getPersonById = async (req, res) => {
    try {
        const orders = await await db.query(
            `SELECT * FROM PERSONAS WHERE CC_PERSONA = ${req.params.cc_persona};`);
        res.json(orders[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de persona
export const updatePerson = async (req, res) => {
    try {
        const orders = await PersonasModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear persona
export const createPerson = async (req, res) => {
    try {
        await PersonasModel.create(req.body);
        res.json({ message: "Persona agregada" })
    } catch (error) {
        res.json({ message: error.message })
    }
}









// Mostrar todas las ordenes
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrdenModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Buscar orden por número de orden
export const getOrderByCC = async (req, res) => {
    try {
        //     const order = await OrdenModel.findAll({
        //attributes: ["id_orden", "nombre_motor", "cc_persona", "fecha_recibido", "fecha_entrega", "estado_orden"],
        //            where: { cc_persona: req.params.cc_persona}
        // include: [{model: MOTORES, attributes}]
        //        })
        const order = await db.query(
            `SELECT o.id_orden, m.nombre_motor, o.id_taller, o.cc_persona, o.placa, o.fecha_recibido, o.fecha_entrega, o.estado_orden FROM ORDENES o, MOTORES m WHERE m.ID_MOTOR = o.ID_MOTOR AND o.CC_PERSONA = ${req.params.cc_persona};`
        );
        res.json(order)
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const getReportsDetailsById2 = async (req, res) => {
    try {
        DetallesReporteModel
        ReportesModel.hasMany()
        PersonasModel
        TrabajosModel

        res.json(order)
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const getReportsDetailsById = async (req, res) => {
    try {
        const order = await db.query(
            `Select p.CC_PERSONA, p.NOMBRES_APELLIDOS, p.TELEFONO_PERSONA, r.ID_REPORTE, t.NOMBRE_TRABAJO, t.VALOR_TRABAJO, r.TOTAL 
            From DETALLES_REPORTE dr, TRABAJOS t, REPORTES r, PERSONAS p 
            WHERE dr.ID_TRABAJO = t.ID_TRABAJO 
            AND dr.ID_REPORTE = r.ID_REPORTE 
            and r.CC_PERSONA = p.CC_PERSONA 
            AND dr.ID_REPORTE = ${req.params.id_orden};`
        );
        res.json(order)
    } catch (error) {
        res.json({ message: error.message })
    }
}


//Crear Una Orden 
export const createOrder = async (req, res) => {
    try {
        await OrdenModel.create(req.body)
        res.json({ "message": "orden agregada" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Actualizar orden 
export const updateOrder = async (req, res) => {
    try {
        await OrdenModel.update(req.body, {
            where: { id_orden: req.params.id_orden }
        })
        res.json({ message: "Orden actualizada" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Eliminar Orden
export const deleteOrder = async (req, res) => {
    try {
        OrdenModel.destroy({
            where:
                { id_orden: req.params.id_orden }
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}


// Mostrar todas los detalles de ordenes
export const getAllOrdersDetails = async (req, res) => {
    try {
        const orders = await DetallesOrdenModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Mostrar todas los detalles de reportes
export const getAllReportsDetails = async (req, res) => {
    try {
        const orders = await DetallesReporteModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Mostrar todas los historicos
export const getAllHistorics = async (req, res) => {
    try {
        const orders = await HistoricoReportesModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Mostrar todas los medidas
export const getAllMedidas = async (req, res) => {
    try {
        const orders = await MedidasModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Mostrar todas los medidas
export const getAllMotors = async (req, res) => {
    try {
        const orders = await MotorModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getAllNuevoRepuesto = async (req, res) => {
    try {
        const orders = await NuevosRepuestosModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getAllParts = async (req, res) => {
    try {
        const orders = await PartesModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getAllReportss = async (req, res) => {
    try {
        const orders = await ReportesModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getAllTalleres = async (req, res) => {
    try {
        const orders = await TalleresModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getAllTrabajos = async (req, res) => {
    try {
        const orders = await TrabajosModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}