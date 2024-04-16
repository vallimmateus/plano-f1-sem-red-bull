import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const year = req.headers.get("year")
	const round = req.headers.get("round")
	try {
		const response = await fetch(
			`http://ergast.com/api/f1/${year}/${round}/results.json`
		)
		const results: Root = await response.json()
		return NextResponse.json(
			{ data: results.MRData.RaceTable?.Races[0], message: "success" },
			{ status: 200 }
		)
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
