import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany({orderBy: {name: "desc"}})
    return NextResponse.json(users);
}