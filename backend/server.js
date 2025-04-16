import express from 'express';

const app = express();

app.get('/health', (req, res) => {
    console.log('Accedido');
    res.send('Todo bien!');
});

app.listen(5000, () => {
    console.log('Server corriendo en puerto 5000');
});