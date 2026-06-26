import React from 'react'
import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";
import {Box, Button, Card, Flex, Grid, Heading} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {PenLine} from "lucide-react";
import Link from "next/link";
import EditIssueButton from "@/app/issue/[id]/EditIssueButton";
import IssueDetail from "@/app/issue/[id]/IssueDetail";
import DeleteIssueButton from "@/app/issue/[id]/DeleteIssueButton";

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
        <Grid columns={{ initial: "1", sm: "5" }} gap={"4"}>
            <Box gridColumn={{initial: "1", sm: "span 3"}}>
                <IssueDetail issue={issue}/>
            </Box>
            <Box>
                <Flex gap={"3"} direction={"column"}>
                    <EditIssueButton issueId={issue.id}/>
                    <DeleteIssueButton/>
                </Flex>
            </Box>
        </Grid>
    )
}
