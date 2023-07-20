import React from 'react'

const ItemComanda = ({nombre, precio, cantidad}) => {
    return (
        <tr>
            <td>{cantidad}</td>
            <td>{nombre}</td>
            <td>${precio}</td>
            <td> <button>X</button></td>
        </tr>
    )
}

export default ItemComanda