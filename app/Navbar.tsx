"use client"
import React from 'react'
import Link from "next/link";
import {usePathname} from "next/navigation";
import classname from "classnames"
import Image from "next/image";

export default function Navbar() {
    const currentPath = usePathname();
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
                    alt="Logo"/>
            </Link>
            <ul className="space-x-6">
                {links.map(link => (
                    <Link key={link.href}
                          href={link.href}
                          className={classname({
                              "text-zinc-900": link.href === currentPath,
                              "text-zinc-500": link.href !== currentPath,
                              "hover:text-zinc-800 transition-colors": true
                          })}
                    >{link.label}</Link>))}
            </ul>
        </nav>
    )
}
