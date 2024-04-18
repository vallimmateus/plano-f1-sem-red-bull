import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

import { prismaClient } from "@/lib/prisma"

export async function PUT(request: Request) {
	try {
		const json = await request.json()
		const roundsToUpdate = json.roundsToUpdate

		for (const round of roundsToUpdate) {
			// GET Sprint Results
			const sprintData: Race | undefined = await fetch(
				`http://ergast.com/api/f1/current/${round}/sprint.json`
			)
				.then(res => res.json())
				.then(data => data.MRData.RaceTable.Races[0])

			if (
				sprintData &&
				sprintData.SprintResults &&
				sprintData.SprintResults.length > 0
			) {
				const springFilteredResults = sprintData.SprintResults.filter(
					result => result.Constructor.constructorId !== "red_bull"
				)
				const springResult = springFilteredResults.sort(
					(a, b) => Number(a.position) - Number(b.position)
				)

				// for loop to update first 8 drivers (sprint)
				for (let i = 0; i < 8; i++) {
					// update prisma Points table with race results
					await prismaClient.points.create({
						data: {
							driverId: springResult[i].Driver.driverId,
							description:
								"Finished sprint in position " + (i + 1),
							position: `${i + 1}`,
							points: ["8", "7", "6", "5", "4", "3", "2", "1"][i],
							round: sprintData.round,
							season: sprintData.season,
							constructorId:
								springResult[i].Constructor.constructorId,
						},
					})
				}
			}

			// GET Race Results
			const raceData: Race | undefined = await fetch(
				`http://ergast.com/api/f1/current/${round}/results.json`
			)
				.then(res => res.json())
				.then(data => data.MRData.RaceTable.Races[0])

			if (raceData && raceData.Results && raceData.Results.length > 0) {
				const raceFilteredResults = raceData.Results.filter(
					result => result.Constructor.constructorId !== "red_bull"
				)
				const raceResult = raceFilteredResults.sort(
					(a, b) => Number(a.position) - Number(b.position)
				)

				const fastestLapDriverId = raceResult
					.filter(driver => driver.FastestLap)
					.sort(
						(a, b) =>
							Number(a.FastestLap.rank) -
							Number(b.FastestLap.rank)
					)[0].Driver.driverId

				// for loop to update first 10 drivers
				for (let i = 0; i < raceResult.length; i++) {
					// update prisma Points table with race results
					await prismaClient.points.create({
						data: {
							driverId: raceResult[i].Driver.driverId,
							description: "Finished race in position " + (i + 1),
							position: `${i + 1}`,
							points:
								i < 10
									? [
											"25",
											"18",
											"15",
											"12",
											"10",
											"8",
											"6",
											"4",
											"2",
											"1",
										][i]
									: "0",
							round: raceData.round,
							season: raceData.season,
							constructorId:
								raceResult[i].Constructor.constructorId,
						},
					})

					if (
						raceResult[i].Driver.driverId === fastestLapDriverId &&
						i < 10
					) {
						// update prisma Points with fastest lap
						await prismaClient.points.create({
							data: {
								driverId: fastestLapDriverId,
								description: "Fastest lap",
								points: "1",
								round: raceData.round,
								season: raceData.season,
								constructorId:
									raceResult[i].Constructor.constructorId,
							},
						})
					}
				}
			}

			if (!raceData && !sprintData) {
				throw new Error("Failed to fetch race and/or sprint results")
			}
		}

		revalidatePath("/")
		revalidateTag("get-standings-constructor-points")
		return NextResponse.json({ message: "success" }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
