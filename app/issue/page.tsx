import React from 'react'
import IssueActionsButton from "@/app/issue/IssueActionsButton";
import prisma from "@/lib/prisma";
import IssueTable from "@/app/issue/_components/IssueTable";
import {Box} from "@radix-ui/themes";
import {Status} from "@/app/generated/prisma/enums";

export const dynamic = "force-dynamic";

interface Props {
    searchParams: Promise<{status?: Status}>
}

const validStatuses = Object.values(Status);

export default async function IssuePage({searchParams}: Props) {
    const {status} = await searchParams
    const statusFilter = validStatuses.includes(status as Status)
        ? (status as Status)
        : undefined;

    const issues = await prisma.issue.findMany({
        orderBy: {id: "desc"},
        where: {status: statusFilter}
    });
    return (
        <div>
            <Box mb={"4"}>
                <IssueActionsButton/>
            </Box>
            <IssueTable issues={issues}/>

        </div>
    )
}
