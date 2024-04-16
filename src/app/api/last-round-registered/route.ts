import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const lastRound = await prismaClient.points.findFirst({
            select: {
                round: true
            },
            orderBy: {
                round: "desc"
            }
        }).then((res) => Number(res?.round || '0'))
        return NextResponse.json({ lastRound, message: 'success' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 403 })
    }
}