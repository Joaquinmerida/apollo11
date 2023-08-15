import React from 'react';
import "./styles/Comanda.css";
import FirebaseService from '../FirebaseService';
import { useState, useEffect } from 'react';

const Comanda = ({ pedido, updatePedido }) => {


    const handleEntregar = async (platoIndex, currentState) => {
        const updatedItem = { pronto: !currentState };
        try {
            await FirebaseService.updatePlatoInPedido(pedido.id, platoIndex, updatedItem);
            updatePedido(pedido.id, platoIndex, updatedItem);
        } catch (error) {
            console.error("Error updating dish:", error);
        }
    }

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
                            {!item.pronto ? <td className='preparacion'>En preparacion</td> : <td className='pronto'>Entregado</td>}
                            <td><button onClick={() => handleEntregar(index, item.pronto)}>Entregar</button></td>
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
