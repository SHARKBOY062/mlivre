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
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2" data-testid="text-title-cnh">
                Parabéns! Você Está na Etapa Final de Formalização
              </h1>
              <p className="text-white/90 text-lg">
                Sua candidatura foi pré-aprovada para a operação logística.
              </p>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Informamos que sua candidatura avançou para a fase final do nosso processo seletivo. Para garantir a reserva da sua vaga no lote atual de contratações, é necessária a confirmação da sua participação.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-gray-100">
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800 text-sm">Garantia de Reserva</h3>
                    <p className="text-xs text-gray-500 mt-1">Sua vaga fica reservada no lote atual</p>
                  </CardContent>
                </Card>
                <Card className="border-gray-100">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800 text-sm">Agendamento Prioritário</h3>
                    <p className="text-xs text-gray-500 mt-1">Prioridade no agendamento de início</p>
                  </CardContent>
                </Card>
                <Card className="border-gray-100">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-800 text-sm">Próximo Ciclo</h3>
                    <p className="text-xs text-gray-500 mt-1">Inclusão no próximo ciclo operacional</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-8">
                <p className="text-amber-800 text-sm font-medium">
                  As vagas desta etapa são limitadas e preenchidas por ordem de confirmação.
                </p>
              </div>

              <Button
                onClick={() => navigate(`/confirmacao/${candidateId}`)}
                className="w-full h-14 text-lg ml-button shadow-lg"
                data-testid="button-garantir-vaga"
              >
                Garantir Minha Vaga Agora
              </Button>
            </div>
          </div>
        </motion.div>
      </main>

      <MLFooter />
    </div>
  );
}
