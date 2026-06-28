import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "@/app/validationSchema";
import prisma from "@/lib/prisma";
import delay from "delay";
import {auth} from "@/auth";


export async function PATCH(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> }) {
    const session = await auth()
    if (!session)
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    const body = await request.json();
    const {id} = await params;

    const validation = issueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(
            {error: validation.error.issues},
            {status: 400});

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });
    if (!issue)
        return NextResponse.json({error: "Invalid issue"}, {status: 404})
    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> }) {

    const session = await auth()
    if (!session)
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    const {id} = await params;

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });
    if (!issue)
        return NextResponse.json({error: "Issue not found."}, {status: 400})
    await prisma.issue.delete({
        where: {id: issue.id}
    })

    return NextResponse.json({});
}
