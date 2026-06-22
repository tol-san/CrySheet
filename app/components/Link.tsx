import React from "react";
import NextLink from "next/link";
import {Link as RadixLink} from "@radix-ui/themes";


interface Prop {
    children: React.ReactNode;
    href: string;
}
export default function Link({children, href}: Prop) {
    return (
       <RadixLink size={"2"} asChild>
           <NextLink style={{ color: "var(--gray-12)" }}  href={href}>{children}</NextLink>
       </RadixLink>
    )
}
