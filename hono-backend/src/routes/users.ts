import { Hono } from 'hono'
import { jwt, sign } from 'hono/jwt'
import prisma from '../../prisma/client/index.js'
import { apiKeyAuth } from '../middleware/Auth.js'
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/UserControllers.js'
import { loginUser } from '../controllers/AuthControllers.js'

const app = new Hono()

const SECRET_KEY = 'c95685f8263902ddf295386150e81f6a93ec8bb92ddea8c80a2aae9aa667de0e';

app.post("/login", loginUser);

app.get('/', async (c) => {
    const auth = await prisma.auth.findFirst()

    if (auth) {
        return c.json(
            { 
                statusCode: 200, 
                message: 'Authorized',
                key: auth.key 
            }
        )
    }
})

app.use('/data/*', jwt({ secret: SECRET_KEY }));

app.use('/data/*', apiKeyAuth);

app.get('/data', (c) => getUsers(c));
app.post('/data', (c) => createUser(c));
app.get('/data/:id', (c) => getUserById(c));
app.put('/data/:id', (c) => updateUser(c));
app.delete('/data/:id', (c) => deleteUser(c));

export default app;
