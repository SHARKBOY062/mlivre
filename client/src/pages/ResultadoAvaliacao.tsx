import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { RadioGroupField } from '@/components/ui/radio-group-field';
import { useLocation, useParams } from 'wouter';
import { useState } from 'react';
import { FormInput } from '@/components/ui/form-field';
import { apiRequest } from '@/lib/queryClient';

export default function ResultadoAvaliacao() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const initialSeguro = queryParams.get("seguro") || "sim";
  const [seguro, setSeguro] = useState(initialSeguro);

  const valorBase = 180.00;
  const valorSeguro = 48.45;
  const total = seguro === "sim" ? valorBase + valorSeguro : valorBase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp) return;
    
    setIsSubmitting(true);
    try {
      await apiRequest("PATCH", `/api/candidates/${id}`, { finalWhatsapp: whatsapp });
      navigate('/obrigado');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-8 md:p-12 text-center">
              <span className="institutional-label text-blue-600">Conclusão da Avaliação</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                Resultado da Avaliação
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-6 mb-10">
                <p className="text-xl font-bold text-green-600">
                  "Parabéns! Você foi considerado APTO para exercer a função e pode ser contratado no mesmo dia, conforme análise do setor responsável."
                </p>
                <p className="normative-text text-lg">
                  "Para dar continuidade ao processo e liberar sua contratação imediata, é necessário realizar o pagamento da taxa administrativa."
                </p>
              </div>

              <div className="text-left mb-6">
                <RadioGroupField
                  label="Seguro pedagógico:"
                  required
                  options={[
                    { value: 'sim', label: 'Desejo aderir ao seguro pedagógico (+ R$ 48,45)' },
                    { value: 'nao', label: 'Não desejo aderir' }
                  ]}
                  value={seguro}
                  onChange={(val) => setSeguro(val || 'nao')}
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-md border border-gray-200 text-left mb-10" data-testid="resumo-resultado">
                <h3 className="institutional-label mb-4">Resumo do Pagamento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Valor do produto:</span>
                    <span>R$ {valorBase.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {seguro === "sim" && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Seguro pedagógico:</span>
                      <span>R$ {valorSeguro.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="section-divider !my-2" />
                  <div className="flex justify-between text-xl font-extrabold text-gray-900">
                    <span>Total:</span>
                    <span data-testid="text-valor-final">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>

              <p className="normative-text mb-10 font-bold text-[#2d3277]">
                "Após a confirmação do pagamento, sua contratação será encaminhada para a agência responsável."
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <FormInput
                  label="Informe seu número de WhatsApp para contato:"
                  required
                  placeholder="(11) 91234-5678"
                  value={whatsapp}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.length > 11) v = v.slice(0, 11);
                    if (v.length > 10) {
                      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
                    } else if (v.length > 6) {
                      v = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
                    } else if (v.length > 2) {
                      v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                    } else if (v.length > 0) {
                      v = `(${v}`;
                    }
                    setWhatsapp(v);
                  }}
                  type="tel"
                />

                <Button
                  type="submit"
                  disabled={!whatsapp || isSubmitting}
                  className="w-full h-16 ml-button"
                  data-testid="button-confirmar-pagamento"
                >
                  {isSubmitting ? "PROCESSANDO..." : "CONFIRMAR PAGAMENTO E ENVIAR DADOS"}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>

      <MLFooter />
    </div>
  );
}
