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
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-8 md:p-12">
                <span className="institutional-label">Programa de Regularização de Habilitação</span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6" data-testid="text-title-no-cnh">
                  Adequação Documental e Técnica
                </h1>
                
                <div className="section-divider" />

                <div className="space-y-6 mb-10">
                  <p className="normative-text">
                    Informamos que a continuidade da sua candidatura na operação logística está condicionada à adesão ao Programa de Regularização de Habilitação. Este procedimento administrativo visa garantir a plena conformidade do colaborador com as exigências operacionais do cargo.
                  </p>

                  <div className="bg-gray-50 p-6 rounded-md border border-gray-100">
                    <h3 className="institutional-label mb-4">Disposições Administrativas</h3>
                    <div className="space-y-3">
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        <strong>Art. 1º</strong> – A taxa administrativa possui natureza operacional e destina-se ao custeio de procedimentos internos necessários à validação documental, integração sistêmica e emissão de registro preliminar.
                      </p>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        <strong>Art. 3º</strong> – Para candidatos participantes do Programa de Regularização de Habilitação, poderão incidir custos adicionais referentes à operacionalização do exame prático junto à instituição credenciada.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <label className="institutional-label mb-4">Modalidade de Preparação</label>
                  <RadioGroupField
                    label=""
                    required
                    options={modalityOptions}
                    value={modality}
                    onChange={setModality}
                  />
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={!modality}
                  className="w-full h-14 ml-button"
                  data-testid="button-continuar-modalidade"
                >
                  Prosseguir para Validação Final
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 md:p-12">
                  <span className="institutional-label">Protocolo de Exames Práticos</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6" data-testid="text-title-tentativas">
                    Normativa de Avaliação Técnica
                  </h1>

                  <div className="section-divider" />

                  <div className="space-y-6 mb-10">
                    <p className="normative-text">
                      Conforme diretrizes da instituição credenciada, o candidato dispõe de <strong>duas tentativas</strong> protocolares para a obtenção da certificação prática necessária. A incidência de tentativas suplementares está sujeita à revisão de custos operacionais.
                    </p>

                    <div className="bg-blue-50/50 p-6 rounded-md border border-blue-100">
                      <h3 className="institutional-label text-[#2d3277] mb-4">Seguro de Reprovação (Opcional)</h3>
                      <p className="normative-text mb-6">
                        O Seguro de Reprovação visa mitigar riscos administrativos, assegurando a manutenção do status da candidatura em caso de necessidade de avaliações adicionais.
                      </p>
                      <RadioGroupField
                        label=""
                        required
                        options={insuranceOptions}
                        value={insurance}
                        onChange={setInsurance}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleContinue}
                    disabled={!insurance || updateMutation.isPending}
                    className="w-full h-14 ml-button"
                    data-testid="button-continuar-seguro"
                  >
                    {updateMutation.isPending ? "Processando no sistema interno..." : "Confirmar e Prosseguir"}
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
