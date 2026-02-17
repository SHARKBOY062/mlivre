import { Link } from "wouter";

export function MLFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500 mb-4">
          <Link href="/termos" className="hover:text-[#2968c8] transition-colors" data-testid="link-terms">
            Termos e Condições
          </Link>
          <Link href="/privacidade" className="hover:text-[#2968c8] transition-colors" data-testid="link-privacy">
            Política de Privacidade
          </Link>
          <Link href="/faq" className="hover:text-[#2968c8] transition-colors" data-testid="link-faq">
            Perguntas Frequentes
          </Link>
          <Link href="/suporte" className="hover:text-[#2968c8] transition-colors" data-testid="link-support">
            Suporte
          </Link>
        </div>
        <p className="text-center text-xs text-gray-400">
          Mercado Livre - Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
