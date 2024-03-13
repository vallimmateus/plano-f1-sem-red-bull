import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-muted-foreground text-muted w-full min-h-20 flex items-center justify-center">
            <div className="w-full flex max-w-5xl flex-col items-end justify-center h-full gap-1 py-4 px-2">
                <p className="text-right">O Plano F1 sem <span className="blur-[2px]">Red Bull</span> foi criado pelo <Link className="underline" href="https://www.instagram.com/canaleffe1">Canal EFFE1</Link>.</p>
                <p className="text-right">Este site é uma paródia do site oficial da Fórmula 1 criado por Mateus Vallim.</p>
            </div>
        </footer>
    )
}
