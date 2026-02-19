import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { useLocation, useParams } from 'wouter';
import { CreditCard, QrCode, Copy, CheckCircle2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import QRCode from 'qrcode';

type PaymentMethod = 'pix' | 'card';

export default function Checkout() {
  const [, navigate] = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(window.location.search);

  const totalParam = queryParams.get('total') || '0,00';
  const insurance = queryParams.get('insurance') === 'sim';

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [loading, setLoading] = useState(false);
  const [pixError, setPixError] = useState('');
  const [pixCode, setPixCode] = useState('');
  const [pixQrImage, setPixQrImage] = useState('');
  const [copied, setCopied] = useState(false);

  const totalNumber = useMemo(() => {
    // "238,45" -> 238.45 | "238.45" -> 238.45
    const normalized = totalParam.includes(',')
      ? totalParam.replace(/\./g, '').replace(',', '.')
      : totalParam;
    const value = Number(normalized);
    return Number.isFinite(value) ? value : 0;
  }, [totalParam]);

  const totalDisplay = useMemo(() => {
    return totalNumber.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, [totalNumber]);

  const handleFinish = async () => {
    if (paymentMethod === 'card') {
      navigate(`/resultado-avaliacao/${params.id}`);
      return;
    }

    try {
      setLoading(true);
      setPixError('');
      setPixCode('');
      setPixQrImage('');
      setCopied(false);

      const payload = {
        amount: totalNumber,
        // TROQUE PELOS DADOS REAIS DO SEU FLUXO
        name: 'John Doe',
        document: '12345678900',
        phone: '11999999999',
        external_id: `PEDIDO-${params.id || 'SEMID'}-${Date.now()}`,
      };

      const resp = await fetch('/api/pix/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data?.message || 'Erro ao gerar PIX');
      }

      const qrCodeText =
        data?.qr_code_text ||
        data?.qrCodeText ||
        data?.pix_code ||
        data?.code ||
        '';

      if (!qrCodeText) {
        throw new Error('PIX gerado, mas sem código copia e cola na resposta');
      }

      setPixCode(qrCodeText);

      // Gera imagem do QR Code a partir do código PIX
      const qrImageDataUrl = await QRCode.toDataURL(qrCodeText, {
        width: 280,
        margin: 2,
      });

      setPixQrImage(qrImageDataUrl);
    } catch (err: any) {
      setPixError(err?.message || 'Erro ao gerar PIX');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = async () => {
    if (!pixCode) return;
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setPixError('Não foi possível copiar o código PIX');
    }
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
                      <span>{totalDisplay}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="institutional-label mb-4">Forma de Pagamento</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg transition-all text-left ${
                        paymentMethod === 'pix'
                          ? 'border-[#2d3277] bg-blue-50/40'
                          : 'border-blue-100 hover:border-[#2d3277] bg-blue-50/20'
                      }`}
                    >
                      <QrCode className="w-8 h-8 text-[#2d3277]" />
                      <div>
                        <p className="font-bold text-gray-900">Pix</p>
                        <p className="text-xs text-gray-500">Aprovação imediata</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg transition-all text-left ${
                        paymentMethod === 'card'
                          ? 'border-[#2d3277] bg-blue-50/20'
                          : 'border-gray-100 hover:border-[#2d3277]'
                      }`}
                    >
                      <CreditCard
                        className={`w-8 h-8 ${
                          paymentMethod === 'card' ? 'text-[#2d3277]' : 'text-gray-400'
                        }`}
                      />
                      <div>
                        <p className="font-bold text-gray-900">Cartão de Crédito</p>
                        <p className="text-xs text-gray-500">Até 12x</p>
                      </div>
                    </button>
                  </div>
                </section>

                {paymentMethod === 'pix' && (
                  <section className="bg-[#f8fafc] p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Pagamento via PIX</h4>
                    <p className="text-sm text-gray-600">
                      Clique em <strong>Finalizar Pagamento</strong> para gerar o QR Code e o
                      código PIX copia e cola.
                    </p>

                    {pixError && (
                      <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                        {pixError}
                      </div>
                    )}

                    {pixCode && (
                      <div className="mt-4 space-y-4">
                        <div className="rounded-md border border-green-200 bg-green-50 p-3 flex items-center gap-2 text-green-700 text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          PIX gerado com sucesso
                        </div>

                        {pixQrImage && (
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-xs font-semibold text-gray-600 mb-3">
                              Escaneie o QR Code
                            </p>

                            <div className="flex justify-center">
                              <img
                                src={pixQrImage}
                                alt="QR Code PIX"
                                className="w-64 h-64 rounded-md border border-gray-100"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Código PIX copia e cola
                          </label>
                          <textarea
                            readOnly
                            value={pixCode}
                            rows={5}
                            className="w-full rounded-md border border-gray-300 p-3 text-xs text-gray-700 bg-white"
                          />
                        </div>

                        <Button
                          type="button"
                          onClick={handleCopyPix}
                          className="w-full h-12"
                          variant="outline"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copied ? 'Código copiado!' : 'Copiar código PIX'}
                        </Button>
                      </div>
                    )}
                  </section>
                )}

                <Button
                  onClick={handleFinish}
                  className="w-full h-16 ml-button"
                  disabled={loading || (paymentMethod === 'pix' && totalNumber <= 0)}
                >
                  {loading
                    ? 'Gerando PIX...'
                    : paymentMethod === 'pix'
                    ? pixCode
                      ? 'PIX Gerado'
                      : 'Finalizar Pagamento'
                    : 'Finalizar Pagamento'}
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
