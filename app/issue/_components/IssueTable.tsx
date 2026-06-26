import React from 'react'
import {IssueStatusBadge, Link} from "@/app/components";
import {Issue} from "@/app/generated/prisma/client";
import { Table } from "@radix-ui/themes";

export default function IssueTable({issues}: {issues: Issue[]}) {
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className={"hidden md:table-cell"}>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className={"hidden md:table-cell"}>Created</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {issues.map(issue => (
                    <Table.Row key={issue.id}>

                        <Table.RowHeaderCell>
                            <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                            <span className={"block md:hidden"}>
                                    <IssueStatusBadge status={issue.status}/>
                                </span>
                        </Table.RowHeaderCell>
                        <Table.Cell className={"hidden md:table-cell"}>
                            <IssueStatusBadge status={issue.status}/>
                        </Table.Cell>
                        <Table.Cell
                            className={"hidden md:table-cell"}>{issue.createdAt.toLocaleTimeString()}</Table.Cell>
                    </Table.Row>
                ))}

            </Table.Body>
        </Table.Root>
    )
}
