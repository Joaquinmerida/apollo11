import React, { useState, useEffect } from 'react'
import Comanda from '../components/Comanda'
import "./styles/VerPedidos.css"
import FirebaseService from '../FirebaseService'

const VerPedidos = () => {


    const [todos, setTodos] = useState([])
    const [data, setData] = useState("")

    useEffect(() => {
        find()
    }, [])


    let find = async () => {
        const data = await FirebaseService.getPedidos();
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const pedido = {
        mesa: '1',
        horapedido: '15:00',
        items: [
            { plato: 'Nombre plato 1', estado: 'Pendiente', precio: 10.99 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            // Más items del pedido...
        ],
    };

    const pedido2 = {
        mesa: '3',
        horapedido: '12:00',
        items: [
            { plato: 'Nombre plato 1', estado: 'Pendiente', precio: 10.99 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            { plato: 'Nombre plato 2', estado: 'En preparación', precio: 12.50 },
            // Más items del pedido...
        ],
    };



    if (!pedido) {
        return <div>Cargando pedido...</div>; // O algún mensaje de error o estado de carga
    }

    return (
        <div className='comandasWrapper'>
            <Comanda pedido={pedido} />
            <Comanda pedido={pedido2} />
        </div>
    )
}

export default VerPedidos