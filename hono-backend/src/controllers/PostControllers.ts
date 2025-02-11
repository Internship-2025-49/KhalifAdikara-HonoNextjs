
import type { Context } from "hono";
import prisma from "../../prisma/client/index.js";


export const getPosts = async (c: Context) => {
    try {
        const posts = await prisma.post.findMany({ orderBy: { id: 'asc' } });

        return c.json({
            success: true,
            message: 'List Data Posts!',
            data: posts
        }, 200);

    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}

export async function createPost(c: Context) {
    try {

    const body = await c.req.json();

    const title   = typeof body['title'] === 'string' ? body['title'] : '';
    const content = typeof body['content'] === 'string' ? body['content'] : '';

    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
        }
    });

    return c.json({
        statusCode: 201,
        message: 'Create Post Berhasil!',
        data: post
    }, 201);

    } catch (e: unknown) {
        console.error(`Error creating post: ${e}`);
    }

}

export async function getPostById(c: Context) {
    try {

        const postId = parseInt(c.req.param('id'));

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return c.json({
                statusCode: 404,
                message: 'Post Tidak Ditemukan',
            }, 404);
        }

        return c.json({
            statusCode: 200,
            message: `Detail Post Berdasarkan ID: ${postId}`,
            data: post
        }, 200);

    } catch (e: unknown) {
        console.error(`Error finding post: ${e}`);
    }
}

export async function updatePost(c: Context) {
    try {
        const postId = parseInt(c.req.param('id'));

        const body = await c.req.json();

        const title   = typeof body['title'] === 'string' ? body['title'] : '';
        const content = typeof body['content'] === 'string' ? body['content'] : '';

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                title: title,
                content: content,
                updatedAt: new Date(),
            },
        });

        return c.json({
            statusCode: 200,
            message: 'Post Berhasil Diupdate!',
            data: post
        }, 200);

    } catch (e: unknown) {
        console.error(`Error updating post: ${e}`);
    }
}

export async function deletePost(c: Context) {
    try {

        const postId = parseInt(c.req.param('id'));

        await prisma.post.delete({
            where: { id: postId },
        });

        return c.json({
            statusCode: 200,
            message: 'Post Berhasil Dihapus!',
        }, 200);

    } catch (e: unknown) {
        console.error(`Error deleting post: ${e}`);
    }
}