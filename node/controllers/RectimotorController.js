import DetallesOrdenModel from "../models/DetallesOrdenModel.js";
import HistoricoReportesModel from "../models/HistoricoMotores.js";
import MedidasModel from "../models/MedidasModel.js";
import MotorModel from "../models/MotorModel.js";
import NuevosRepuestosModel from "../models/NuevosRepuestosModel.js";
import OrdenModel from "../models/OrdenModel.js";
import PartesModel from "../models/PartesModel.js";
import PersonasModel from "../models/PersonasModel.js";
import TalleresModel from "../models/TalleresModel.js";
import TrabajosModel from "../models/TrabajosModel.js";
import db from "../db/RectimotorDB.js";
import UsuariosModel from "../models/UsuariosModel.js";


// Metodos Personas
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
        const orders = await db.query(
            `SELECT * FROM PERSONAS WHERE CC_PERSONA = ${req.params.cc_persona};`);
        res.json(orders[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de persona
export const updatePerson = async (req, res) => {
    try {
        await PersonasModel.update(req.body, {
            where: { cc_persona: req.params.cc_persona }
        })
        res.json({ message: "Persona actualizada" })
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

// Metodos Talleres
// Obtener todos los talleres
export const getAllWorkshops = async (req, res) => {
    try {
        const orders = await TalleresModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener Taller Por id de taller
export const getWorkshopById = async (req, res) => {
    try {
        const orders = await db.query(
            `SELECT * FROM TALLERES WHERE ID_TALLER = ${req.params.id_taller};`);
        res.json(orders[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}


//Obtener  id de taller por el nombre
export const getWorkShopIdByName = async (req, res) => {
    try {
        const orders = await db.query(
            `SELECT ID_TALLER FROM TALLERES WHERE NOMBRE_TALLER = "${req.params.workshop_name}";`);
        res.json(orders[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de un taller
export const updateWorkshop = async (req, res) => {
    try {
        await TalleresModel.update(req.body, {
            where: { id_taller: req.params.id_taller }
        })
        res.json({ message: "Taller actualizado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear taller
export const createWorkshop = async (req, res) => {
    try {
        await TalleresModel.create(req.body);
        res.json({ message: "Taller agregado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Metodos Motores
// Obtener todos los Motores
export const getAllEngines = async (req, res) => {
    try {
        const orders = await MotorModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener Taller Por id de taller
export const getEngineById = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT * FROM MOTORES WHERE ID_MOTOR = ${req.params.id_motor};`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de un taller
export const updateEngine = async (req, res) => {
    try {
        await MotorModel.update(req.body, {
            where: { id_motor: req.params.id_motor }
        })
        res.json({ message: "Motor actualizado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear taller
export const createEngine = async (req, res) => {
    try {
        await MotorModel.create(req.body);
        res.json({ message: "Motor agregado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener Taller Por id de taller
export const getEngineIdByName = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT ID_MOTOR FROM MOTORES WHERE NOMBRE_MOTOR = "${req.params.motor_name}";`);
        res.json(engines[0])
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

//Obtener id de la orden
export const getOrderId = async (req, res) => {
    try {
        const order = await db.query(
            `SELECT (AUTO_INCREMENT-1) AS ID_ORDEN FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dsotofuya_trabajodecampo_rectimotor' AND TABLE_NAME = 'ORDENES';`
        );
        res.json(order[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Buscar orden por número de orden
export const getOrderByCC = async (req, res) => {
    try {
        const order = await db.query(
            `SELECT o.id_orden, m.nombre_motor, o.id_taller, o.cc_persona, o.fecha_recibido, o.fecha_entrega, o.estado_orden FROM ORDENES o, MOTORES m WHERE m.ID_MOTOR = o.ID_MOTOR AND o.CC_PERSONA = ${req.params.cc_persona};`
        );
        res.json(order)
    } catch (error) {
        res.json({ message: error.message })
    }
}


export const getReportsDetailsById = async (req, res) => {
    try {
        const order = await db.query(
            `Select p.CC_PERSONA, p.NOMBRES_APELLIDOS, p.TELEFONO_PERSONA, o.ID_ORDEN, t.NOMBRE_TRABAJO, dor.VALOR_TRABAJO From DETALLES_ORDEN dor, TRABAJOS t, ORDENES o, PERSONAS p WHERE dor.ID_TRABAJO = t.ID_TRABAJO AND dor.ID_ORDEN = o.ID_ORDEN and o.CC_PERSONA = p.CC_PERSONA AND dor.ID_ORDEN = ${req.params.id_orden};`
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
export const getAllMeasures = async (req, res) => {
    try {
        const orders = await MedidasModel.findAll();
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


export const getAllWorks = async (req, res) => {
    try {
        const orders = await TrabajosModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener Taller Por id de taller
export const getWorkIdByName = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT ID_TRABAJO FROM TRABAJOS WHERE NOMBRE_TRABAJO = "${req.params.work_name}";`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener trabajo por id
export const getWorkById = async (req, res) => {
    try {
        const orders = await db.query(
            `SELECT * FROM TRABAJOS WHERE ID_TRABAJO = ${req.params.id_trabajo};`);
        res.json(orders[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Actualizar Datos de trabajo
export const updateWork = async (req, res) => {
    try {
        await TrabajosModel.update(req.body, {
            where: { id_trabajo: req.params.id_trabajo }
        })
        res.json({ message: "Trabajo actualizado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear trabajo
export const createWork = async (req, res) => {
    try {
        await TrabajosModel.create(req.body);
        res.json({ message: "Trabajo agregado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener todos los repuestos
export const getAllNewReplacements = async (req, res) => {
    try {
        const orders = await NuevosRepuestosModel.findAll();
        res.json(orders)
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener id del repuesto por nombre
export const getNewReplacementsNameById = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT ID_REPUESTO FROM NUEVOS_REPUESTOS WHERE NOMBRE_REPUESTO = "${req.params.replacement_name}";`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener repuesto por id
export const getNewReplacementsById = async (req, res) => {
    try {
        const orders = await db.query(
            `SELECT * FROM NUEVOS_REPUESTOS WHERE ID_REPUESTO = ${req.params.id_repuesto};`);
        res.json(orders[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}
//Actualizar Datos de Repuesto
export const updateNewReplacement = async (req, res) => {
    try {
        await NuevosRepuestosModel.update(req.body, {
            where: { id_repuesto: req.params.id_repuesto }
        })
        res.json({ message: "Repuesto actualizado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear repuesto
export const createNewReplacement = async (req, res) => {
    try {
        await NuevosRepuestosModel.create(req.body);
        res.json({ message: "Repuesto agregado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de persona
export const updatePart = async (req, res) => {
    try {
        await PartesModel.update(req.body, {
            where: { id_parte: req.params.id_parte }
        })
        res.json({ message: "Parte actualizada" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear trabajo
export const createPart = async (req, res) => {
    try {
        await PartesModel.create(req.body);
        res.json({ message: "Parte agregada" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener id de una parte por nombre
export const getPartIdByName = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT ID_PARTE FROM PARTES WHERE NOMBRE_PARTE = "${req.params.part_name}";`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener repuesto por id
export const getPartById = async (req, res) => {
    try {
        const orders = await db.query(
            `SELECT * FROM PARTES WHERE ID_PARTE = ${req.params.id_parte};`);
        res.json(orders[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de medida
export const updateMeasures = async (req, res) => {
    try {
        await MedidasModel.update(req.body, {
            where: { id_medida: req.params.id_medida }
        })
        res.json({ message: "medida actualizada" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear medida
export const createMeasures = async (req, res) => {
    try {
        await MedidasModel.create(req.body);
        res.json({ message: "medida agregada" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener id de una parte por nombre
export const getMeasuresIdByName = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT ID_MEDIDA FROM MEDIDAS WHERE NOMBRE_MEDIDA = "${req.params.measure_name}";`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener repuesto por id
export const getMeasuresByIdPart = async (req, res) => {
    try {
        const orders = await db.query(
            `SELECT * FROM MEDIDAS m, PARTES p WHERE m.ID_PARTE = p.ID_PARTE AND m.ID_PARTE = ${req.params.id_parte};`);
        res.json(orders[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Metodos de los detalles de una orden
//Obtener todos los detalles de partes de una orden
export const getAllDetailsParts = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT dor.ID_DETALLE_ORDEN, dor.ID_ORDEN, p.ID_PARTE, p.NOMBRE_PARTE, dor.CANTIDAD FROM DETALLES_ORDEN dor, PARTES p WHERE dor.ID_PARTE = p.ID_PARTE AND dor.ID_PARTE IS NOT NULL AND ID_ORDEN = "${req.params.id_ord}";`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener todos los detalles de repuestos de una orden
export const getAllDetailsReplacements = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT dor.ID_DETALLE_ORDEN, dor.ID_ORDEN, nr.ID_REPUESTO, nr.NOMBRE_REPUESTO, dor.CANTIDAD FROM DETALLES_ORDEN dor, NUEVOS_REPUESTOS nr WHERE dor.ID_REPUESTO = nr.ID_REPUESTO AND dor.ID_REPUESTO IS NOT NULL AND ID_ORDEN = "${req.params.id_ord}";`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener todos los detalles de trabajos de una orden
export const getAllDetailsWorks = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT dor.ID_DETALLE_ORDEN, dor.ID_ORDEN, t.ID_TRABAJO, t.NOMBRE_TRABAJO, dor.VALOR_TRABAJO FROM DETALLES_ORDEN dor, TRABAJOS t WHERE dor.ID_TRABAJO = t.ID_TRABAJO AND dor.ID_TRABAJO IS NOT NULL AND ID_ORDEN = "${req.params.id_ord}";`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de detalles de un trabajo
export const updateDetOrd = async (req, res) => {
    try {
        await DetallesOrdenModel.update(req.body, {
            where: { id_orden: req.params.id_ord }
        })
        res.json({ message: "Detalle de la orden actualizado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear detalle de una orden
export const createDetOrd = async (req, res) => {
    try {
        await DetallesOrdenModel.create(req.body);
        res.json({ message: "Detalle agregado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener todos los detalles de una oden
export const getAllDetails = async (req, res) => {
    try {
        const engines =  await db.query(
            `SELECT * FROM DETALLES_ORDEN WHERE ID_ORDEN = ${req.params.id_ord};`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de detalles de un trabajo
export const updateHistorics = async (req, res) => {
    try {
        await HistoricoReportesModel.update(req.body, {
            where: { id_orden: req.params.id_ord }
        })
        res.json({ message: "Historico actualizado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear detalle de una orden
export const createHistorics = async (req, res) => {
    try {
        await HistoricoReportesModel.create(req.body);
        res.json({ message: "Historico agregado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener todos los historicos de una oden
export const getHistoricsIdOrder = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT * FROM HISTORICOS_MOTORES WHERE ID_ORDEN = ${req.params.id_ord};`);
        res.json(engines[0])
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Actualizar Datos de un usuario
export const updateUser = async (req, res) => {
    try {
        await UsuariosModel.update(req.body, {
            where: { nombre_usuario: req.params.nombre_usuario }
        })
        res.json({ message: "Usuario actualizado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Crear detalle de una orden
export const createUser = async (req, res) => {
    try {
        await UsuariosModel.create(req.body);
        res.json({ message: "Usuario agregado" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Autenticar usuario
export const getAuthuser = async (req, res) => {
    try {
        const engines = await db.query(
            `SELECT CONTRASENIA_USUARIO, TIPO_USUARIO FROM USUARIOS WHERE NOMBRE_USUARIO = "${req.params.nombre_usuario}";`);
            res.json(engines[0]);
    } catch (error) {
        res.json({ message: error.message })
    }
}