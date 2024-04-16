import React from "react"

export function TitlePage({ children }: { children: React.ReactNode }) {
	return (
		<h1 className="mb-8 rounded-tr-3xl border-r-[10px] border-t-[10px] border-formula-one-red pr-5 pt-1.5 text-4xl font-bold">
			{children}
		</h1>
	)
}
