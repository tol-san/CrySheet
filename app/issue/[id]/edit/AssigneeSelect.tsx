"use client"
import React from 'react'
import {Select} from "@radix-ui/themes";
import {useQueries, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Issue, User} from "@/app/generated/prisma/client";
import {Skeleton} from "@/app/components";
import {toast, Toaster} from "react-hot-toast";

export default function AssigneeSelect({issue}: { issue: Issue }) {
    const {data: users, isLoading, error} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })
    if (isLoading) return <Skeleton/>
    if (error) return null;
    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || "unassigned"}
                onValueChange={userId => {
                    axios
                        .patch("/api/issue/" + issue.id, {assignedToUserId: userId === "unassigned" ? null : userId}).catch(() => toast.error("Changes could not be save."))
                }}
            >
                <Select.Trigger placeholder={"Assign..."}/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value={"unassigned"}>Unassigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster/>
        </>
    )
}
