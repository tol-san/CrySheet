import React from 'react'
import {Button} from "@radix-ui/themes";
import Link from "next/link";

export default function IssuePage() {
    return (
        <div>
            <Button>
                <Link href="/issue/new">CREATE</Link>
            </Button>
        </div>
    )
}
