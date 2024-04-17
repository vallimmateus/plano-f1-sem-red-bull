"use client"
import { AccordionTrigger } from "@radix-ui/react-accordion"
import Image from "next/image"
import { useCallback } from "react"

import { DriversPositionOnCircuit } from "@/components/driversPositionOnCircuit"
import { AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from "@/components/ui/table"
import { cn, getDriverPhotoUrl, getHelmetPhotoUrl } from "@/lib/utils"

export function ConstructorCard({
	className,
	...props
}: ConstructorPoints & {
	position: number | undefined
	drivers: Driver[]
} & React.HTMLAttributes<HTMLDivElement>) {
	const { name, totalPoints, position, circuits, constructorId, drivers } =
		props
	const nameToLink: { [key: string]: string } = {
		Ferrari: "ferrari",
		McLaren: "mclaren",
		Mercedes: "mercedes",
		"Aston Martin": "aston-martin",
		"RB F1 Team": "rb",
		"Haas F1 Team": "haas-f1-team",
		Williams: "williams",
		Sauber: "kick-sauber",
		"Alpine F1 Team": "alpine",
	}
	const constructorName = nameToLink[name]

	const getConstructorCarUrl = useCallback(() => {
		return `https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/${constructorName}.png.transform/4col/image.png`
	}, [constructorName])

	const getConstructorLogoUrl = useCallback(() => {
		return `https://media.formula1.com/content/dam/fom-website/teams/2024/${constructorName}-logo.png.transform/2col/image.png`
	}, [constructorName])

	const lastThreeCircuits = Object.entries(circuits).slice(-3).reverse()

	return (
		<AccordionItem
			value={position.toString()}
			className={cn(
				"w-full select-none border-b-0 max-sm:overflow-hidden [&[data-state=open]_#bg-color]:translate-x-0 [&[data-state=open]_h2]:text-black [&[data-state=open]_p]:text-black [&_h2]:transition-all [&_p]:transition-all",
				{
					"[&[data-state=open]_#badge_h2]:text-black [&[data-state=open]_#badge_p]:text-black [&[data-state=open]_h2]:text-white [&[data-state=open]_p]:text-white":
						constructorId === "ferrari" ||
						constructorId === "aston_martin" ||
						constructorId === "rb",
				},
				"[&_#drivers-position_p]:text-black [&_tbody_tr_div[data-radix-popper-content-wrapper]_h2]:text-black [&_tbody_tr_div[data-radix-popper-content-wrapper]_p]:text-black",
				className
			)}>
			<div
				className={cn(
					"flex h-fit w-[28rem] cursor-pointer flex-col items-center rounded max-sm:w-full",
					{
						"bg-[#38393e] text-white": position === 1,
						"bg-white text-black": position > 1,
					}
				)}>
				<AccordionTrigger asChild>
					<div className="group relative flex h-[7.5rem] w-full items-center">
						<Image
							src={getConstructorLogoUrl()}
							alt="Constructor Logo"
							width={0}
							height={0}
							className="absolute right-6 top-2 z-10 h-12 w-fit object-contain"
							unoptimized
						/>
						<Image
							src={getConstructorCarUrl()}
							alt="Constructor car"
							width={0}
							height={0}
							className="absolute -bottom-4 right-0 z-10 h-[7.5rem] w-fit translate-x-1/2 object-contain max-sm:opacity-70"
							unoptimized
						/>
						<div className="relative h-full w-full overflow-hidden rounded">
							<div
								id="bg-color"
								className={cn(
									"absolute z-0 h-full w-full -translate-x-[calc(100%-6px)] transition-all group-hover:translate-x-0",
									{
										"bg-ferrari":
											constructorId === "ferrari",
										"bg-mercedes":
											constructorId === "mercedes",
										"bg-mclaren":
											constructorId === "mclaren",
										"bg-aston_martin":
											constructorId === "aston_martin",
										"bg-haas": constructorId === "haas",
										"bg-williams":
											constructorId === "williams",
										"bg-sauber": constructorId === "sauber",
										"bg-rb": constructorId === "rb",
										"bg-alpine": constructorId === "alpine",
									}
								)}
							/>
							<div className="z-10 flex h-full w-full flex-col p-4 [&_*]:z-10">
								<div className="flex h-10 flex-1 items-center gap-3">
									<h2 className="w-10 text-center text-xl font-bold">
										{position}
									</h2>
									<Badge
										id="badge"
										className="z-10 h-7 bg-[#ededed] text-[0.65rem] font-normal text-black hover:bg-[#ededed]">
										<p>
											<span className="font-bold">
												{totalPoints}
											</span>{" "}
											PTS
										</p>
									</Badge>
								</div>
								<div className="flex-1">
									<h2 className="text-3xl font-bold">
										{name}
									</h2>
								</div>
							</div>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent asChild>
					<Table className="w-[26rem] text-[0.7rem] max-sm:w-[calc(100vw-6rem)]">
						<TableCaption className="mt-2 text-[0.6rem]">
							Última{lastThreeCircuits.length > 1 && "s"}{" "}
							{lastThreeCircuits.length > 1 &&
								lastThreeCircuits.length}{" "}
							corrida
							{lastThreeCircuits.length > 1 && "s"} da {name}.
						</TableCaption>
						<TableBody>
							{lastThreeCircuits.map(
								([circuit, result], index) => {
									const resultArray = Object.entries(result)
									const totalPoints = resultArray.reduce(
										(acc, [, value]) =>
											acc + value.totalPoints,
										0
									)
									const driverOneData = drivers.find(
										driver =>
											driver.driverId ===
											resultArray[0][0]
									)!
									const driverOne = {
										givenName: driverOneData.givenName,
										familyName: driverOneData.familyName,
										position:
											resultArray[0][1].position.toString(),
										springPosition:
											resultArray[0][1].springPosition?.toString() ||
											undefined,
										driverPhotoUrl:
											getDriverPhotoUrl(driverOneData),
										driverHelmetPhotoUrl: getHelmetPhotoUrl(
											driverOneData.driverId
										),
										fastestLap:
											resultArray[0][1].fastestLap,
									}
									let driverTwo
									if (resultArray[1]) {
										const driverTwoData = drivers.find(
											driver =>
												driver.driverId ===
												resultArray[1][0]
										)!
										driverTwo = {
											givenName: driverTwoData.givenName,
											familyName:
												driverTwoData.familyName,
											position:
												resultArray[1][1].position.toString(),
											springPosition:
												resultArray[1][1].springPosition?.toString() ||
												undefined,
											driverPhotoUrl:
												getDriverPhotoUrl(
													driverTwoData
												),
											driverHelmetPhotoUrl:
												getHelmetPhotoUrl(
													driverTwoData.driverId
												),
											fastestLap:
												resultArray[1][1].fastestLap,
										}
									} else {
										driverTwo = undefined
									}
									return (
										<HoverCard key={index}>
											<HoverCardTrigger asChild>
												<TableRow>
													<TableCell className="p-1.5">
														{circuit}
													</TableCell>
													<TableCell className="p-1.5">
														{resultArray[0]
															? resultArray[0][1]
																	.position +
																"º"
															: ""}
													</TableCell>
													<TableCell className="p-1.5">
														{resultArray[1]
															? resultArray[1][1]
																	.position +
																"º"
															: ""}
													</TableCell>
													<TableCell className="p-1.5">
														{totalPoints} pts
													</TableCell>
												</TableRow>
											</HoverCardTrigger>
											<HoverCardContent className="h-fit w-fit p-3">
												<DriversPositionOnCircuit
													driverOne={driverOne}
													driverTwo={driverTwo}
												/>
											</HoverCardContent>
										</HoverCard>
									)
								}
							)}
						</TableBody>
					</Table>
				</AccordionContent>
			</div>
		</AccordionItem>
	)
}
