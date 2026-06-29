import React from 'react'
import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";
import {Box, Flex, Grid, Heading} from "@radix-ui/themes";

import EditIssueButton from "@/app/issue/[id]/EditIssueButton";
import IssueDetail from "@/app/issue/[id]/IssueDetail";
import DeleteIssueButton from "@/app/issue/[id]/DeleteIssueButton";
import {auth} from "@/auth";
import AssigneeSelect from "@/app/issue/[id]/edit/AssigneeSelect";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const issueId = Number(id);
    const session = await auth();
    if (Number.isNaN(issueId)) {
        notFound();
    }
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })
    if (!issue)
        notFound()

    return (
        <Grid columns={{initial: "1", sm: "5"}} gap={"4"}>
            <Box gridColumn={{initial: "1", sm: "span 3"}}>
                <IssueDetail issue={issue}/>
            </Box>
            {session &&
                <Box>
                    <Flex gap={"3"} direction={"column"}>
                        <AssigneeSelect issue={issue}/>
                        <EditIssueButton issueId={issue.id}/>
                        <DeleteIssueButton issueId={issue.id}/>
                    </Flex>
                </Box>
            }
        </Grid>
    )
}
