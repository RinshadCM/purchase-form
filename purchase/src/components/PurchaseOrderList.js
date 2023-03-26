import React, { useEffect, useState } from 'react';
import './PurchaseOrderList.css'

const PurchaseOrderList = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([]);

    useEffect(() => {
        // Code to fetch purchase orders from server
        fetch('http://localhost:5000/api/purchase-orders')
            .then((response) => response.json())
            .then((data) => setPurchaseOrders(data));

    }, []);

    const [purchaseOrderToEdit, setPurchaseOrderToEdit] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEdit = (purchaseOrder) => {
        fetch(`http://localhost:5000/api/purchase-orders/${purchaseOrder.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseOrder),
        })
        .then((response) => response.json())
        .then((updatedPurchaseOrder) => {
            const updatedPurchaseOrders = purchaseOrders.map((po) =>
                po.id === updatedPurchaseOrder.id ? updatedPurchaseOrder : po
            );
            setPurchaseOrders(updatedPurchaseOrders);
        })
        .catch((error) => console.log(error));
    
        setPurchaseOrderToEdit(null);
        setShowEditModal(false);
    };
    

    const handleDelete = (purchaseOrderId) => {
        const updatedPurchaseOrders = purchaseOrders.filter(
            (order) => order.id !== purchaseOrderId
        );
        setPurchaseOrders(updatedPurchaseOrders);
    };


    return (
        <table>
            <thead>
                <tr>
                    <th>Purchase Order Number</th>
                    <th>Purchase Date</th>
                    <th>Inventory Location</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {purchaseOrders.map((purchaseOrder) => (
                    <tr key={purchaseOrder.id}>
                        <td>{purchaseOrder.number}</td>
                        <td>{purchaseOrder.date}</td>
                        <td>{purchaseOrder.inventoryLocation}</td>
                        <td>
                            <button onClick={() => handleEdit(purchaseOrder)}>Edit</button>
                            <button onClick={() => handleDelete(purchaseOrder.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PurchaseOrderList;
