import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Burası ileride PayTR ve Kargonomi verilerini işleyeceğimiz yerdir.
        return NextResponse.json({ message: "Ödeme altyapısı hazır", data: body });
    } catch (error) {
        return NextResponse.json({ error: "Hata oluştu" }, { status: 500 });
    }
}