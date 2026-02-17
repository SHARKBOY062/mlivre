import { Link } from "wouter";

export function MLFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-8">
          <Link href="/termos" className="hover:text-[#2d3277] transition-colors" data-testid="link-terms">
            Termos de Uso
          </Link>
          <Link href="/privacidade" className="hover:text-[#2d3277] transition-colors" data-testid="link-privacy">
            Política de Privacidade
          </Link>
          <Link href="/suporte" className="hover:text-[#2d3277] transition-colors" data-testid="link-support">
            Canal Oficial de Atendimento
          </Link>
        </div>
        <div className="text-center space-y-2">
          <p className="text-[10px] text-gray-400 font-medium">
            © Mercado Livre – Processo Seletivo Operacional (Logística)
          </p>
          <p className="text-[9px] text-gray-300 max-w-lg mx-auto leading-relaxed">
            AVISO DE CONFIDENCIALIDADE: Este ambiente e as informações nele contidas são restritos à finalidade de recrutamento e seleção. O acesso não autorizado ou o uso indevido de dados constitui infração legal conforme as normas vigentes.
          </p>
        </div>
      </div>
    </footer>
  );
}
