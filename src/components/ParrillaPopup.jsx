import React, { useState } from 'react';
import "./styles/PastaPopup.css"

const DishPopup = ({ dishName, onSubmit, onCancel }) => {
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');


    const handleSubmit = () => {
        const dishData = {
            name: dishName,
            quantity: quantity,
            notes: notes
        };
        onSubmit(dishData);
    };

    return (
        <div className="dish-popup-overlay">
            <div className="dish-popup">
                <h3>{dishName}</h3>
                <label>Cantidad:</label> <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <label>Notas:</label> <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                <div className="dish-popup-buttons">
                    <button onClick={handleSubmit} >Agregar a la orden</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default DishPopup;