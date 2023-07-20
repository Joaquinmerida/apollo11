import React from 'react'
import { useState } from 'react'
import "./styles/TomarPedidos.css"
import ItemComanda from '../components/itemComanda'
import platos from '../assets/Platos'

const TomarPedidos = () => {

    const [delivery, setDelivery] = useState(true)

    const botonDelivery = { backgroundColor: 'cadetblue' }
    const botonMesa = { backgroundColor: 'burlywood' }

    return (
        <>
            <h1>Nuevo Pedido</h1>
            <div className='comandaPedidoWrapper'>
                {delivery === true ? (<button style={botonDelivery} className='switchDelivery' onClick={() => setDelivery(false)}> Mesa</button>) : <button style={botonMesa} className='switchDelivery' onClick={() => setDelivery(true)}> Delivery</button>}
                {delivery === true ? (<div><label>Mesa n° <input type="text" /></label></div>) : <div className='comandaHeader'><label>Direccion:</label><input type="text" /> <label>Nombre:</label><input type="text" /> <label>Hora:</label><input type="text" /></div>}
                <table className='platosWrapper'>
                    {/*<tbody>
                        {platos.map((plato, index) => (
                            <ItemComanda
                                key={index}
                                nombre={plato.nombre}
                                cantidad={plato.cantidad}
                                precio={plato.precio}
                            />
                        ))}
                        </tbody>*/}
                </table>
                <button>Agregar pedido</button>
            </div>
            <div className='botonesWrapper'>
                <div className="botonesPasta botones">
                    <h3>Pastas</h3>
                    {platos.map((plato, index) => {
                        if (plato.pasta === true) {
                            return <button key={index}>{plato.nombre}</button>;
                        }
                        return null;
                    })}
                </div>
                <div className="botonesParrilla botones">
                    <h3>Parrilla</h3>
                    {platos.map((plato, index) => {
                        if (plato.parrilla === true) {
                            return <button key={index}>{plato.nombre}</button>;
                        }
                        return null;
                    })}
                </div>
                <div className="botonesMinutas botones">
                    <h3>Minutas</h3>
                    {platos.map((plato, index) => {
                        if (plato.minutas === true) {
                            return <button key={index}>{plato.nombre}</button>;
                        }
                        return null;
                    })}
                </div>
            </div>
        </>
    );
}

export default TomarPedidos;