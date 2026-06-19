"use client"
import {Button, TextField} from "@radix-ui/themes"
import MDEditor from '@uiw/react-md-editor';

import React from 'react'
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";

interface IssueForm {
    title: string;
    description: string;
}


export default function NewIssuePage() {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>()

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                await axios.post("/api/issue",data);
                router.push("/issue")
            })}
            className="max-w-xl space-y-4">
            <TextField.Root size="3" placeholder="Title" {...register("title")} />
            <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({field}) => (
                    <MDEditor
                        onChange={val => field.onChange(val ?? "")}
                        value={field.value}/>
                )}/>

            <Button>Submit</Button>
        </form>
    )
}
