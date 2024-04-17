export function Footer() {
	return (
		<footer className="bg-muted-foreground text-muted w-full min-h-20 flex items-center justify-center">
			<div className="w-full flex max-w-5xl flex-col items-end justify-center h-full gap-1 py-4 px-2">
				<p className="text-right">
					O Plano F1 sem <span className="blur-[2px]">Red Bull</span>{" "}
					foi criado com fins humorísticos e de entretenimento.
				</p>
				<p className="text-right">
					Este site <span className="font-bold">não</span> representa
					os resultados oficiais da Fórmula 1. Qualquer infomação
					dentro destas páginas é meramente fictícia e não deve ser
					levada a sério.
				</p>
			</div>
		</footer>
	)
}
