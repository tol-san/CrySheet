import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {issueSchema} from "@/app/validationSchema";
import {auth} from "@/auth";

export async function POST(request: NextRequest){
    const session = await auth()
    if (!session)
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    const body = await request.json();
    const validation = issueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(
            {error: validation.error.issues},
            {status: 400})

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newIssue, {status: 201});
}