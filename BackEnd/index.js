import express from "express";
import cors from 'cors'
import userRoutes from './routes/routes.js'

const PORT = 8800;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', userRoutes)

app.listen(PORT, () => {
    console.log(`Server Up in ${PORT}`);
})