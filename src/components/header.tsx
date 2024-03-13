'use client'
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ButtonHeader({className, ...props}: ButtonProps & {href: Url}) {
    const pathname = usePathname()
    return (
        <Button
            className={cn("flex flex-1 rounded-none bg-transparent hover:bg-transparent border-b-4 border-transparent hover:border-white", className, {
                "border-white font-bold": pathname === props.href
            })}
            {...props}
        >
            <Link href={props.href}>{props.children}</Link>
        </Button>
    )
}

export function Header() {
    return (
        <header className="bg-formula-one-red text-white w-full h-24 flex items-center justify-center">
            <div className="w-full flex max-w-5xl flex-col justify-end h-full gap-2">
                <h1 className="px-4 font-formula-one font-black text-2xl">Plano F1 sem <span className="blur-[2px]">Red Bull</span></h1>
                <div className="w-full flex">
                    <ButtonHeader href="/">Pilotos</ButtonHeader>
                    <ButtonHeader disabled href="/constructors">Construtoras</ButtonHeader>
                    <ButtonHeader disabled href="/circuits">Circuitos</ButtonHeader>
                </div>
            </div>
        </header>
    )
}

