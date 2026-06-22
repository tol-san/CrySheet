import React from 'react'
import Link from "next/link";
import {PenLine} from "lucide-react";
import {Button} from "@radix-ui/themes";

export default function EditIssueButton({issueId}: {issueId: number}) {
    return (
        <Button>
            <PenLine size={14} />
            <Link href={`/issue/${issueId}/edit`}>Edit Issue</Link>
        </Button>
    )
}
