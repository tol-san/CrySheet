import React from 'react'
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Issue} from "@/app/generated/prisma/client";
import {Card, Flex, Heading} from "@radix-ui/themes";

export default function IssueDetail({issue}: {issue: Issue}) {
    return (
        <>

            <Heading>{issue.title}</Heading>
            <Flex mt={"2"} mb={"2"} align={"center"}>
                <IssueStatusBadge status={issue.status}/>
                <p className={"ml-2"}>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card size="2">
                <div className="prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue.description}</ReactMarkdown>
                </div>
            </Card>
        </>
    )
}
