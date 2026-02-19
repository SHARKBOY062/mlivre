import { Link } from "wouter";

export function MLHeader() {
  return (
    <header className="bg-[#ffe600] h-16 shadow-sm flex items-center px-4 md:px-8 sticky top-0 z-50 border-b border-[#e5d100]">
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://http2.mlstatic.com/storage/pog-cm-admin/calm-assets/mercado-libre-thumbnail--1538x1510--b612412b.webp"
              alt="Mercado Livre"
              className="h-8 md:h-10 object-contain"
              data-testid="img-ml-logo"
            />
          </div>
        </Link>
        <span className="text-[#2d3277] font-bold text-xs md:text-sm uppercase tracking-wider hidden sm:block">
          Portal de Formalização Administrativa
        </span>
      </div>
    </header>
  );
}
