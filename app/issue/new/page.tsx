"use client"
import {Button, Callout, Text, TextField} from "@radix-ui/themes"
import MDEditor from '@uiw/react-md-editor';

import React, {useState} from 'react'
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchema";
import {z} from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>


export default function NewIssuePage() {
    const router = useRouter();
    const [error, setError] = useState<string>();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })

    return (
        <div className="max-w-xl ">
            {error && <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className={"space-y-4"}
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post("/api/issue", data);
                        router.push("/issue")
                    } catch {
                        setError("An unexpected error occurred.");
                    }
                })}>
                <div>
                    <TextField.Root
                        size="3"
                        placeholder="Title"
                        {...register("title")}
                    >
                    </TextField.Root>
                    {errors.title && (
                        <Text color="red" as="p">
                            {errors.title.message}
                        </Text>
                    )}
                </div>
                <div>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <MDEditor
                                onChange={val => field.onChange(val ?? "")}
                                value={field.value}/>
                        )}/>
                    {
                        errors.description &&
                        <Text className={"mb-5"} color={"red"} as={"p"}>{errors.description.message}</Text>
                    }
                </div>

                <Button type={"submit"}>Submit</Button>
            </form>
        </div>
    )
}
