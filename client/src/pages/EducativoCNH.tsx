import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

export default function EducativoCNH() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <span className="institutional-label">Informação Oficial – Exames de CNH</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                Custos Oficiais de Exames – CNH
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-6 mb-10">
                <p className="normative-text">
                  Para sua informação, os exames necessários para obtenção da Carteira Nacional de Habilitação (CNH) possuem valores praticados conforme tabela de custos autorizados pelo órgão regulador de trânsito.
                </p>

                <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                  <p className="normative-text mb-4">
                    De acordo com publicação disponível em fonte jornalística confiável, o valor máximo sugerido para exames de CNH é de até R$ 180,00 por cada etapa, conforme regulamentação de limite de valores para serviços de trânsito.
                  </p>
                  <a 
                    href="https://www.cnnbrasil.com.br/auto/senatran-limita-em-r-180-valor-maximo-para-todos-exames-da-cnh/#google_vignette" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#2d3277] text-xs font-bold uppercase tracking-wider hover:underline"
                  >
                    Ver notícia original <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="normative-text">
                  Esses valores são praticados pelo DETRAN e variam conforme unidade estadual. O candidato deve buscar valores atualizados diretamente no órgão de trânsito de sua unidade federativa. Esta informação é meramente educativa e visa transparência no processo.
                </p>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-md border border-gray-200 mb-10">
                <div className="flex items-start gap-4">
                  <Checkbox
                    id="consent"
                    checked={accepted}
                    onCheckedChange={(val) => setAccepted(val === true)}
                    className="mt-1 border-gray-300 data-[state=checked]:bg-[#2d3277] data-[state=checked]:border-[#2d3277]"
                  />
                  <Label htmlFor="consent" className="normative-text leading-relaxed cursor-pointer font-bold text-gray-700">
                    Declaro que li as informações acima e estou ciente dos procedimentos necessários para obtenção de CNH. Entendo que a empresa não condiciona contratação a qualquer pagamento e que todas as obrigações legais estão descritas aqui.
                  </Label>
                </div>
              </div>

              <Button
                onClick={() => navigate(`/seguro-pedagogico/${id}`)}
                disabled={!accepted}
                className="w-full h-16 ml-button"
              >
                Prosseguir
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
