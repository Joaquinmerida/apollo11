import React from 'react'
import "./styles/ItemComanda.css"

const ItemComanda = ({plato, onDelete}) => {
    return (
        <tr className='comandaRow'>
            <td>{plato.quantity}</td>
            <td>{plato.nombre} {plato.sauce} {plato.notes}</td>
            <td>${plato.precio}</td>
            <td><button onClick={()=>onDelete(plato.nombre)}>X</button></td>
        </tr>
    )
}

export default ItemComanda