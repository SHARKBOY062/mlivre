import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { useLocation, useParams } from "wouter";
import { CreditCard, QrCode, Briefcase, MapPin, DollarSign, AlertTriangle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function VagasCheckout() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const vagaName = queryParams.get("vaga") || "Vaga Selecionada";
  const salario = queryParams.get("salario") || "";

  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const taxaCadastro = 97.0;
  const taxaDocumentacao = 147.0;
  const kitAdmissao = 197.0;
  const total = taxaCadastro + taxaDocumentacao + kitAdmissao;

  const handleFinish = async () => {
    setIsSubmitting(true);
    setLoadingText("Processando informações...");
    setTimeout(() => setLoadingText("Validando documentação..."), 1500);
    setTimeout(() => setLoadingText("Finalizando contratação..."), 3000);
    await new Promise((resolve) => setTimeout(resolve, 4500));
    navigate(`/resultado-avaliacao/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <span className="institutional-label">Finalização do Processo de Contratação</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6" data-testid="text-checkout-title">
                Checkout
              </h1>
              <div className="section-divider" />

              <div className="space-y-8">
                <section className="bg-blue-50/50 p-6 rounded-md border border-blue-100">
                  <h3 className="institutional-label mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Resumo da Vaga
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Vaga:</span>
                      <span className="text-gray-900 font-bold">{vagaName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Empresa parceira:</span>
                      <span className="text-gray-900 font-bold">Mercado Livre Logística</span>
                    </div>
                    {salario && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Salário estimado:</span>
                        <span className="text-green-600 font-bold">{salario}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Localidade:</span>
                      <span className="text-gray-900 font-bold">Região Metropolitana</span>
                    </div>
                  </div>
                </section>

                <section className="bg-gray-50 p-6 rounded-md border border-gray-200">
                  <h3 className="institutional-label mb-4 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Taxa Administrativa
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxa de Cadastro</span>
                      <span>R$ {taxaCadastro.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxa de Documentação</span>
                      <span>R$ {taxaDocumentacao.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Kit de Admissão</span>
                      <span>R$ {kitAdmissao.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="section-divider !my-2" />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                    </div>
                  </div>
                </section>

                <div className="bg-amber-50 border border-amber-200 p-5 rounded-md">
                  <div className="flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-900 text-sm font-bold leading-relaxed">
                      Todos os valores serão reembolsados no primeiro salário, junto com os adicionais de contratação. Dependendo do cargo, a remuneração pode chegar até R$ 5.543,76 + adicionais.
                    </p>
                  </div>
                </div>

                <section>
                  <h3 className="institutional-label mb-4">Forma de Pagamento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      className="flex items-center gap-4 p-4 border-2 border-blue-100 rounded-lg hover:border-[#2d3277] transition-all bg-blue-50/30 text-left"
                      data-testid="button-pix"
                    >
                      <QrCode className="w-8 h-8 text-[#2d3277]" />
                      <div>
                        <p className="font-bold text-gray-900">Pix</p>
                        <p className="text-xs text-gray-500">Aprovação imediata</p>
                      </div>
                    </button>
                    <button
                      className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-lg hover:border-[#2d3277] transition-all text-left"
                      data-testid="button-cartao"
                    >
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-bold text-gray-900">Cartão de Crédito</p>
                        <p className="text-xs text-gray-500">Até 12x</p>
                      </div>
                    </button>
                  </div>
                </section>

                <div className="bg-gray-50/50 p-6 rounded-md border border-gray-200">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="accept-terms-checkout"
                      checked={accepted}
                      onCheckedChange={(val) => setAccepted(val === true)}
                      className="mt-1 border-gray-300 data-[state=checked]:bg-[#2d3277] data-[state=checked]:border-[#2d3277]"
                      data-testid="checkbox-aceite-checkout"
                    />
                    <Label
                      htmlFor="accept-terms-checkout"
                      className="normative-text leading-relaxed cursor-pointer font-bold text-gray-700"
                    >
                      Declaro que li e concordo com os termos administrativos e aceito os valores apresentados para prosseguir com a contratação.
                    </Label>
                  </div>
                </div>

                <Button
                  onClick={handleFinish}
                  disabled={!accepted || isSubmitting}
                  className="w-full h-16 ml-button"
                  data-testid="button-finalizar-contratacao"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {loadingText}
                    </span>
                  ) : (
                    "FINALIZAR CONTRATAÇÃO"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
