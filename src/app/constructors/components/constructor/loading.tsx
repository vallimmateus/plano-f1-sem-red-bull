import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Loading({ position }: { position: number }) {
	return (
		<div
			className={cn(
				"relative flex h-[7.5rem] w-[28rem] flex-col items-center rounded max-sm:w-full",
				{
					"bg-[#38393e] text-white": position === 1,
					"bg-white text-black": position > 1,
				}
			)}>
			<Image
				src="/car.svg"
				alt="Silhouette F1 Car"
				width={432}
				height={128}
				className="absolute right-0 z-10 h-[7.5rem] w-fit translate-x-1/2 animate-pulse object-contain max-sm:opacity-70"
			/>
			<div className="relative h-full w-full overflow-hidden rounded">
				<Skeleton
					className={cn(
						"absolute z-0 h-full w-full -translate-x-[calc(100%-6px)]",
						{
							"bg-[#bbb]": position > 1,
						},
						"rounded-none"
					)}
				/>
				<div className="z-10 flex h-full w-full flex-col p-4 [&_*]:z-10">
					<div className="flex h-10 flex-1 items-center gap-3">
						<h2 className="w-10 text-center text-xl font-bold">
							{position}
						</h2>
						<Skeleton
							className={cn("z-10 h-7 w-16 rounded-full", {
								"bg-[#bbb]": position > 1,
							})}
						/>
					</div>
					<div className="flex-1">
						<Skeleton
							className={cn("h-9 w-44", {
								"bg-[#bbb]": position > 1,
							})}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
