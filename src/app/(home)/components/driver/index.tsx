"use client"
import { AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { AccordionTrigger } from "@radix-ui/react-accordion"
import Image from "next/image"
import { useCallback } from "react"

export function DriverCard({
	className,
	...props
}: DriverPoints & {
	position: number | undefined
} & React.HTMLAttributes<HTMLDivElement>) {
	const {
		givenName,
		familyName,
		totalPoints,
		position,
		constructor,
		circuits,
	} = props

	const lastThreeCircuits = Object.entries(circuits).slice(-3).reverse()

	const getDriverPhotoUrl = useCallback(() => {
		return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${givenName[0].toUpperCase()}/${givenName.substring(0, 3).toUpperCase()}${familyName.substring(0, 3).toUpperCase()}01_${givenName}_${familyName}/${givenName.substring(0, 3).toLowerCase()}${familyName.substring(0, 3).toLowerCase()}01.png.transform/2col/image.png`
	}, [familyName, givenName])

	const getDriverNumberUrl = useCallback(() => {
		return `https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/${givenName.substring(0, 3).toUpperCase()}${familyName.substring(0, 3).toUpperCase()}01.png.transform/2col/image.png`
	}, [familyName, givenName])

	return (
		<AccordionItem
			value={position.toString()}
			className={cn(
				"select-none border-b-0 [&[data-state=open]_#constructor-color]:w-48",
				{
					"[&[data-state=open]_#constructor-name]:text-black":
						position > 1,
					"[&[data-state=open]_#constructor-name]:text-white [&[data-state=open]_#driver-name]:text-white":
						position > 1 &&
						(constructor.constructorId === "ferrari" ||
							constructor.constructorId === "aston_martin" ||
							constructor.constructorId === "rb"),
				},
				className
			)}>
			<div
				className={cn(
					"group flex h-fit w-96 cursor-pointer flex-col items-center overflow-hidden rounded transition-all",
					{
						"bg-[#38393e] text-white": position === 1,
						"bg-white text-black": position > 1,
					}
				)}>
				<AccordionTrigger asChild>
					<div
						className={cn("flex w-full items-center", {
							"h-32": position === 1,
							"h-16": position > 1,
						})}>
						<div className="flex w-11 justify-center">
							<h2 className="font-bold">{position}</h2>
						</div>
						<div
							className={cn(
								"h-full w-1 transition-all group-hover:w-1.5",
								{
									"py-5 group-hover:py-3": position === 1,
									"py-3.5 group-hover:py-2": position > 1,
								}
							)}>
							<div className="relative z-0 h-full w-full">
								<div
									id="constructor-color"
									className={cn(
										"absolute h-full w-full transition-all",
										{
											"bg-ferrari":
												constructor.constructorId ===
												"ferrari",
											"bg-mercedes":
												constructor.constructorId ===
												"mercedes",
											"bg-mclaren":
												constructor.constructorId ===
												"mclaren",
											"bg-aston_martin":
												constructor.constructorId ===
												"aston_martin",
											"bg-haas":
												constructor.constructorId ===
												"haas",
											"bg-williams":
												constructor.constructorId ===
												"williams",
											"bg-sauber":
												constructor.constructorId ===
												"sauber",
											"bg-rb":
												constructor.constructorId ===
												"rb",
											"bg-alpine":
												constructor.constructorId ===
												"alpine",
										}
									)}
								/>
							</div>
						</div>
						<div
							className={cn(
								"z-10 flex h-full flex-1 flex-col justify-center pl-2.5 transition-all group-hover:translate-x-1",
								{
									"justify-between py-5": position === 1,
									"py-3.5": position > 1,
								}
							)}>
							<h2
								id="driver-name"
								className={cn("transition-all", {
									"text-lg leading-4": position === 1,
									"text-sm": position > 1,
								})}>
								{givenName}
								{position === 1 ? <br /> : " "}
								<span
									className={cn("uppercase", {
										"text-2xl font-black": position === 1,
										"font-bold": position > 1,
									})}>
									{familyName}
								</span>
							</h2>
							<p
								id="constructor-name"
								className={cn("text-[0.6rem] transition-all", {
									"text-muted-foreground": position > 1,
								})}>
								{constructor.constructorId === "rb" ? (
									<span>
										<span className="blur-[2px]">
											{constructor.name.slice(0, 3)}
										</span>
										{constructor.name.slice(2)}
									</span>
								) : (
									constructor.name
								)}
							</p>
						</div>
						<div
							className={cn("flex h-full min-w-20", {
								"relative items-end": position === 1,
								"items-center": position > 1,
							})}>
							<div
								className={cn(
									"relative flex h-full w-fit items-end justify-end object-contain transition-all",
									{
										"absolute bottom-0 right-0 -ml-8 h-fit group-hover:-ml-10":
											position === 1,
										"translate-x-3 opacity-50 grayscale group-hover:translate-x-0 group-hover:opacity-100 group-hover:grayscale-0":
											position > 1,
									}
								)}>
								<Image
									alt={`${givenName} ${familyName}`}
									src={getDriverPhotoUrl()}
									width={0}
									height={0}
									className="h-full w-fit object-contain"
									unoptimized
								/>
								<Image
									alt={`Permanent number of ${givenName} ${familyName}`}
									src={getDriverNumberUrl()}
									width={0}
									height={0}
									className={cn(
										"absolute bottom-1 w-fit object-contain",
										{
											"-left-6 h-8": position === 1,
											"-left-3 h-6": position > 1,
										}
									)}
									unoptimized
								/>
							</div>
							<div className="flex w-20 justify-center py-2">
								<Badge className="z-10 bg-[#ededed] text-[0.7rem] font-normal text-black hover:bg-[#ededed]">
									<p>
										<span className="font-bold">
											{totalPoints}
										</span>{" "}
										PTS
									</p>
								</Badge>
							</div>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<Table className="w-[22rem] text-[0.7rem]">
						<TableCaption className="mt-2 text-[0.6rem]">
							Última{lastThreeCircuits.length > 1 && "s"}{" "}
							{lastThreeCircuits.length > 1 &&
								lastThreeCircuits.length}{" "}
							corrida
							{lastThreeCircuits.length > 1 && "s"} de {givenName}{" "}
							{familyName}
						</TableCaption>
						<TableBody>
							{lastThreeCircuits.map(
								([circuit, result], index) => (
									<TableRow key={index}>
										<TableCell className="p-1.5">
											{circuit}
										</TableCell>
										<TableCell className="p-1.5">
											{result.position}º
										</TableCell>
										<TableCell className="p-1.5">
											{result.totalPoints} pts.
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</AccordionContent>
			</div>
		</AccordionItem>
	)
}
