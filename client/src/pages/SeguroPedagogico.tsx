import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { RadioGroupField } from "@/components/ui/radio-group-field";

export default function SeguroPedagogico() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [choice, setChoice] = useState<string | undefined>(undefined);

  const options = [
    { value: "sim", label: "Desejo aderir ao seguro pedagógico" },
    { value: "nao", label: "Não desejo aderir" }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <span className="institutional-label">Apoio à Aprovação – Opcional</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                Seguro Pedagógico Opcional
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-6 mb-10">
                <p className="normative-text">
                  Você tem a opção de aderir a um seguro pedagógico que amplia seu suporte educacional para até 3 tentativas adicionais de prova prática, com materiais e orientação técnica.
                </p>

                <div className="bg-blue-50/50 p-6 rounded-md border border-blue-100">
                  <p className="normative-text mb-4">
                    Essa opção é <strong className="text-[#2d3277]">totalmente facultativa</strong> e não é condição para contratação. Pode ser incluída ao seu plano de capacitação conforme escolha pessoal.
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed italic">
                    A eventual devolução de valores será tratada conforme política interna de bônus da empresa, não como condição da vaga. O seguro cobre materiais e suporte técnico suplementar.
                  </p>
                </div>
              </div>

              <div className="mb-10">
                <RadioGroupField
                  label="Selecione sua opção:"
                  required
                  options={options}
                  value={choice}
                  onChange={setChoice}
                />
              </div>

              <Button
                onClick={() => navigate(`/resultado-avaliacao/${id}`)}
                disabled={!choice}
                className="w-full h-16 ml-button"
              >
                Confirmar Escolha e Finalizar
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
