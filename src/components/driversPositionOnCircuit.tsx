import { Clock2 } from "lucide-react"
import Image from "next/image"

type DriverPositionOnCircuit = {
	givenName: string
	familyName: string
	position: string
	driverPhotoUrl: string
	driverHelmetPhotoUrl: string
	fastestLap: boolean
	springPosition?: string
}

export function DriversPositionOnCircuit({
	driverOne,
	driverTwo,
}: {
	driverOne: DriverPositionOnCircuit
	driverTwo?: DriverPositionOnCircuit
}) {
	return (
		<div
			id="drivers-position"
			className="flex h-fit w-64 flex-col items-center justify-center">
			<DriverPositionOnCircuit driver={driverOne} />
			{driverTwo && <DriverPositionOnCircuit driver={driverTwo} />}
		</div>
	)
}

function DriverPositionOnCircuit({
	driver,
}: {
	driver: DriverPositionOnCircuit
}) {
	let springPoints = 0
	let racePoints = 0
	if (driver.springPosition && Number(driver.springPosition) <= 8) {
		springPoints = [8, 7, 6, 5, 4, 3, 2, 1][
			Number(driver.springPosition) - 1
		]
	}

	if (Number(driver.position) <= 10) {
		racePoints = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1][
			Number(driver.position) - 1
		]
	}

	const fastestLapPoint = driver.fastestLap ? 1 : 0

	const totalPoints = racePoints + springPoints + fastestLapPoint
	return (
		<div className="flex h-14 w-full justify-between gap-1">
			<div className="flex h-full flex-1 items-center justify-start gap-2">
				<p className="text-3xl font-black">{driver.position}º</p>
				<div className="flex h-[2rem] w-3.5 flex-col">
					{driver.springPosition && (
						<p className="text-center font-bold">
							{driver.springPosition}º
						</p>
					)}
					{driver.fastestLap && (
						<div className="flex aspect-square items-center justify-center rounded-sm bg-[#b138dd] p-0.5">
							<Clock2 size={10} color="white" />
						</div>
					)}
				</div>
				<div>
					<p>{driver.fastestLap ? "Sim" : "Não"}</p>
					<p className="text-xs leading-none">{driver.givenName}</p>
					<p className="text-sm font-bold">{driver.familyName}</p>
				</div>
			</div>
			<div className="flex items-center justify-end">
				<p>{totalPoints} pts</p>
				<div className="relative -mr-3 flex h-14 w-20 items-center justify-start">
					<Image
						className="z-10 object-contain"
						src={driver.driverPhotoUrl}
						alt={driver.familyName}
						width={48}
						height={48}
						unoptimized
					/>
					<Image
						className="absolute right-0 w-16 object-contain"
						src={driver.driverHelmetPhotoUrl}
						onError={event => {
							event.currentTarget.src = "/helmet.png"
						}}
						alt={`${driver.familyName} helmet.`}
						width={40}
						height={40}
						unoptimized
					/>
				</div>
			</div>
		</div>
	)
}
