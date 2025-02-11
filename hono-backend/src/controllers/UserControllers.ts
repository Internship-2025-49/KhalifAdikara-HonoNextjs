import type { Context } from "hono";
import prisma from "../../prisma/client/index.js";

export const getUsers = async (c: Context) => {
    try {
        const users = await prisma.users.findMany({ orderBy: { id: 'asc' } });

        return c.json(users);

    } catch (e: unknown) {
        console.error(`Error getting users: ${e}`);
    }
}

export async function createUser(c: Context) {
    try {

    const body = await c.req.json();

    const username   = typeof body['username'] === 'string' ? body['username'] : '';
    const name  = typeof body['name'] === 'string' ? body['name'] : '';
    const address  = typeof body['address'] === 'string' ? body['address'] : '';
    const phone  = typeof body['phone'] === 'string' ? body['phone'] : '';

    const users = await prisma.users.create({
        data: {
            username: username,
            name: name,
            address: address,
            phone: phone
        }
    });

    return c.json(users);

    } catch (e: unknown) {
        console.error(`Error creating post: ${e}`);
    }

}

export async function getUserById(c: Context) {
    try {

        const userId = parseInt(c.req.param('id'));

        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return c.json({
                statusCode: 404,
                message: 'User Tidak Ditemukan',
            }, 404);
        }

        return c.json(user);

    } catch (e: unknown) {
        console.error(`Error finding post: ${e}`);
    }
}

export async function updateUser(c: Context) {
    try {
        const userId = parseInt(c.req.param('id'));

        const body = await c.req.json();

        const username   = typeof body['username'] === 'string' ? body['username'] : '';
        const name = typeof body['name'] === 'string' ? body['name'] : '';
        const address  = typeof body['address'] === 'string' ? body['address'] : '';
        const phone  = typeof body['phone'] === 'string' ? body['phone'] : '';

        const user = await prisma.users.update({
            where: { id: userId },
            data: {
                username: username,
                name: name,
                address: address,
                phone: phone,
                updatedAt: new Date(),
            },
        });

        return c.json(user);

    } catch (e: unknown) {
        console.error(`Error updating post: ${e}`);
    }
}

export async function deleteUser(c: Context) {
    try {

        const userId = parseInt(c.req.param('id'));

        await prisma.users.delete({
            where: { id: userId },
        });

        return c.json({
            statusCode: 200,
            message: 'User Berhasil Dihapus!',
        }, 200);

    } catch (e: unknown) {
        console.error(`Error deleting user: ${e}`);
    }
}