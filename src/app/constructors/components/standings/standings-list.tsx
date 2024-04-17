"use client"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

import { Accordion } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { ConstructorCard } from "../constructor"

export function StandingsList({
	standings,
	drivers,
}: {
	standings: ConstructorPoints[]
	drivers: Driver[]
}) {
	const [searchStandings, setSearchStandings] = useState(standings)
	const [search, setSearch] = useState("")

	useEffect(() => {
		if (search === "") setSearchStandings(standings)
		else {
			setSearchStandings(
				standings.filter(constructor => {
					const allDrivers = Object.values(
						constructor.circuits
					).reduce((acc: Driver[], driversPoints) => {
						const driversIds = Object.keys(driversPoints)
						const driversData = driversIds.map(
							driverId =>
								drivers.find(
									driver => driver.driverId === driverId
								)!
						)
						acc.push(...driversData)
						return [...new Set(acc)]
					}, [])
					return (
						constructor.name
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						allDrivers.some(driver =>
							`${driver.givenName} ${driver.familyName}`
								.toLowerCase()
								.includes(search.toLowerCase())
						)
					)
				})
			)
		}
	}, [drivers, search, standings])
	return (
		<div className="flex w-full flex-col items-center gap-4 max-sm:mx-8">
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
				className="flex flex-col items-center gap-1.5 max-sm:w-full">
				{standings.length > 0 &&
					standings.map(constructor => (
						<ConstructorCard
							{...constructor}
							drivers={drivers}
							key={constructor.position}
							className={cn({
								hidden:
									search !== "" &&
									!searchStandings.includes(constructor),
							})}
						/>
					))}
			</Accordion>
		</div>
	)
}
