import React from 'react'
import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";
import {Card, Flex, Heading} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
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
        <div className={"space-y-4"}>
            <Heading>{issue.title}</Heading>
            <Flex mt={"2"} align={"center"}>
                <IssueStatusBadge status={issue.status}/>
                <p className={"ml-2"}>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card size="2" className="max-w-2xl">
                <div className="prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue.description}</ReactMarkdown>
                </div>
            </Card>
        </div>
    )
}
