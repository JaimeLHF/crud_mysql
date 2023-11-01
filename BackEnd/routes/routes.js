import express from 'express';
import { getUsers, addUsers, updateUser, deleteUsers } from '../controllers/controllers.js';

const router = express.Router();


router.get('/', getUsers)
router.post('/', addUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUsers)


export default router;
