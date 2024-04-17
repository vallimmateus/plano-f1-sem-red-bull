import { handleUpdateChecker } from "@/lib/utils"

import { StandingsList } from "./standings-list"

export async function Standings() {
	const response = await fetch(
		(process.env.NODE_ENV === "development"
			? process.env.NEXT_PUBLIC_URL
			: "https://" + process.env.NEXT_PUBLIC_URL) +
			"/api/standings-driver-points",
		{
			next: {
				tags: ["get-standings-driver-points"],
			},
		}
	)
	const data = await response.json()
	const standings: DriverPoints[] = data.data

	handleUpdateChecker()

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<StandingsList standings={standings} />
		</div>
	)
}
