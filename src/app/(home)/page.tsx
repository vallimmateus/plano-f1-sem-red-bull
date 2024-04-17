import { Suspense } from "react"

import { TitlePage } from "@/components/title-page"

import { Loading } from "./components/driver/loading"
import { Standings } from "./components/standings"

export default function Page() {
	return (
		<main className="h-full w-full bg-[radial-gradient(#514e61,_#14141c)]">
			<div className="flex h-full min-h-screen w-full flex-col items-center bg-[url('https://www.formula1.com/etc/designs/fom-website/images/patterns/plus-x1.png')] bg-repeat p-20">
				<div className="flex w-full min-w-96 flex-col items-center justify-center text-white">
					<TitlePage>Classificação</TitlePage>
					<Suspense
						fallback={
							<div className="flex flex-col items-center gap-1.5">
								{Array.from({ length: 5 }).map((_, index) => (
									<Loading position={index + 1} key={index} />
								))}
							</div>
						}>
						<Standings />
					</Suspense>
				</div>
			</div>
		</main>
	)
}
