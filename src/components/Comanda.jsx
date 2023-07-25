import React from 'react'
import "./styles/Comanda.css"


const Comanda = ({ pedido }) => {
    return (
        <table className='comandaTable'>
            <tbody>
                <tr>
                    <th className='headerTable' colSpan={3}>Mesa seleccionada: {pedido.mesa}</th>
                    <th className='headerTable'> {pedido.horapedido}</th>
                </tr>
                <tr>
                    <th>N°</th>
                    <th>Plato</th>
                    <th>Estado</th>
                    <th>$</th>
                </tr>
                {pedido.items.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.plato}</td>
                        <td>{item.estado}</td>
                        <td>{item.precio}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Comanda