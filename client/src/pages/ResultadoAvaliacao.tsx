import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { RadioGroupField } from '@/components/ui/radio-group-field';
import { useLocation, useParams } from 'wouter';
import { useState, useEffect, useCallback } from 'react';
import { FormInput } from '@/components/ui/form-field';
import { apiRequest } from '@/lib/queryClient';
import { QrCode, Copy, CheckCircle2, X } from 'lucide-react';

function generatePixCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 32; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `00020126580014BR.GOV.BCB.PIX0136${code}520400005303986`;
}

function generateQRDataUrl(data: string) {
  const size = 200;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#000000";
  const cellSize = 8;
  const margin = 20;
  const gridSize = Math.floor((size - margin * 2) / cellSize);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const charCode = data.charCodeAt((i * gridSize + j) % data.length);
      if ((charCode + i * j) % 3 !== 0) {
        ctx.fillRect(margin + j * cellSize, margin + i * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }
  const finderSize = 7 * cellSize;
  const drawFinder = (x: number, y: number) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, finderSize, finderSize);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + cellSize, y + cellSize, finderSize - 2 * cellSize, finderSize - 2 * cellSize);
    ctx.fillStyle = "#000000";
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, finderSize - 4 * cellSize, finderSize - 4 * cellSize);
  };
  drawFinder(margin, margin);
  drawFinder(margin + (gridSize - 7) * cellSize, margin);
  drawFinder(margin, margin + (gridSize - 7) * cellSize);
  return canvas.toDataURL();
}

export default function ResultadoAvaliacao() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPix, setShowPix] = useState(false);
  const [pixPhase, setPixPhase] = useState<"generating" | "ready">("generating");
  const [genProgress, setGenProgress] = useState(0);
  const [pixCode] = useState(() => generatePixCode());
  const [qrImage, setQrImage] = useState("");
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const initialSeguro = queryParams.get("seguro") || "sim";
  const [seguro, setSeguro] = useState(initialSeguro);

  const valorBase = 180.00;
  const valorSeguro = 48.45;
  const total = seguro === "sim" ? valorBase + valorSeguro : valorBase;

  useEffect(() => {
    if (showPix && pixPhase === "generating") {
      const duration = 8000;
      const interval = 80;
      const steps = duration / interval;
      const increment = 100 / steps;

      const progressInterval = setInterval(() => {
        setGenProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + increment;
        });
      }, interval);

      const timeout = setTimeout(() => {
        setQrImage(generateQRDataUrl(pixCode));
        setPixPhase("ready");
      }, duration);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }
  }, [showPix, pixPhase, pixCode]);

  const handleConfirmPix = useCallback(async () => {
    if (!whatsapp) return;
    setIsSubmitting(true);
    try {
      await apiRequest("PATCH", `/api/candidates/${id}`, { finalWhatsapp: whatsapp });
    } catch (error) {
      console.error(error);
    }
    setPaymentConfirmed(true);
    setTimeout(() => {
      navigate('/obrigado');
    }, 2000);
  }, [id, whatsapp, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp) return;
    setShowPix(true);
  };

  const handleCopyPix = useCallback(() => {
    navigator.clipboard.writeText(pixCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [pixCode]);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="p-8 md:p-12 text-center">
              <span className="institutional-label text-blue-600">Conclusão da Avaliação</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                Resultado da Avaliação
              </h1>
              
              <div className="section-divider" />

              <div className="space-y-6 mb-10">
                <p className="text-xl font-bold text-green-600">
                  "Parabéns! Você foi considerado APTO para exercer a função e pode ser contratado no mesmo dia, conforme análise do setor responsável."
                </p>
                <p className="normative-text text-lg">
                  "Para dar continuidade ao processo e liberar sua contratação imediata, é necessário realizar o pagamento da taxa administrativa."
                </p>
              </div>

              <div className="text-left mb-6">
                <RadioGroupField
                  label="Seguro pedagógico:"
                  required
                  options={[
                    { value: 'sim', label: 'Desejo aderir ao seguro pedagógico (+ R$ 48,45)' },
                    { value: 'nao', label: 'Não desejo aderir' }
                  ]}
                  value={seguro}
                  onChange={(val) => setSeguro(val || 'nao')}
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-md border border-gray-200 text-left mb-10" data-testid="resumo-resultado">
                <h3 className="institutional-label mb-4">Resumo do Pagamento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Valor do produto:</span>
                    <span>R$ {valorBase.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {seguro === "sim" && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Seguro pedagógico:</span>
                      <span>R$ {valorSeguro.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="section-divider !my-2" />
                  <div className="flex justify-between text-xl font-extrabold text-gray-900">
                    <span>Total:</span>
                    <span data-testid="text-valor-final">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>

              <p className="normative-text mb-10 font-bold text-[#2d3277]">
                "Após a confirmação do pagamento, sua contratação será encaminhada para a agência responsável."
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <FormInput
                  label="Informe seu número de WhatsApp para contato:"
                  required
                  placeholder="(11) 91234-5678"
                  value={whatsapp}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "");
                    if (v.length > 11) v = v.slice(0, 11);
                    if (v.length > 10) {
                      v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
                    } else if (v.length > 6) {
                      v = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
                    } else if (v.length > 2) {
                      v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                    } else if (v.length > 0) {
                      v = `(${v}`;
                    }
                    setWhatsapp(v);
                  }}
                  type="tel"
                />

                <Button
                  type="submit"
                  disabled={!whatsapp}
                  className="w-full py-4 ml-button text-base font-semibold whitespace-normal text-center"
                  style={{ height: 'auto', minHeight: '56px' }}
                  data-testid="button-confirmar-pagamento"
                >
                  Confirmar e Gerar PIX
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {showPix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={(e) => { if (e.target === e.currentTarget && pixPhase === "ready" && !paymentConfirmed) { setShowPix(false); setPixPhase("generating"); setGenProgress(0); } }}
            data-testid="modal-pix-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-[#2d3277] p-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <QrCode className="w-6 h-6 text-white" />
                  <h2 className="text-lg font-extrabold text-white">Pagamento via PIX</h2>
                </div>
                {pixPhase === "ready" && !paymentConfirmed && (
                  <button onClick={() => { setShowPix(false); setPixPhase("generating"); setGenProgress(0); }} className="text-white/70 hover:text-white transition-colors" data-testid="button-close-pix">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="p-6">
                {pixPhase === "generating" ? (
                  <div className="text-center py-8">
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 border-4 border-[#2d3277]/10 border-t-[#2d3277] rounded-full animate-spin" />
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2" data-testid="text-generating-pix">
                      Gerando cobrança PIX...
                    </h3>
                    <p className="text-gray-500 text-sm mb-8">
                      Aguarde enquanto preparamos seu pagamento.
                    </p>
                    <div className="space-y-2 max-w-xs mx-auto">
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#2d3277] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${genProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {Math.round(genProgress)}%
                      </p>
                    </div>
                  </div>
                ) : paymentConfirmed ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-extrabold text-green-700 mb-2">Pagamento Confirmado!</h3>
                    <p className="text-gray-500 text-sm">Redirecionando...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-500 text-sm mb-4">Escaneie o QR Code abaixo para concluir</p>
                    {qrImage && (
                      <div className="flex justify-center mb-4">
                        <div className="bg-white p-3 border-2 border-gray-200 rounded-md inline-block">
                          <img src={qrImage} alt="QR Code PIX" className="w-48 h-48" data-testid="img-qr-code" />
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
                      <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Código PIX Copia e Cola</p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={pixCode}
                          className="flex-1 text-xs bg-white border border-gray-200 rounded px-3 py-2 text-gray-700 font-mono truncate"
                          data-testid="input-pix-code"
                        />
                        <button
                          onClick={handleCopyPix}
                          className="flex items-center gap-1 bg-[#2d3277] text-white px-3 py-2 rounded text-xs font-bold hover:bg-[#232866] transition-colors"
                          data-testid="button-copy-pix"
                        >
                          {copied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copied ? "Copiado" : "Copiar"}
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#fff8e1] border border-amber-200 rounded-md p-3 mb-4">
                      <p className="text-amber-800 font-extrabold text-lg" data-testid="text-pix-total">
                        Total: R$ {total.toFixed(2).replace('.', ',')}
                      </p>
                    </div>

                    <p className="text-gray-400 text-xs mb-4">Aguardando confirmação de pagamento...</p>

                    <Button
                      onClick={handleConfirmPix}
                      disabled={isSubmitting}
                      className="w-full py-3 ml-button text-base font-semibold"
                      style={{ height: 'auto', minHeight: '48px' }}
                      data-testid="button-confirmar-pix"
                    >
                      {isSubmitting ? "PROCESSANDO..." : "JÁ REALIZEI O PAGAMENTO"}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MLFooter />
    </div>
  );
}
