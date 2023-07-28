import React from 'react';
import "./styles/Comanda.css";

const Comanda = ({ pedido }) => {
    return (
        <table className='comandaTable'>
            <tbody>
                <tr>
                    {pedido.mesa !== undefined ? (
                        <>
                            <th className='headerTable' colSpan={3}>
                                Mesa : {pedido.mesa}
                            </th>
                            <th className='headerTable'>{pedido.horapedido}</th>
                        </>
                    ) : <>
                        <th className='headerTable' colSpan={1}>Direccion: {pedido.adress}</th>
                        <th className='headerTable' colSpan={1}>Cliente: {pedido.customer}</th>
                        <th className='headerTable' colSpan={2}>Hora {pedido.time}</th>
                    </>
                    }
                </tr>
                <tr>
                    <th>Cantidad</th>
                    <th>Plato</th>
                    <th>$</th>
                    <th>Estado</th>
                </tr>
                {pedido.platos ? (
                    pedido.platos.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{item.quantity}</td>
                            <td>
                                {item.parrilla === true
                                    ? `${item.nombre} ${item.notes}`
                                    : item.pasta === true
                                        ? item.nombre === "Tallarines"
                                            ? `${item.nombre} ${item.notes}`
                                            : `${item.nombre} ${item.filling} ${item.sauce} ${item.notes}`
                                        : `${item.nombre} ${item.notes}`}
                            </td>
                            <td>{item.precio}</td>
                            {!item.pronto ? <td>En preparacion</td> : <td>Entregado</td>}
                            <td><button>CAMBIAR ESTADO</button></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No hay ningún plato en este pedido.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Comanda;
