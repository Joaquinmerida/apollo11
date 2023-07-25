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
    const [total, setTotal] = useState(0);
    const [adress, setAdress] = useState("")
    const [customer, setCustomer] = useState("")
    const [time, setTime] = useState("")
    const [mesa, setMesa] = useState(1)

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
            const deletedItem = updatedPlatosPedido.splice(index, 1)[0];
            const newTotal = total - deletedItem.precio * deletedItem.quantity;
            setTotal(newTotal);
            return updatedPlatosPedido;
        });
    }, [total, setPlatosPedido, setTotal]);

    const handleSubmit = async () => {
        let newPedido = {
            platos: platosPedido,
            date: serverTimestamp(),
        };

        if (!delivery) {
            newPedido = {
                ...newPedido,
                adress: adress,
                customer: customer,
                time: time,
            };
        } else {
            newPedido = {
                ...newPedido,
                mesa: mesa,
            }
        }

        try {
            await FirebaseService.addPedido(newPedido)
            setPlatosPedido([]);
            setTotal(0)
            setAdress("")
            setMesa(1)
            setTime("")
            setCustomer("")
            console.log('Pedido enviado:', newPedido);
        } catch (error) {
            console.error('Error al enviar el pedido:', error);
        }
    };


    const newDish = (name) => {
        const dishToAdd = platos.find((dish) => dish.nombre === name.name);

        if (dishToAdd) {
            let newDishOrder = {
                ...dishToAdd,
                quantity: name.quantity,
            };
            if (name.pasta) {
                newDishOrder = {
                    ...newDishOrder,
                    sauce: name.sauce,
                    notes: name.notes,
                };
            } else {
                newDishOrder = {
                    ...newDishOrder,
                    notes: name.notes,
                };
            }
            setPlatosPedido([...platosPedido, newDishOrder]);
            console.log("New dish added to the order:", newDishOrder);
            setTotal(total + newDishOrder.precio * newDishOrder.quantity);
        }
    };


    return (
        <>
            <h1>Nuevo Pedido</h1>
            <div className='comandaPedidoWrapper'>
                <div className='titleComanda'>
                    {delivery === true ? (<button style={botonDelivery} className='switchDelivery' onClick={() => setDelivery(false)}> Mesa</button>) : <button style={botonMesa} className='switchDelivery' onClick={() => setDelivery(true)}> Delivery</button>}
                    {delivery === true ? (<div className='comandaHeader'><label id='smallLabel'>Número de mesa </label><input onChange={(e) => setMesa(e.target.value)} id='smallInput' type="number" /></div>) : <div className='comandaHeader'><label>Direccion:</label><input onChange={(e) => setAdress(e.target.value)} type="text" /> <label>Nombre:</label><input onChange={(e) => setCustomer(e.target.value)} type="text" /> <label>Hora:</label><input onChange={(e) => setTime(e.target.value)} type="text" /></div>}
                    <table className='platosWrapper'>
                        <tbody>
                            {platosPedido.map((plato, index) => (
                                <ItemComanda
                                    plato={plato}
                                    key={index}
                                    onDelete={() => handleDelete(index)}
                                />
                            ))}
                            <tr className='totalRow'>
                                <td colSpan={2}>Total:</td>
                                <td>${total}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='botonAgregar' onClick={handleSubmit}>Agregar pedido</button>
                </div>
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