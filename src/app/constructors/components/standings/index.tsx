import { handleUpdateChecker } from "@/lib/utils"

import { StandingsList } from "./standings-list"

export async function Constructors() {
	const response = await fetch(
		(process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "") +
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
		(process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "") +
			"/api/drivers",
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
