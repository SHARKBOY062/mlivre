import { Link } from "wouter";

export function MLHeader() {
  return (
    <header className="bg-[#ffe600] shadow-sm flex items-center justify-center px-4 md:px-8 sticky top-0 z-50 border-b border-[#e5d100] py-3">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center gap-1">
        <Link href="/">
          <div className="flex items-center justify-center cursor-pointer">
            <img
              src="https://http2.mlstatic.com/storage/pog-cm-admin/calm-assets/mercado-libre-thumbnail--1538x1510--b612412b.webp"
              alt="Mercado Livre"
              className="h-14 md:h-16 object-contain"
              data-testid="img-ml-logo"
            />
          </div>
        </Link>
        <span className="text-[#2d3277] font-bold text-[10px] md:text-xs uppercase tracking-wider text-center">
          Portal de Formalização Administrativa
        </span>
      </div>
    </header>
  );
}
