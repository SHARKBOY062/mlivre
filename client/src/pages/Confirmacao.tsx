import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { RadioGroupField } from '@/components/ui/radio-group-field';
import { useLocation, useParams } from 'wouter';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function Confirmacao() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const candidateId = params.id;
  const [accepted, setAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState("Processando seus dados...");
  const [processingProgress, setProcessingProgress] = useState(0);

  const [formData, setFormData] = useState({
    insurance: 'nao',
  });

  const productValue = 180.00;
  const insuranceFee = 43.87;
  const total = formData.insurance === 'sim' ? productValue + insuranceFee : productValue;

  const handleSubmit = () => {
    setIsProcessing(true);

    const duration = 12000;
    const interval = 100;
    const steps = duration / interval;
    const increment = 100 / steps;

    const progressInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    setTimeout(() => setProcessingText("Validando informações no sistema..."), 2000);
    setTimeout(() => setProcessingText("Verificando elegibilidade do candidato..."), 4500);
    setTimeout(() => setProcessingText("Consultando base de dados interna..."), 7000);
    setTimeout(() => setProcessingText("Atualizando status da candidatura..."), 9500);

    setTimeout(() => {
      clearInterval(progressInterval);
      navigate(`/resultado-avaliacao/${candidateId}?seguro=${formData.insurance}`);
    }, duration);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <MLHeader />
        <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 max-w-md"
          >
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 border-[5px] border-gray-200 border-t-[#2d3277] rounded-full animate-spin" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3" data-testid="text-processing-title">
              {processingText}
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Aguarde enquanto analisamos suas informações.
            </p>
            <div className="space-y-2 max-w-xs mx-auto">
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className="h-full bg-[#2d3277] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${processingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                {Math.round(processingProgress)}%
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-8 md:p-12">
              <span className="institutional-label">Conclusão da Avaliação</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6" data-testid="text-title-confirmacao">
                Resumo de Valores e Opção de Seguro
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-8">
                <section>
                  <div className="bg-blue-50 border border-blue-100 p-6 rounded-md mb-6">
                    <p className="text-blue-800 text-sm font-medium">
                      "Você pode optar por aderir ao seguro pedagógico, que amplia seu suporte educacional e oferece mais segurança durante o processo de capacitação."
                    </p>
                  </div>

                  <div className="mb-6">
                    <RadioGroupField
                      label="Selecione sua opção:"
                      required
                      options={[
                        { value: 'sim', label: 'Desejo aderir ao seguro pedagógico' },
                        { value: 'nao', label: 'Não desejo aderir' }
                      ]}
                      value={formData.insurance}
                      onChange={(val) => setFormData({ insurance: val || 'nao' })}
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-md p-6 space-y-3" data-testid="resumo-valores">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Valor do produto:</span>
                      <span>R$ {productValue.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {formData.insurance === 'sim' && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Seguro pedagógico:</span>
                        <span>R$ {insuranceFee.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}
                    <div className="section-divider !my-2" />
                    <div className="flex justify-between text-xl font-extrabold text-gray-900">
                      <span>Total:</span>
                      <span data-testid="text-valor-total">R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-amber-900 text-xs leading-relaxed font-bold">
                      Importante: O valor do seguro será devolvido no salário do primeiro mês como bonificação, além dos adicionais de contratação. Dependendo do cargo, a remuneração pode chegar até R$ 5.543,76 + adicionais.
                    </p>
                  </div>
                </section>

                <div className="section-divider" />

                <div className="bg-gray-50/50 p-6 rounded-md border border-gray-200">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="accept-terms"
                      checked={accepted}
                      onCheckedChange={(val) => setAccepted(val === true)}
                      className="mt-1 border-gray-300 data-[state=checked]:bg-[#2d3277] data-[state=checked]:border-[#2d3277]"
                      data-testid="checkbox-aceite"
                    />
                    <Label htmlFor="accept-terms" className="normative-text leading-relaxed cursor-pointer font-bold text-gray-700">
                      Declaro, sob as penas da lei, que li, compreendi e concordo integralmente com as disposições administrativas acima descritas.
                    </Label>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!accepted}
                  className="w-full h-16 ml-button"
                  data-testid="button-finalizar"
                >
                  CONFIRMAR E IR PARA O CHECKOUT
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
