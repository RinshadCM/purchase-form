const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Enable CORS for API requests
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// API endpoints
let purchaseOrders = [
  { id: 1, number: 'PO-001', date: '2022-01-01', inventoryLocation: 'Warehouse A' },
//   { id: 2, number: 'PO-002', date: '2022-01-02', inventoryLocation: 'Warehouse B' },
//   { id: 3, number: 'PO-003', date: '2022-01-03', inventoryLocation: 'Warehouse C' },
];

app.get('/api/purchase-orders', (req, res) => {
  res.json(purchaseOrders);
});

app.post('/api/purchase-orders', (req, res) => {
    // console.log(req.body);
    const newPurchaseOrder = {
      id: purchaseOrders.length + 1,
      number: req.body.purchaseOrderNumber,
      date: req.body.purchaseDate,
      inventoryLocation: req.body.inventoryLocation
    };
    purchaseOrders.push(newPurchaseOrder);
    res.status(201).json(newPurchaseOrder);
  });
  

  app.put('/api/purchase-orders/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;
    purchaseOrders = purchaseOrders.map((po) => {
      if (po.id === id) {
        return { ...po, ...updatedFields };
      } else {
        return po;
      }
    });
    const updatedPurchaseOrder = purchaseOrders.find((po) => po.id === id);
    console.log(updatedPurchaseOrder);
    res.status(200).json(updatedPurchaseOrder);
  });
  

app.delete('/api/purchase-orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  purchaseOrders = purchaseOrders.filter((po) => po.id !== id);
  res.sendStatus(204);
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on port ${port}`);
