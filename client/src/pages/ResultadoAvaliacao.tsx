import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { useLocation, useParams } from 'wouter';
import { useState } from 'react';
import { FormInput } from '@/components/ui/form-field';

export default function ResultadoAvaliacao() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp) return;
    
    setIsSubmitting(true);
    // Simulating API call to save WhatsApp
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/obrigado');
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
              <span className="institutional-label">Conclusão da Avaliação</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-green-600 mb-6">
                Resultado da Avaliação
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-6 mb-10">
                <p className="text-xl font-bold text-gray-800">
                  "Parabéns! Você foi considerado APTO para exercer a função e pode ser contratado no mesmo dia, conforme análise do setor responsável."
                </p>
                <p className="normative-text text-lg">
                  "Para dar continuidade ao processo e liberar sua contratação imediata, é necessário realizar o pagamento da taxa administrativa."
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-md border border-gray-200 text-left mb-10">
                <h3 className="institutional-label mb-4">📊 Taxa para Liberação de Contratação</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxa de Inscrição Administrativa:</span>
                    <span>R$ 12,90</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxa de Processamento de Dados:</span>
                    <span>R$ 9,80</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Imposto Operacional de RH:</span>
                    <span>R$ 8,50</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxa de Validação de Cadastro:</span>
                    <span>R$ 7,90</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tarifa de Liberação do Sistema:</span>
                    <span>R$ 10,60</span>
                  </div>
                  <div className="section-divider !my-2" />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span>R$ 49,70</span>
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
                  onChange={(e) => setWhatsapp(e.target.value)}
                  type="tel"
                />

                <Button
                  type="submit"
                  disabled={!whatsapp || isSubmitting}
                  className="w-full h-16 ml-button"
                >
                  {isSubmitting ? "Processando..." : "CONFIRMAR PAGAMENTO E ENVIAR DADOS"}
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
