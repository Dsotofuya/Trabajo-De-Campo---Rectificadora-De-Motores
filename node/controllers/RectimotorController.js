import OrdenModel from "../models/OrdenModel.js";

// Metodos

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
        const order = await OrdenModel.findAll({
            where: { cc_persona: req.params.cc_persona }
        })
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