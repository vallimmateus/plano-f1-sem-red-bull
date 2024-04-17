import { handleUpdateChecker } from "@/lib/utils"

import { StandingsList } from "./standings-list"

export async function Constructors() {
	const response = await fetch(
		(process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://" + process.env.NEXT_PUBLIC_VERCEL_URL) +
			"/api/standings-constructor-points",
		{
			next: {
				tags: ["get-standings-constructor-points"],
			},
		}
	)

	const data = await response.json()
	const standingsConstructors: ConstructorPoints[] = data.data

	handleUpdateChecker()

	const responseDrivers = await fetch(
		(process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://" + process.env.NEXT_PUBLIC_VERCEL_URL) + "/api/drivers",
		{
			next: {
				tags: ["get-all-current-drivers"],
			},
		}
	)
	const dataDrivers = await responseDrivers.json()
	const drivers: Driver[] = dataDrivers.data

	return (
		<div className="flex w-full">
			<StandingsList
				standings={standingsConstructors}
				drivers={drivers}
			/>
		</div>
	)
}
