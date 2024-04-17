import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const driverId = req.headers.get("driverId")
	try {
		const response = await fetch(
			`https://ergast.com/api/f1/drivers/${driverId}.json`
		)
		const results: Root = await response.json()
		return NextResponse.json(
			{
				data: results.MRData.DriverTable?.Drivers[0],
				message: "success",
			},
			{ status: 200 }
		)
	} catch (err) {
		return NextResponse.json({ message: err }, { status: 403 })
	}
}
