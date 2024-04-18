import axios from "axios"

import { handleUpdateChecker } from "@/lib/utils"

import { StandingsList } from "./standings-list"

export async function Standings() {
	const response = await axios.get("/api/standings-driver-points")
	const standings: DriverPoints[] = response.data.data

	handleUpdateChecker()

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<StandingsList standings={standings} />
		</div>
	)
}
