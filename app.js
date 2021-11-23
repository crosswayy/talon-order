const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const talonRouter = require('./routes/talon.routes');
const headerRouter = require('./routes/header.routes');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/talons', talonRouter);
app.use('/api/header', headerRouter);

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch(e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
