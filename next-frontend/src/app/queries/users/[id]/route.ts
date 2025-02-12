import { NextRequest, NextResponse } from 'next/server'

const token = 'c95685f8263902ddf295386150e81f6a93ec8bb92ddea8c80a2aae9aa667de0e';


export async function GET(request : NextRequest,{ params }: { params: { id: number } }) {
    const getApiKey = await fetch('http://localhost:3000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const apiKeyData = await getApiKey.json();
    const apiKey = apiKeyData.key;
    
    const res = await fetch(`http://localhost:3000/api/users/data/${params.id}`, {
        next: { revalidate: 10 },
        headers: {
            'Authorization': `Bearer ${token}`,
            'api-key': apiKey
        }
    })
    const data = await res.json()
    return NextResponse.json(data)
}
export async function PUT(request: NextRequest,{ params }: { params: { id: number } }) {
    const body = await request.json()
    
    const getApiKey = await fetch('http://localhost:3000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const apiKeyData = await getApiKey.json();
    const apiKey = apiKeyData.key;
    
    const res = await fetch(`http://localhost:3000/api/users/data/${params.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'api-key': apiKey
        },
        body: JSON.stringify(body),
    })
    const data = await res.json();
    return NextResponse.json(data)

}
export async function DELETE(request: NextRequest,{ params }: { params: { id: number } }) {
    const getApiKey = await fetch('http://localhost:3000/api/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const apiKeyData = await getApiKey.json();
    const apiKey = apiKeyData.key;
    
    const res = await fetch(`http://localhost:3000/api/users/data/${params.id}`, {
        next: { revalidate: 10 },
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'api-key': apiKey
        }
    })
    const data = await res.json();
    return NextResponse.json(data)

}



