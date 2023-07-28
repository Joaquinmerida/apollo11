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

    if (todos && todos.length > 0) {
        return (
            <div className='comandasWrapper'>
                {todos.map((plato, index) => (
                    <Comanda
                        key={plato.id}
                        pedido={plato}
                    />
                ))}
            </div>
        );
    } else {
        return <div>No hay ningun pedido...</div>;
    }
}

export default VerPedidos;