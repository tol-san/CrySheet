import {Button, TextArea, TextField} from "@radix-ui/themes"
import React from 'react'

export default function NewIssuePage() {
    return (
        <div className="max-w-xl space-y-4">
            <TextField.Root size="3" placeholder="Title" />
            <TextArea size="3" placeholder="Description"/>
            <Button>Submit</Button>
        </div>
    )
}
