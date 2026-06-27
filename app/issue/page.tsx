import React from 'react'
import IssueActionsButton from "@/app/issue/IssueActionsButton";
import prisma from "@/lib/prisma";
import IssueTable from "@/app/issue/_components/IssueTable";
import {Box} from "@radix-ui/themes";

export const dynamic = "force-dynamic";

export default async function IssuePage() {
    const issues = await prisma.issue.findMany({orderBy: {id: "desc"}});
    return (
        <div>
            <Box mb={"4"}>
                <IssueActionsButton/>
            </Box>
            <IssueTable issues={issues}/>

        </div>
    )
}
