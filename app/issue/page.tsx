import React from 'react'
import {Button, Table} from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function IssuePage() {
    const issues = await prisma.issue.findMany();
    return (
        <div>
            <Button>
                <Link href="/issue/new">CREATE</Link>
            </Button>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell >Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={"hidden md:table-cell"}>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={"hidden md:table-cell"}>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.RowHeaderCell>{issue.title}
                                <span className={"block md:hidden"}>{issue.status}</span>
                            </Table.RowHeaderCell>
                            <Table.Cell className={"hidden md:table-cell"}>{issue.status}</Table.Cell>
                            <Table.Cell className={"hidden md:table-cell"}>{issue.createdAt.toLocaleTimeString()}</Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table.Root>

        </div>
    )
}
