import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { useLocation, useParams } from 'wouter';
import { CheckCircle2, Shield, Clock, Users } from 'lucide-react';

export default function EtapaFinalCNH() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const candidateId = params.id;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <span className="institutional-label">Fase Final de Integração Operacional</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6" data-testid="text-title-cnh">
                Formalização Administrativa
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-6 mb-10">
                <p className="normative-text">
                  Informamos que sua candidatura avançou para a fase final do processo administrativo vinculado à operação logística. Para garantir a reserva da sua vaga no lote vigente de contratações, é necessária a formalização da ciência e conformidade com as normas institucionais.
                </p>

                <div className="bg-gray-50 p-6 rounded-md border border-gray-100">
                  <h3 className="institutional-label mb-4">Garantias e Prazos</h3>
                  <ul className="normative-text list-disc list-inside space-y-2">
                    <li>Reserva de vaga garantida no lote operacional atual</li>
                    <li>Prioridade absoluta no agendamento de início</li>
                    <li>Inclusão imediata no ciclo de treinamento sistêmico</li>
                  </ul>
                </div>

                <div className="bg-amber-50/50 border border-amber-100 rounded-md p-5">
                  <p className="text-[11px] text-amber-900 font-bold uppercase tracking-wider">
                    Aviso: As vagas são limitadas por ciclo e preenchidas conforme protocolo de confirmação.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => navigate(`/resultado-avaliacao/${candidateId}`)}
                className="w-full h-14 ml-button"
                data-testid="button-garantir-vaga"
              >
                Garantir Reserva e Prosseguir
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <MLFooter />
    </div>
  );
}
