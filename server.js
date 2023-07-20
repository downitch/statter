import express from 'express';

const app = express();
app.use(express.static('scs'));
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
