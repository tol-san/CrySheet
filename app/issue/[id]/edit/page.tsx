import React from 'react'
import IssueForm from "@/app/issue/_components/IssueForm";
import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";



export default async function EditIssuePage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const issueId = Number(id);

    if (Number.isNaN(issueId)) {
        notFound();
    }
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })
    if (!issue)
        notFound()

    return (
        <IssueForm issue={issue}/>
    )
}

