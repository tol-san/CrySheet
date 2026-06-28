"use client"
import React from 'react'
import {Select} from "@radix-ui/themes";
import {useQueries, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {User} from "@/app/generated/prisma/client";
import {Skeleton} from "@/app/components";

export default function AssigneeSelect() {
    const {data: users, isLoading, error} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn:() => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    })
    if (isLoading) return <Skeleton/>
    if (error) return null;
    return (
        <Select.Root>
            <Select.Trigger placeholder={"Assign..."}/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}
