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
                <IssueDetail issue={issue}/>
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id}/>
            </Box>
        </Grid>
    )
}
