"use client"
import {Button, Callout, Spinner, Text, TextField} from "@radix-ui/themes"
import MDEditor from '@uiw/react-md-editor';

import React, {useState} from 'react'
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchema";
import {z} from 'zod'
import {Issue} from "@/app/generated/prisma/client";

type IssueForm = z.infer<typeof createIssueSchema>


export default function IssueForm({issue}: {issue?: Issue}) {
    const router = useRouter();
    const [error, setError] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            await axios.post("/api/issue", data);
            router.push("/issue")
        } catch {
            setIsSubmitting(false)
            setError("An unexpected error occurred.");
        }
    })

    return (
        <div className="max-w-xl ">
            {error && <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                className={"space-y-4"}
                onSubmit={onSubmit}>
                <div>
                    <TextField.Root
                        size="3"
                        placeholder="Title"
                        {...register("title")}
                        defaultValue={issue?.title}
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
                        defaultValue={issue?.description}
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

                <Button disabled={isSubmitting} type={"submit"}>
                    Submit {isSubmitting && <Spinner/>} </Button>
            </form>
        </div>
    )
}
