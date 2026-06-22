import React from 'react'
import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";
import {Box, Button, Card, Flex, Grid, Heading} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {PenLine} from "lucide-react";
import Link from "next/link";

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
        <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex mt={"2"} mb={"2"} align={"center"}>
                    <IssueStatusBadge status={issue.status}/>
                    <p className={"ml-2"}>{issue.createdAt.toDateString()}</p>
                </Flex>
                <Card size="2" >
                    <div className="prose">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue.description}</ReactMarkdown>
                    </div>
                </Card>
            </Box>
            <Box>
                <Button>
                    <PenLine size={14} />
                    <Link href={`/issue/${id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    )
}
