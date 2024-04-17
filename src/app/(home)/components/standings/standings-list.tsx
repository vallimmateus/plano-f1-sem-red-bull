"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"

import { Accordion } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { DriverCard } from "../driver"

export function StandingsList({ standings }: { standings: DriverPoints[] }) {
	const [searchStandings, setSearchStandings] = useState(standings)
	const [search, setSearch] = useState("")

	useEffect(() => {
		if (search === "") setSearchStandings(standings)
		else {
			setSearchStandings(
				standings.filter(
					driver =>
						`${driver.givenName} ${driver.familyName}`
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						driver.constructor.name
							.toLowerCase()
							.includes(search.toLowerCase())
				)
			)
		}
	}, [search, standings])
	if (standings.length === 0) return
	return (
		<>
			<div className="flex h-8 w-full justify-end">
				<div className="relative flex-1">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search"
						className="border-input/30 bg-background/10 pl-8"
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
			</div>
			<Separator className="bg-zinc-700" />
			<Accordion
				type="single"
				collapsible
				className="flex flex-col items-center gap-1.5">
				{standings.length > 0 &&
					standings.map(driver => (
						<DriverCard
							{...driver}
							key={driver.position}
							className={cn({
								hidden:
									search !== "" &&
									!searchStandings.includes(driver),
							})}
						/>
					))}
			</Accordion>
		</>
	)
}
