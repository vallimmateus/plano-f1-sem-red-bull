"use client"
import axios from "axios"
import { useState, useCallback, useEffect } from "react"

import { handleUpdateChecker } from "@/lib/utils"

import { StandingsList } from "./standings-list"

export function Standings() {
	const [standings, setStandings] = useState<DriverPoints[]>([])

	const getStandings = useCallback(async () => {
		await axios
			.get("/api/standings-driver-points")
			.then(res => {
				const data: DriverPoints[] = res.data.data
				setStandings(data)
			})
			.catch(err => console.error(err))
	}, [])

	useEffect(() => {
		getStandings()
	}, [getStandings])

	handleUpdateChecker()

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<StandingsList standings={standings} />
		</div>
	)
}
