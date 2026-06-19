"use client"
import {Button, TextField} from "@radix-ui/themes"
import MDEditor from '@uiw/react-md-editor';

import React from 'react'

export default function NewIssuePage() {
    return (
        <div className="max-w-xl space-y-4">
            <TextField.Root size="3" placeholder="Title" />
            <MDEditor/>
            <Button>Submit</Button>
        </div>
    )
}
