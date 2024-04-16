"use client"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import { usePathname } from "next/navigation"

function ButtonHeader({ className, ...props }: ButtonProps & { href: Url }) {
	const pathname = usePathname()
	return (
		<Link href={props.href} className="flex flex-1">
			<Button
				className={cn(
					"flex flex-1 rounded-none border-b-4 border-transparent bg-transparent hover:border-white hover:bg-transparent",
					className,
					{
						"border-white font-bold": pathname === props.href,
					}
				)}
				{...props}>
				{props.children}
			</Button>
		</Link>
	)
}

export function Header() {
	return (
		<header className="flex min-h-24 w-full items-end justify-center bg-formula-one-red text-white">
			<div className="flex h-full w-full max-w-5xl flex-col justify-end gap-2">
				<div className="flex items-center justify-between max-md:flex-col max-md:justify-center">
					<h1 className="px-4 font-formula-one text-2xl font-black">
						Plano F1 sem{" "}
						<span className="blur-[2px]">Red Bull</span>
					</h1>
					<p className="text-sm text-white/85">
						A Fórmula 1 com F de Felicidade!
					</p>
				</div>
				<div className="flex w-full">
					<ButtonHeader href="/">Pilotos</ButtonHeader>
					<ButtonHeader href="/constructors">
						Construtoras
					</ButtonHeader>
					<ButtonHeader disabled href="/circuits">
						Circuitos
					</ButtonHeader>
				</div>
			</div>
		</header>
	)
}
