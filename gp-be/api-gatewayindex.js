const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.use('/users', proxy({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/bids', proxy({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/blockchain', proxy({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/notifications', proxy({ target: 'http://localhost:3003', changeOrigin: true }));

app.listen(3004, () => {
    console.log('API Gateway running on port 3004');
});
