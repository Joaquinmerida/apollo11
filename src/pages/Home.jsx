import React from 'react'
import { Link } from 'react-router-dom'
import "./styles/Home.css"

const Home = () => {
return (
    <>
    <h1 className='title'>Restaurante A11</h1>
    <div id="homeButtons">
        <Link to="/tomarPedido">Tomar Pedidos</Link>
        <Link to="/verPedidos">Ver Pedidos</Link>
        <Link to="/caja">Caja</Link>
    </div>
    </>
)
}

export default Home