import { NextRequest, NextResponse } from 'next/server'

const token = 'c95685f8263902ddf295386150e81f6a93ec8bb92ddea8c80a2aae9aa667de0e';

export async function GET() {
    const getApiKey = await fetch('http://localhost:3000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const apiKeyData = await getApiKey.json();
    const apiKey = apiKeyData.key;

    const res = await fetch('http://localhost:3000/api/users/data', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'api-key': apiKey
        }
    });

    const result = await res.json();
    return NextResponse.json({ result });
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const getApiKey = await fetch('http://localhost:3000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const apiKeyData = await getApiKey.json();
    const apiKey = apiKeyData.key;

    const res = await fetch('http://localhost:3000/api/users/data', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'api-key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
}
