import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function Loading({ position }: { position: number }) {
	return (
		<div
			className={cn("group flex w-96 items-center rounded", {
				"h-32 bg-[#38393e] text-white": position === 1,
				"h-16 bg-white text-black": position > 1,
			})}>
			<div className="flex w-11 justify-center">
				<h2 className="font-bold">{position}</h2>
			</div>
			<div
				className={cn("h-full w-1 transition-all group-hover:w-1.5", {
					"py-5 group-hover:py-3": position === 1,
					"py-3.5 group-hover:py-2": position > 1,
				})}>
				<div className="h-full w-full bg-zinc-500" />
			</div>
			<div
				className={cn(
					"flex h-full flex-1 flex-col justify-center pl-2.5 transition-all group-hover:translate-x-1",
					{
						"justify-between py-5": position === 1,
						"gap-1 py-3.5": position > 1,
					}
				)}>
				{position === 1 ? (
					<div className="flex flex-col gap-2">
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-7 w-32" />
					</div>
				) : (
					<Skeleton className="h-5 w-32 bg-[#ededed]" />
				)}
				<Skeleton
					className={cn("h-[0.6rem] w-14", {
						"bg-[#ededed]": position > 1,
					})}
				/>
			</div>
			<div
				className={cn("flex h-full min-w-20", {
					"relative items-end": position === 1,
					"items-center": position > 1,
				})}>
				<div className="flex w-20 justify-center py-2">
					<Skeleton className="h-[22px] w-[68px] rounded-full bg-[#ededed]" />
				</div>
			</div>
		</div>
	)
}
