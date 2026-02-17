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

  const handleSubmit = async () => {
    if (!allFilled) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#ededed]">
        <MLHeader />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4" data-testid="text-success">
                Participação Confirmada!
              </h1>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Sua reserva de vaga foi registrada com sucesso. Você receberá um e-mail com os próximos passos e o agendamento detalhado.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <p className="text-[#2d3277] text-sm">
                  Mantenha seu WhatsApp atualizado. Nossa equipe entrará em contato em breve.
                </p>
              </div>
              <Button
                onClick={() => navigate("/")}
                className="ml-button"
                data-testid="button-voltar-inicio"
              >
                Voltar ao Início
              </Button>
            </div>
          </motion.div>
        </main>
        <MLFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ededed]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#2d3277] to-[#2968c8] p-8 text-white text-center">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-title-confirmacao">
                Confirmação da Sua Participação
              </h1>
              <p className="text-white/90 text-lg">
                Último passo para concluir sua reserva de vaga.
              </p>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Você já concluiu quase todo o processo. Falta apenas confirmar sua participação preenchendo os dados abaixo.
              </p>

              <Card className="ml-card mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Dados Bancários</h2>

                  <FormInput
                    label="Banco"
                    required
                    placeholder="Ex: Banco do Brasil, Itaú, Nubank..."
                    value={formData.banco}
                    onChange={(e) => updateField('banco', e.target.value)}
                    data-testid="input-banco"
                  />

                  <FormInput
                    label="Agência"
                    required
                    placeholder="Ex: 1234"
                    value={formData.agencia}
                    onChange={(e) => updateField('agencia', e.target.value)}
                    data-testid="input-agencia"
                  />

                  <FormInput
                    label="Conta"
                    required
                    placeholder="Ex: 12345-6"
                    value={formData.conta}
                    onChange={(e) => updateField('conta', e.target.value)}
                    data-testid="input-conta"
                  />

                  <FormInput
                    label="Chave Pix"
                    required
                    placeholder="CPF, e-mail, telefone ou chave aleatória"
                    value={formData.chavePix}
                    onChange={(e) => updateField('chavePix', e.target.value)}
                    data-testid="input-chave-pix"
                  />

                  <FormInput
                    label="Nome do titular"
                    required
                    placeholder="Nome completo do titular da conta"
                    value={formData.titular}
                    onChange={(e) => updateField('titular', e.target.value)}
                    data-testid="input-titular"
                  />

                  <FormInput
                    label="CPF do titular"
                    required
                    placeholder="Somente números"
                    value={formData.cpfTitular}
                    onChange={(e) => updateField('cpfTitular', e.target.value)}
                    data-testid="input-cpf-titular"
                  />
                </CardContent>
              </Card>

              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="accept-terms"
                    checked={accepted}
                    onCheckedChange={(val) => setAccepted(val === true)}
                    className="mt-1"
                    data-testid="checkbox-aceite"
                  />
                  <Label htmlFor="accept-terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    Declaro que li e aceito os{" "}
                    <a href="/termos" className="text-[#2968c8] underline">Termos e Condições</a>{" "}
                    e a{" "}
                    <a href="/privacidade" className="text-[#2968c8] underline">Política de Privacidade</a>.
                    Confirmo que as informações fornecidas são verdadeiras e autorizo o processamento dos meus dados para fins de contratação.
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!allFilled || isSubmitting}
                className="w-full h-14 text-lg ml-button shadow-lg"
                data-testid="button-finalizar"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processando...
                  </span>
                ) : (
                  "Confirmar e Finalizar Minha Vaga"
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <MLFooter />
    </div>
  );
}
