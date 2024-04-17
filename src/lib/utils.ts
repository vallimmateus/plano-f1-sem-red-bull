import { Points } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getDriverPhotoUrl({
	givenName,
	familyName,
}: Pick<Driver, "givenName" | "familyName">) {
	return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${givenName[0].toUpperCase()}/${givenName.substring(0, 3).toUpperCase()}${familyName.substring(0, 3).toUpperCase()}01_${givenName}_${familyName}/${givenName.substring(0, 3).toLowerCase()}${familyName.substring(0, 3).toLowerCase()}01.png.transform/2col/image.png`
}

export function getHelmetPhotoUrl(driverId: string) {
	if (driverId.includes("_")) {
		driverId = driverId.split("_")[1]
	}
	return `https://media.formula1.com/content/dam/fom-website/manual/Helmets2024/${driverId}.png`
}

export function transformHistoricalDataToStandings(
	allPoints: Points[],
	drivers: Driver[],
	raceSchedule: Race[],
	constructors: Constructor[]
) {
	function countTimesInPosition(
		allCircuits: { [circuit: string]: { position: number } },
		position: number
	) {
		const circuits = Object.values(allCircuits)
		const positions = circuits.filter(
			circuit => circuit.position === position
		)
		return positions.length
	}

	const pointsByDriver: { [key: string]: number } = allPoints.reduce(
		(acc, point) => {
			if (acc[point.driverId]) {
				acc[point.driverId] += Number(point.points)
			} else {
				acc[point.driverId] = Number(point.points)
			}
			return acc
		},
		{} as { [key: string]: number }
	)

	const totalPointsByDriver: DriverPoints[] = Object.entries(pointsByDriver)
		.map(([driverId, points]) => {
			const driver = drivers.find(driver => driver.driverId === driverId)!
			const allCircuits = allPoints
				.filter(point => point.driverId === driverId)
				.reduce(
					(acc, point) => {
						const circuit: Race = raceSchedule.find(
							race => race.round === point.round
						)!

						// Check if the circuit is already in the accumulator
						if (!acc[circuit.raceName]) {
							acc[circuit.raceName] = {
								position: 0,
								fastestLap: false,
								totalPoints: 0,
								constructorId: "",
							}
						}

						// Update with the new data
						if (point.description.includes("Finished race")) {
							acc[circuit.raceName].position = Number(
								point.position!
							)
							acc[circuit.raceName].totalPoints += Number(
								point.points
							)
						} else if (
							point.description.includes("Finished sprint")
						) {
							acc[circuit.raceName].springPosition = Number(
								point.position!
							)
							acc[circuit.raceName].totalPoints += Number(
								point.points
							)
						} else if (point.description.includes("Fastest lap")) {
							acc[circuit.raceName].fastestLap = true
						}
						acc[circuit.raceName].constructorId =
							point.constructorId
						return acc
					},
					{} as {
						[circuit: string]: {
							position: number
							springPosition?: number
							fastestLap: boolean
							totalPoints: number
							constructorId: string
						}
					}
				)

			const allConstructors = allPoints
				.filter(point => point.driverId === driverId)
				.reduce(
					(acc, point) => {
						if (!acc[point.constructorId]) {
							acc[point.constructorId] = { points: 0, count: 0 }
						}
						acc[point.constructorId].points += Number(point.points)
						acc[point.constructorId].count++
						return acc
					},
					{} as {
						[key: string]: {
							points: 0
							count: 0
						}
					}
				)

			const constructorWithMaxPoints = Object.entries(
				allConstructors
			).reduce(
				(maxConstructor, [constructorId, { points, count }]) => {
					if (points > maxConstructor.points) {
						return { constructorId, points, count }
					} else if (count > maxConstructor.count) {
						return { constructorId, points, count }
					}
					return maxConstructor
				},
				{ constructorId: "", points: 0, count: 0 }
			).constructorId

			const constructor: Constructor = constructors.find(
				constructor =>
					constructor.constructorId === constructorWithMaxPoints
			)!

			return {
				...driver,
				totalPoints: points,
				position: 0,
				constructorId: constructor.constructorId,
				constructor,
				circuits: allCircuits,
			} as DriverPoints
		})
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 22) -
				countTimesInPosition(a.circuits, 22)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 21) -
				countTimesInPosition(a.circuits, 21)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 20) -
				countTimesInPosition(a.circuits, 20)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 19) -
				countTimesInPosition(a.circuits, 19)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 18) -
				countTimesInPosition(a.circuits, 18)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 17) -
				countTimesInPosition(a.circuits, 17)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 16) -
				countTimesInPosition(a.circuits, 16)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 15) -
				countTimesInPosition(a.circuits, 15)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 14) -
				countTimesInPosition(a.circuits, 14)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 13) -
				countTimesInPosition(a.circuits, 13)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 12) -
				countTimesInPosition(a.circuits, 12)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 11) -
				countTimesInPosition(a.circuits, 11)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 10) -
				countTimesInPosition(a.circuits, 10)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 9) -
				countTimesInPosition(a.circuits, 9)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 8) -
				countTimesInPosition(a.circuits, 8)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 7) -
				countTimesInPosition(a.circuits, 7)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 6) -
				countTimesInPosition(a.circuits, 6)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 5) -
				countTimesInPosition(a.circuits, 5)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 4) -
				countTimesInPosition(a.circuits, 4)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 3) -
				countTimesInPosition(a.circuits, 3)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 2) -
				countTimesInPosition(a.circuits, 2)
		)
		.sort(
			(a, b) =>
				countTimesInPosition(b.circuits, 1) -
				countTimesInPosition(a.circuits, 1)
		)
		.sort((a, b) => b.totalPoints - a.totalPoints)
		.map((driver, index) => ({ ...driver, position: index + 1 }))

	return totalPointsByDriver
}

export function transformHistoricalDataToConstructorStandings(
	allPoints: Points[],
	constructors: Constructor[],
	raceSchedule: Race[]
) {
	const pointsByConstructor: { [key: string]: number } = allPoints.reduce(
		(acc, points) => {
			if (acc[points.constructorId]) {
				acc[points.constructorId] += Number(points.points)
			} else {
				acc[points.constructorId] = Number(points.points)
			}
			return acc
		},
		{} as { [key: string]: number }
	)

	const totalPointsByConstructor: ConstructorPoints[] = Object.entries(
		pointsByConstructor
	)
		.map(([constructorId, points]) => {
			const constructor = constructors.find(
				constructor => constructor.constructorId === constructorId
			)!

			const allCircuits = allPoints
				.filter(point => point.constructorId === constructorId)
				.reduce(
					(acc, point) => {
						const circuit: Race = raceSchedule.find(
							race => race.round === point.round
						)!

						// Check if the circuit is already in the accumulator
						if (!acc[circuit.raceName]) {
							acc[circuit.raceName] = {}
						}
						if (!acc[circuit.raceName][point.driverId]) {
							acc[circuit.raceName][point.driverId] = {
								position: 0,
								fastestLap: false,
								totalPoints: 0,
							}
						}

						// Update with the new data
						if (point.description.includes("Finished race")) {
							acc[circuit.raceName][point.driverId].position =
								Number(point.position!)
							acc[circuit.raceName][point.driverId].totalPoints +=
								Number(point.points)
						} else if (
							point.description.includes("Finished sprint")
						) {
							acc[circuit.raceName][
								point.driverId
							].springPosition = Number(point.position!)
							acc[circuit.raceName][point.driverId].totalPoints +=
								Number(point.points)
						} else if (point.description.includes("Fastest lap")) {
							acc[circuit.raceName][point.driverId].fastestLap =
								true
						}

						return acc
					},
					{} as {
						[circuit: string]: {
							[driverId: string]: {
								position: number
								springPosition?: number
								fastestLap: boolean
								totalPoints: number
							}
						}
					}
				)

			return {
				...constructor,
				totalPoints: points,
				position: 0,
				circuits: allCircuits,
			}
		})
		.sort((a, b) => b.totalPoints - a.totalPoints)
		.map((constructor, index) => ({ ...constructor, position: index + 1 }))

	return totalPointsByConstructor
}

export async function handleUpdateChecker() {
	const responseLastRoundRegistered = await fetch(
		(process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "") +
			"/api/last-round-registered"
	)
	const dataLastRoundRegistered = await responseLastRoundRegistered.json()
	const lastRoundRegistered = dataLastRoundRegistered.lastRound as number

	const responseRaceResults = await fetch(
		(process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "") +
			"/api/race-results",
		{
			headers: {
				year: new Date().getFullYear().toString(),
				round: "last",
			},
		}
	)
	const dataRaceResults = await responseRaceResults.json()
	const lastRealRound = Number(dataRaceResults.data.round)

	if (lastRealRound > lastRoundRegistered) {
		const roundsToUpdate = Array.from(
			{ length: lastRealRound - lastRoundRegistered },
			(_, index) => (index + lastRoundRegistered + 1).toString()
		)
		await fetch(
			(process.env.NODE_ENV !== "production"
				? "http://localhost:3000"
				: "") + "/api/season-points",
			{
				method: "PUT",
				body: JSON.stringify({ roundsToUpdate }),
			}
		)
	}
}
