import React from 'react'
import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issue/IssueStatusFilter";

export default function IssueActionsButton() {
    return (
        <Flex justify={"between"}>
            <IssueStatusFilter/>
            <Button>
                <Link href="/issue/new">CREATE</Link>
            </Button>
        </Flex>
    )
}
