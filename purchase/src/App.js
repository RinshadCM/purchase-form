import React from 'react';
import PurchaseOrderForm from './components/PurchaseOrderForm';
import PurchaseOrderList from './components/PurchaseOrderList';

const App = () => {
  return (
    <div>
      <h1>Create Purchase Order</h1>
      <PurchaseOrderForm />
      <hr />
      <h1>Purchase Order List</h1>
      <PurchaseOrderList />
    </div>
  );
};

export default App;
