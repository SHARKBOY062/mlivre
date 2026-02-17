import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { useLocation, useParams } from 'wouter';
import { CreditCard, QrCode } from 'lucide-react';

export default function Checkout() {
  const [, navigate] = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const total = queryParams.get('total') || '0,00';
  const insurance = queryParams.get('insurance') === 'sim';

  const handleFinish = () => {
    alert("Pagamento processado com sucesso!");
    navigate("/");
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <span className="institutional-label">Pagamento Administrativo</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                Checkout
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-8">
                <section className="bg-gray-50 p-6 rounded-md border border-gray-200">
                  <h3 className="institutional-label mb-4">Resumo do Pedido</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxa Administrativa</span>
                      <span>R$ 180,00</span>
                    </div>
                    {insurance && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Seguro Pedagógico</span>
                        <span>R$ 58,45</span>
                      </div>
                    )}
                    <div className="section-divider !my-2" />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total a pagar:</span>
                      <span>R$ {total.replace('.', ',')}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="institutional-label mb-4">Forma de Pagamento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="flex items-center gap-4 p-4 border-2 border-blue-100 rounded-lg hover:border-[#2d3277] transition-all bg-blue-50/30 text-left">
                      <QrCode className="w-8 h-8 text-[#2d3277]" />
                      <div>
                        <p className="font-bold text-gray-900">Pix</p>
                        <p className="text-xs text-gray-500">Aprovação imediata</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-lg hover:border-[#2d3277] transition-all text-left">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-bold text-gray-900">Cartão de Crédito</p>
                        <p className="text-xs text-gray-500">Até 12x</p>
                      </div>
                    </button>
                  </div>
                </section>

                <Button
                  onClick={handleFinish}
                  className="w-full h-16 ml-button"
                >
                  Finalizar Pagamento
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
