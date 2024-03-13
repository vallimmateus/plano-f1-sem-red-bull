import React from 'react';

export function TitlePage({children}: {children: React.ReactNode}) {
    return (
        <h1 className="text-4xl font-bold border-t-[10px] border-r-[10px] rounded-tr-3xl border-formula-one-red pt-1.5 pr-5 mb-8">{children}</h1>
    );
}