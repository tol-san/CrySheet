import React from 'react'
import {Button} from "@radix-ui/themes";
import {Trash2} from "lucide-react";
import Link from "next/link";

export default function DeleteIssueButton() {
    return (
        <Button color={"red"}>
            <Trash2 size={14}/>
            <Link href={"/"}>Delete</Link>
        </Button>
    )
}
