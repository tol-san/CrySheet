import React from 'react'
import IssueActionsButton from "@/app/issue/IssueActionsButton";
import prisma from "@/lib/prisma";
import IssueTable from "@/app/issue/_components/IssueTable";

export const dynamic = "force-dynamic";

export default async function IssuePage() {
    const issues = await prisma.issue.findMany({orderBy: {id: "desc"}});
    return (
        <div>
            <IssueActionsButton/>
            <IssueTable issues={issues}/>

        </div>
    )
}
