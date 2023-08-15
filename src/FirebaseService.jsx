import React from 'react'
import { db } from './Firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const pedidosRef = collection(db, "Pedidos")

class FirebaseService {

    addPedido = (newPedido) => {
        return addDoc(pedidosRef, newPedido);
    }

    updatePedido = (id, updatePedido) => {
        const pedidosDoc = doc(db, "Pedidos", id)
        return updateDoc(pedidosDoc, updatePedido)
    }

    updatePlatoInPedido = async (pedidoId, platoIndex, updatedPlato) => {
        try {
            const pedidoDocRef = doc(db, 'Pedidos', pedidoId);
            const pedidoDoc = await getDoc(pedidoDocRef);

            if (pedidoDoc.exists()) {
                const updatedPlatos = pedidoDoc.data().platos.map((plato, index) =>
                    index === platoIndex ? { ...plato, ...updatedPlato } : plato
                );

                await updateDoc(pedidoDocRef, { platos: updatedPlatos });
            } else {
                console.error("Pedido not found.");
            }
        } catch (error) {
            console.error("Error updating dish:", error);
        }
    };

    deletePedido = (id) => {
        const pacienteDoc = doc(db, "Pacientes", id)
        return deleteDoc(pacienteDoc)
    }

    getPedidos = () => {
        return getDocs(pedidosRef)
    }
    getPedido = (id) => {
        const pedidoDoc = doc(db, "Pedidos", id);
        return getDocs(pedidoDoc);
    }
}

export default new FirebaseService()