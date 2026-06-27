"use client"
import React from 'react'
import Link from "next/link";
import {usePathname} from "next/navigation";
import classname from "classnames"
import Image from "next/image";
import {useSession} from "next-auth/react";
import {Box} from "@radix-ui/themes";

export default function Navbar() {
    const currentPath = usePathname();
    const {status, data: section} = useSession();
    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issue", href: "/issue"}
    ]
    return (
        <nav className={"flex space-x-8 border-b items-center border-zinc-300 px-12 py-4"}>
            <Link href="/">
                <Image
                    src="/logo.png"
                    height={50}
                    width={50}
                    className="h-auto w-auto"
                    alt="Logo"/>
            </Link>
            <ul className="flex space-x-6">
                {links.map(link => (
                    <li key={link.href} >
                        <Link
                            href={link.href}
                            className={classname({
                                "text-zinc-900": link.href === currentPath,
                                "text-zinc-500": link.href !== currentPath,
                                "hover:text-zinc-800 transition-colors": true
                            })}
                        >
                            {link.label}
                        </Link>
                    </li>))}
            </ul>
            <Box>
                {status === "authenticated" && <Link href={"/api/auth/signout"}>Sign Out</Link> }
                {status === "unauthenticated" && <Link href={"/api/auth/signin"}>Login</Link> }
            </Box>
        </nav>
    )
}
