import { motion } from 'framer-motion';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Obrigado() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-14 h-14 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
              Cadastro Concluído com Sucesso
            </h1>
            
            <div className="section-divider" />

            <div className="space-y-6 mb-10">
              <p className="text-xl text-gray-700 leading-relaxed">
                "Agradecemos sua participação no processo seletivo."
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                "Nossa equipe especializada no ramo entrará em contato com você em breve pelo WhatsApp informado para dar continuidade à sua contratação."
              </p>
              <p className="text-md font-bold text-[#2d3277] uppercase tracking-widest">
                "Fique atento ao seu telefone."
              </p>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="ml-button"
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
