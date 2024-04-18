"use client"
import axios from "axios"
import { useState, useCallback, useEffect } from "react"

import { handleUpdateChecker } from "@/lib/utils"

import { StandingsList } from "./standings-list"

export function Constructors() {
	const [standingsConstructors, setStandingsConstructors] = useState<
		ConstructorPoints[]
	>([])
	const [drivers, setDrivers] = useState<Driver[]>([])

	const getStandingsConstructors = useCallback(async () => {
		await axios
			.get("/api/standings-constructor-points")
			.then(res => {
				const data: ConstructorPoints[] = res.data.data
				setStandingsConstructors(data)
			})
			.catch(err => console.error(err))
	}, [])
	const getDrivers = useCallback(async () => {
		await axios
			.get("/api/drivers")
			.then(res => {
				const data: Driver[] = res.data.data
				setDrivers(data)
			})
			.catch(err => console.error(err))
	}, [])

	useEffect(() => {
		getStandingsConstructors()
		getDrivers()
	}, [getStandingsConstructors, getDrivers])

	handleUpdateChecker()

	return (
		<div className="flex w-full">
			<StandingsList
				standings={standingsConstructors}
				drivers={drivers}
			/>
		</div>
	)
}
