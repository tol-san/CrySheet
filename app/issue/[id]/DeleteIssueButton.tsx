"use client"
import React from 'react'
import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import {Trash2} from "lucide-react";
import Link from "next/link";

export default function DeleteIssueButton() {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color={"red"}>
                    <Trash2 size={14}/>
                    <Link href={"/"}>Delete</Link>
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you want to delete this issue. This action cannot be undone.
                </AlertDialog.Description>
                <Flex mt={"6"} gap={"3"} justify={"end"}>
                    <AlertDialog.Cancel>
                        <Button color="gray">Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color={"red"}>Delete Issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}
