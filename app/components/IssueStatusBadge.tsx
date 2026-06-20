import React from 'react'
import {Badge} from "@radix-ui/themes";
import {Status} from "@/app/generated/prisma/enums";

const statusMap: Record<Status, {label: string, color: "crimson" | "orange" | "green"}> = {
    OPEN: {label: "Open", color: "crimson"},
    IN_PROGRESS: {label: "In Progress", color: "orange"},
    CLOSE: {label: "Close", color: "green"}
}

export default function IssueStatusBadge({status}: {status: Status}) {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}
