import React, { useState, useEffect } from 'react';
import Comanda from '../components/Comanda';
import "./styles/VerPedidos.css";
import FirebaseService from '../FirebaseService';

const VerPedidos = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        find();
    }, []);

    let find = async () => {
        const data = await FirebaseService.getPedidos();
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    const updatePedido = (pedidoId, updatedPlatoIndex, updatedPlato) => {
        try {
            // Actualizar la lista de pedidos localmente
            const updatedTodos = todos.map(pedido => {
                if (pedido.id === pedidoId) {
                    const updatedPlatos = pedido.platos.map((plato, index) =>
                        index === updatedPlatoIndex ? { ...plato, ...updatedPlato } : plato
                    );
                    return { ...pedido, platos: updatedPlatos };
                }
                return pedido;
            });

            setTodos(updatedTodos);
        } catch (error) {
            console.error("Error updating dish:", error);
        }
    };



    if (todos && todos.length > 0) {
        return (
            <div className='comandasWrapper'>
                {todos.map((plato, index) => (
                    <Comanda
                        key={plato.id}
                        pedido={plato}
                        updatePedido={updatePedido}
                    />
                ))}
            </div>
        );
    } else {
        return <div>No hay ningun pedido...</div>;
    }
}

export default VerPedidos;



// pasar el find como prop y hacer el find despues del await del update