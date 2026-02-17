import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { FormInput } from '@/components/ui/form-field';
import { RadioGroupField } from '@/components/ui/radio-group-field';
import { useLocation, useParams } from 'wouter';
import { CheckCircle2, Lock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function Confirmacao() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const candidateId = params.id;
  const [loadingText, setLoadingText] = useState("Processando informações no sistema interno...");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    insurance: 'nao',
  });

  const productValue = 180.00;
  const insuranceFee = 58.45;
  const total = formData.insurance === 'sim' ? productValue + insuranceFee : productValue;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Animação de carregamento institucional
    setTimeout(() => setLoadingText("Validando elegibilidade..."), 1500);
    setTimeout(() => setLoadingText("Atualizando status da candidatura..."), 3000);
    
    await new Promise(resolve => setTimeout(resolve, 4500));
    navigate(`/checkout/${candidateId}?total=${total.toFixed(2)}&insurance=${formData.insurance}`);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <MLHeader />
        <main className="max-w-3xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <span className="institutional-label mb-8">Processo Administrativo Finalizado</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6" data-testid="text-success">
                Ciência Registrada com Sucesso
              </h1>
              <div className="section-divider" />
              <p className="normative-text mb-10 mx-auto max-w-lg">
                Sua formalização foi processada nos sistemas internos. O candidato deverá aguardar o contato via canal oficial para os próximos procedimentos operacionais.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="ml-button"
                data-testid="button-voltar-inicio"
              >
                Retornar ao Portal
              </Button>
            </div>
          </motion.div>
        </main>
        <MLFooter />
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
              <span className="institutional-label">Finalização do Processo Administrativo</span>
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
                        { value: 'sim', label: 'Com seguro' },
                        { value: 'nao', label: 'Sem seguro' }
                      ]}
                      value={formData.insurance}
                      onChange={(val) => setFormData({ insurance: val || 'nao' })}
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-md p-6 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Valor do produto:</span>
                      <span>R$ {productValue.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {formData.insurance === 'sim' && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Taxa do seguro:</span>
                        <span>R$ {insuranceFee.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}
                    <div className="section-divider !my-2" />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span>R$ {total.toFixed(2).replace('.', ',')}</span>
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
                  disabled={!accepted || isSubmitting}
                  className="w-full h-16 ml-button"
                  data-testid="button-finalizar"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {loadingText}
                    </span>
                  ) : (
                    "CONFIRMAR E IR PARA O CHECKOUT"
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
