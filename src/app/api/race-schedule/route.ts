import { prismaClient } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const allPoints = await prismaClient.points.findMany({})
		const allRoundsRegisterOnDb = [
			...new Set(allPoints.map(item => item.round)),
		]

		const response = await fetch("http://ergast.com/api/f1/current.json")
		let results: Race[] = await response
			.json()
			.then(data => data.MRData.RaceTable.Races)

		results = await Promise.all(
			results.map(async race => {
				if (allRoundsRegisterOnDb.includes(race.round)) {
					// Incluir SprinrResults
					if (race.Sprint) {
						const rawSprintResults = (
							await fetch(
								`https://ergast.com/api/f1/current/${race.round}/sprint.json`
							)
								.then(res => res.json())
								.then(
									data =>
										data.MRData.RaceTable.Races[0]
											.SprintResults! as Result[]
								)
						)
							.filter(
								result =>
									result.Constructor.constructorId !==
									"red_bull"
							)
							.sort((a, b) => Number(a.grid) - Number(b.grid))
							.map((result, index) => ({
								...result,
								grid:
									Number(result.grid) > 0
										? (index + 1).toString()
										: result.grid,
							}))
							.sort(
								(a, b) =>
									Number(a.position) - Number(b.position)
							)
							.map((result, index) => ({
								...result,
								position: (index + 1).toString(),
								positionText:
									result.position === result.positionText
										? (index + 1).toString()
										: result.positionText,
								points:
									index < 8
										? [
												"8",
												"7",
												"6",
												"5",
												"4",
												"3",
												"2",
												"1",
											][index]
										: "0",
							}))
						race.SprintResults = rawSprintResults
					}

					// Incluir Results
					const rawResults = (
						await fetch(
							`http://ergast.com/api/f1/current/${race.round}/results.json`
						)
							.then(res => res.json())
							.then(
								data =>
									data.MRData.RaceTable.Races[0]
										.Results! as Result[]
							)
					)
						.filter(
							result =>
								result.Constructor.constructorId !== "red_bull"
						)
						.sort((a, b) => Number(a.grid) - Number(b.grid))
						.map((result, index) => ({
							...result,
							grid:
								Number(result.grid) > 0
									? (index + 1).toString()
									: result.grid,
						}))
						.sort((a, b) => {
							if (a.FastestLap && b.FastestLap) {
								return (
									Number(a.FastestLap.rank) -
									Number(b.FastestLap.rank)
								)
							} else {
								return Number(a.position) - Number(b.position)
							}
						})
						.map((result, index) => {
							if (!result.FastestLap) {
								return result
							}
							return {
								...result,
								FastestLap: {
									...result.FastestLap,
									rank: (index + 1).toString(),
								},
							}
						})
						.sort((a, b) => Number(a.position) - Number(b.position))
						.map((result, index) => ({
							...result,
							position: (index + 1).toString(),
							positionText:
								result.position === result.positionText
									? (index + 1).toString()
									: result.positionText,
							points:
								index < 10
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
										][index]
									: "0",
						}))
					race.Results = rawResults
				}
				return race
			})
		)
		return NextResponse.json(
			{ data: results, message: "success" },
			{ status: 200 }
		)
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
