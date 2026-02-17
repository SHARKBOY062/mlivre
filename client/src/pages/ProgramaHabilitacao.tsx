import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { RadioGroupField } from '@/components/ui/radio-group-field';
import { useLocation, useParams } from 'wouter';
import { Car, BookOpen, Shield, ArrowRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const modalityOptions = [
  { value: "completo", label: "Curso completo - aulas teóricas e práticas" },
  { value: "apenas_exame", label: "Apenas exame prático na autoescola designada" },
];

const insuranceOptions = [
  { value: "sim", label: "Incluir Seguro de Reprovação" },
  { value: "nao", label: "Prosseguir sem seguro" },
];

export default function ProgramaHabilitacao() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const candidateId = params.id;
  const [modality, setModality] = useState<string | undefined>(undefined);
  const [insurance, setInsurance] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(1);

  const updateMutation = useMutation({
    mutationFn: async (data: { licenseType: string; hasInsurance: boolean }) => {
      const res = await apiRequest("PATCH", `/api/candidates/${candidateId}`, data);
      return res.json();
    },
    onSuccess: () => {
      navigate(`/confirmacao/${candidateId}`);
    },
  });

  const handleContinue = () => {
    if (step === 1 && modality) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (step === 2 && insurance !== undefined && modality) {
      updateMutation.mutate({
        licenseType: modality,
        hasInsurance: insurance === "sim",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#ededed]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === 1 && (
            <>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-[#2d3277] to-[#2968c8] p-8 text-white text-center">
                  <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Car className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-title-no-cnh">
                    Você Pode Trabalhar Mesmo Sem CNH
                  </h1>
                  <p className="text-white/90 text-lg">
                    Programa de Habilitação Vinculado à Contratação
                  </p>
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Informamos que você poderá ingressar na nossa operação logística mediante adesão ao Programa de Regularização de Habilitação. Além da oportunidade de renda, você poderá conquistar sua CNH.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="border-gray-100">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800 text-sm">Mercado de Trabalho</h3>
                        <p className="text-xs text-gray-500 mt-1">Entrada imediata no mercado</p>
                      </CardContent>
                    </Card>
                    <Card className="border-gray-100">
                      <CardContent className="p-4 text-center">
                        <Car className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800 text-sm">Suporte CNH</h3>
                        <p className="text-xs text-gray-500 mt-1">Apoio no processo de habilitação</p>
                      </CardContent>
                    </Card>
                    <Card className="border-gray-100">
                      <CardContent className="p-4 text-center">
                        <Shield className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800 text-sm">Operação Ativa</h3>
                        <p className="text-xs text-gray-500 mt-1">Inclusão em operação ativa</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Escolha sua modalidade</h2>
                    <RadioGroupField
                      label="Selecione a opção mais adequada para você:"
                      required
                      options={modalityOptions}
                      value={modality}
                      onChange={setModality}
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">
                      A escolha da modalidade não altera sua elegibilidade, apenas define sua preparação.
                    </p>
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={!modality}
                    className="w-full h-14 text-lg ml-button shadow-lg"
                    data-testid="button-continuar-modalidade"
                  >
                    <span className="flex items-center gap-2">
                      Continuar
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-[#2d3277] to-[#2968c8] p-6 text-white">
                  <h1 className="text-xl md:text-2xl font-bold" data-testid="text-title-tentativas">
                    Política de Tentativas no Exame
                  </h1>
                </div>

                <div className="p-6 md:p-8">
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      O candidato terá direito a <strong>duas tentativas</strong> para aprovação no exame prático. A maioria dos candidatos é aprovada na primeira tentativa.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Caso seja necessária uma tentativa adicional além das duas incluídas, haverá um custo operacional correspondente.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-5 mb-6">
                    <h3 className="font-bold text-[#2d3277] mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Seguro de Reprovação
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      Para maior tranquilidade, você pode incluir o Seguro de Reprovação e garantir tentativas adicionais sem necessidade de novo processo seletivo.
                    </p>
                    <RadioGroupField
                      label="Deseja incluir o Seguro de Reprovação?"
                      required
                      options={insuranceOptions}
                      value={insurance}
                      onChange={setInsurance}
                    />
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={!insurance || updateMutation.isPending}
                    className="w-full h-14 text-lg ml-button shadow-lg"
                    data-testid="button-continuar-seguro"
                  >
                    {updateMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Continuar para Confirmação
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <MLFooter />
    </div>
  );
}
