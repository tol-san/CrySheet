"use client"
import React, {useState} from 'react'
import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import {AlertTriangle, Trash2} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";


export default function DeleteIssueButton({issueId}: { issueId: number }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState(false);
    const deleteIssue = async () => {
        try {
            setIsDeleting(true)
            await axios.delete("/api/issue/" + issueId)
            router.push("/issue");

        } catch {
            setError(true)
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button
                        disabled={isDeleting}
                        color={"red"}>
                        <Trash2 size={14}/>
                        Delete
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
                            <Button color={"red"} onClick={deleteIssue}>Delete Issue</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content align={"center"} size={"2"} width={"sm"}>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>Cannot delete issue.</AlertDialog.Description>
                    <AlertDialog.Action>
                        <Button color={"gray"} onClick={() => setError(false)} mt={"3"} variant={"soft"}>OK</Button>
                    </AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}
