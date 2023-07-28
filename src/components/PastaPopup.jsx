import React, { useState } from 'react';
import "./styles/PastaPopup.css"
import salsas from '../assets/Salsas';

const DishPopup = ({ dishName, onSubmit, onCancel }) => {
    const [quantity, setQuantity] = useState(1);
    const [filling, setFilling] = useState('');
    const [sauce, setSauce] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        const dishData = {
            name: dishName,
            quantity: quantity,
            filling: filling,
            sauce: sauce,
            notes: notes,
        };
        onSubmit(dishData);
    };

    return (
        <div className="dish-popup-overlay">
            <div className="dish-popup">
                <h3>{dishName}</h3>
                <label>Cantidad:</label> <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <label>Relleno: </label><input type="text" value={filling} onChange={(e) => setFilling(e.target.value)} />
                <label>Salsa: </label>
                <select value={sauce} onChange={(e) => setSauce(e.target.value)}>
                    <option value="">Selecciona una salsa</option>
                    {salsas.map((salsa, index) => (
                        <option key={index} value={salsa}>{salsa}</option>
                    ))}
                </select>
                <label>Notas: </label><input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                <div className="dish-popup-buttons">
                    <button onClick={handleSubmit} >Agregar a la orden</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default DishPopup;