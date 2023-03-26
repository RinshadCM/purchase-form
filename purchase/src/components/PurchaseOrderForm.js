import React, { useState } from 'react';
import './PurchaseOrderForm.css'

const PurchaseOrderForm = () => {
    const [vendor, setVendor] = useState('');
    const [purchaseOrderNumber, setPurchaseOrderNumber] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [inventoryLocation, setInventoryLocation] = useState('');
    const [items, setItems] = useState([
      {
        productName: '',
        quantity: 1,
        amount: 0,
        discount: 0,
        tax: 0,
        total: 0,
      },
    ]);
  
    const vendors = [
      { id: 1, name: 'Vendor A' },
      { id: 2, name: 'Vendor B' },
      { id: 3, name: 'Vendor C' },
    ];

    const handleAddItem = () => {
        setItems([...items, { productName: '', quantity: 0, amount: 0, discount: 0, tax: 0, total: 0 }]);
    };

    const handleItemChange = (e, index) => {
        const { name, value } = e.target;
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [name]: value };
        setItems(newItems);
    };

    const handleDeleteItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
          vendor,
          purchaseOrderNumber: `PO_${items.length.toString().padStart(3, '0')}`,
          purchaseDate,
          inventoryLocation,
          items,
        };
      
        try {
          const response = await fetch('http://localhost:5000/api/purchase-orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Select Vendor:
                <select value={vendor} onChange={(e) => setVendor(e.target.value)}>
                    {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                            {vendor.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Purchase Order Number:
                <input type="text" value={`PO_${items.length.toString().padStart(3, '0')}`} readOnly />
            </label>
            <label>
                Purchase Date:
                <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            </label>
            <label>
                Inventory Location:
                <input type="text" value={inventoryLocation} onChange={(e) => setInventoryLocation(e.target.value)} />
            </label>
            {items.map((item, index) => (
                <div key={index}>
                    <h3>Item {index + 1}</h3>
                    <label>
                        Product Name:
                        <input
                            type="text"
                            name="productName"
                            value={item.productName}
                            onChange={(e) => handleItemChange(e, index)}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(e, index)}
                        />
                    </label>
                    <label>
                        Amount:
                        <input type="number" name="amount" value={item.amount} onChange={(e) => handleItemChange(e, index)} />
                    </label>
                    <label>
                        Discount:
                        <input
                            type="number"
                            name="discount"
                            value={item.discount}
                            onChange={(e) => handleItemChange(e, index)}
                        />
                    </label>
                    <label>
                        Tax:
                        <input type="number" name="tax" value={item.tax} readOnly />
                    </label>
                    <label>
                        Total:
                        <input
                            type="number"
                            name={`items[${index}].total`}
                            value={item.total}
                            readOnly
                        />
                    </label>
                    {items.length > 1 && <button onClick={() => handleDeleteItem(index)}>Delete Item</button>}
                </div>
            ))}
            <button type="button" onClick={handleAddItem}>
                Add Item
            </button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default PurchaseOrderForm;

