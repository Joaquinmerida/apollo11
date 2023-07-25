import React from 'react'
import { db } from './Firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const pedidosRef = collection(db, "Pedidos")

class FirebaseService {

    addPedido = (newPedido) =>{
        return addDoc(pedidosRef, newPedido);
    }

    updatePedido = (id, updatePaciente) => {
        const pacienteDoc = doc(db, "Pacientes", id)
        return updateDoc(pacienteDoc, updatePaciente)
    }

    deletePedido = (id) => {
        const pacienteDoc = doc(db, "Pacientes", id)
        return deleteDoc(pacienteDoc)
    }

    /*getPedido = () =>{
        return getDocs(pedidosRef)
    }*/

    getPedido = (id) => {
        const pacienteDoc = doc(db, "Pacientes", id);
        return getDocs(pacienteDoc);
    }
}

export default new FirebaseService()