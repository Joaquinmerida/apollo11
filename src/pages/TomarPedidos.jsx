import React, { useState, useCallback } from 'react'
import "./styles/TomarPedidos.css"
import platos from '../assets/Platos'
import { serverTimestamp, addDoc, collection, doc } from '@firebase/firestore'
import { db } from '../Firebase'
import PastaPopup from '../components/PastaPopup'
import ParrillaPopup from "../components/ParrillaPopup"
import ItemComanda from "../components/ItemComanda"
import FirebaseService from '../FirebaseService'

const TomarPedidos = () => {

    const [delivery, setDelivery] = useState(true);
    const [platosPedido, setPlatosPedido] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const botonMesa = { backgroundColor: 'burlywood' }
    const botonDelivery = { backgroundColor: 'cadetblue' }


    // Function to handle when a dish button is clicked
    const handleDishClick = (dishName) => {
        setShowPopup(true);
        setSelectedDish(dishName);
    };

    // Function to handle the dish data submitted from the popup
    const handleDishSubmit = (dishData) => {
        console.log('Dish data:', dishData);
        setShowPopup(false);
        newDish(dishData);
    };

    const handleCancel = () => {
        setShowPopup(false);
        setSelectedDish(null);
    };

    const handleDelete = useCallback((index) => {
        setPlatosPedido(prevPlatosPedido => {
            const updatedPlatosPedido = [...prevPlatosPedido];
            updatedPlatosPedido.splice(index, 1);
            return updatedPlatosPedido;
        });
    }, []);


    const handleSubmit = async () => {
        const newPedido = {
            platos: platosPedido,
            date: serverTimestamp(),
        };

        try {
            await FirebaseService.addPedido(newPedido)
            setPlatosPedido([]); // Reiniciar el estado platosPedido después de enviar el pedido
            console.log('Pedido enviado:', newPedido);
        } catch (error) {
            console.error('Error al enviar el pedido:', error);
        }
    };


    const newDish = (name) => {
        const dishToAdd = platos.find((dish) => dish.nombre === name.name);
        if (dishToAdd) {
            if (name.pasta) {
                const newDishOrder = {
                    ...dishToAdd,
                    quantity: name.quantity,
                    sauce: name.sauce,
                    notes: name.notes,
                }
                setPlatosPedido([...platosPedido, newDishOrder]);
                console.log("New dish added to the order:", newDishOrder);
            } else {
                const newDishOrder = {
                    ...dishToAdd,
                    quantity: name.quantity,
                    notes: name.notes,
                }
                setPlatosPedido([...platosPedido, newDishOrder]);
                console.log("New dish added to the order:", newDishOrder);
            }
        }
    }

    return (
        <>
            <h1>Nuevo Pedido</h1>
            <div className='comandaPedidoWrapper'>
                {delivery === true ? (<button style={botonDelivery} className='switchDelivery' onClick={() => setDelivery(false)}> Mesa</button>) : <button style={botonMesa} className='switchDelivery' onClick={() => setDelivery(true)}> Delivery</button>}
                {delivery === true ? (<div className='comandaHeader'><label id='smallLabel'>Número de mesa </label><input id='smallInput' type="number" /></div>) : <div className='comandaHeader'><label>Direccion:</label><input type="text" /> <label>Nombre:</label><input type="text" /> <label>Hora:</label><input type="text" /></div>}
                <table className='platosWrapper'>
                    <tbody>
                        {platosPedido.map((plato, index) => (
                            <ItemComanda
                                plato={plato}
                                key={index}
                                onDelete={() => handleDelete(index)}
                            />
                        ))}
                    </tbody>
                </table>
                <button onClick={handleSubmit}>Agregar pedido</button>
            </div>
            <div className='botonesWrapper'>
                <div className="botonesPasta botones">
                    <h3>Pastas</h3>
                    {platos.map((plato, index) => {
                        if (plato.pasta === true) {
                            return (
                                <React.Fragment key={index}>
                                    {/* Add the missing return statement */}
                                    <button onClick={() => handleDishClick(plato.nombre)}>{plato.nombre}</button>
                                    {showPopup && selectedDish === plato.nombre && (
                                        <PastaPopup
                                            dishName={plato.nombre}
                                            onSubmit={handleDishSubmit}
                                            onCancel={handleCancel}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="botonesParrilla botones">
                    <h3>Parrilla</h3>
                    {platos.map((plato, index) => {
                        if (plato.parrilla === true) {
                            return (
                                <React.Fragment key={index}>
                                    {/* Add the missing return statement */}
                                    <button onClick={() => handleDishClick(plato.nombre)}>{plato.nombre}</button>
                                    {showPopup && selectedDish === plato.nombre && (
                                        <ParrillaPopup
                                            dishName={plato.nombre}
                                            onSubmit={handleDishSubmit}
                                            onCancel={handleCancel}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="botonesMinutas botones">
                    <h3>Minutas</h3>
                    {platos.map((plato, index) => {
                        if (plato.minutas === true) {
                            return (
                                <React.Fragment key={index}>
                                    {/* Add the missing return statement */}
                                    <button onClick={() => handleDishClick(plato.nombre)}>{plato.nombre}</button>
                                    {showPopup && selectedDish === plato.nombre && (
                                        <ParrillaPopup
                                            dishName={plato.nombre}
                                            onSubmit={handleDishSubmit}
                                            onCancel={handleCancel}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </>
    );
}

export default TomarPedidos;