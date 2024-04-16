import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const formulaOne = localFont({
	src: [
		{
			path: "../fonts/Formula1-Wide.ttf",
			weight: "950",
			style: "normal",
		},
		{
			path: "../fonts/Formula1-Black.ttf",
			weight: "900",
			style: "normal",
		},
		{
			path: "../fonts/Formula1-Bold_web.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../fonts/Formula1-Regular-1.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/Formula1-Italic.ttf",
			weight: "400",
			style: "italic",
		},
	],
	variable: "--formula-one",
})

export const metadata: Metadata = {
	title: "Plano F1 sem Red Bull",
	description:
		"A classificação (não oficial) do campeonato de Fórmula 1 sem a Red Bull Racing",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-br">
			<body className={cn(formulaOne.className)}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
