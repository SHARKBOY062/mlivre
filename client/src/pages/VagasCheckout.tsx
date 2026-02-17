import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { useLocation, useParams } from "wouter";
import { QrCode, Briefcase, DollarSign, AlertTriangle, Copy, X, CheckCircle2, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function generatePixCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "00020126580014br.gov.bcb.pix0136";
  for (let i = 0; i < 36; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  code += "5204000053039865404441.005802BR";
  for (let i = 0; i < 20; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function generateQRDataUrl(text: string): string {
  const size = 200;
  const moduleCount = 21;
  const moduleSize = Math.floor(size / moduleCount);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#000000";

  const seed = text.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  let rng = seed;
  const next = () => { rng = (rng * 16807 + 0) % 2147483647; return rng / 2147483647; };

  const drawFinderPattern = (x: number, y: number) => {
    for (let dy = 0; dy < 7; dy++) {
      for (let dx = 0; dx < 7; dx++) {
        const isBlack =
          dy === 0 || dy === 6 || dx === 0 || dx === 6 ||
          (dy >= 2 && dy <= 4 && dx >= 2 && dx <= 4);
        if (isBlack) {
          ctx.fillRect((x + dx) * moduleSize, (y + dy) * moduleSize, moduleSize, moduleSize);
        }
      }
    }
  };

  drawFinderPattern(0, 0);
  drawFinderPattern(moduleCount - 7, 0);
  drawFinderPattern(0, moduleCount - 7);

  for (let y = 0; y < moduleCount; y++) {
    for (let x = 0; x < moduleCount; x++) {
      const inFinder =
        (x < 8 && y < 8) ||
        (x >= moduleCount - 8 && y < 8) ||
        (x < 8 && y >= moduleCount - 8);
      if (!inFinder && next() > 0.5) {
        ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
      }
    }
  }

  return canvas.toDataURL();
}

export default function VagasCheckout() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const { toast } = useToast();
  const queryParams = new URLSearchParams(window.location.search);
  const vagaName = queryParams.get("vaga") || "Vaga Selecionada";
  const salario = queryParams.get("salario") || "";

  const [accepted, setAccepted] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixCode] = useState(() => generatePixCode());
  const [qrImage, setQrImage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"waiting" | "confirmed">("waiting");
  const [hasClicked, setHasClicked] = useState(false);
  const [modalPhase, setModalPhase] = useState<"generating" | "ready">("generating");
  const [genProgress, setGenProgress] = useState(0);

  const taxaCadastro = 97.0;
  const taxaDocumentacao = 147.0;
  const kitAdmissao = 197.0;
  const total = taxaCadastro + taxaDocumentacao + kitAdmissao;

  useEffect(() => {
    if (showPixModal && modalPhase === "generating") {
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
        setModalPhase("ready");
      }, duration);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }
  }, [showPixModal, modalPhase, pixCode]);

  const handleFinish = useCallback(() => {
    if (hasClicked) return;
    if (!accepted) {
      toast({ title: "Atenção", description: "Você deve aceitar os termos para continuar.", variant: "destructive" });
      return;
    }
    setHasClicked(true);
    setShowPixModal(true);
  }, [accepted, hasClicked, toast]);

  const handleCopyPix = useCallback(() => {
    navigator.clipboard.writeText(pixCode).then(() => {
      toast({ title: "Copiado!", description: "Código PIX copiado para a área de transferência." });
    }).catch(() => {
      const textarea = document.createElement("textarea");
      textarea.value = pixCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast({ title: "Copiado!", description: "Código PIX copiado para a área de transferência." });
    });
  }, [pixCode, toast]);

  const handleConfirmPayment = useCallback(() => {
    setPaymentStatus("confirmed");
    setTimeout(() => {
      setShowPixModal(false);
      navigate(`/resultado-avaliacao/${id}`);
    }, 2000);
  }, [id, navigate]);

  const handleCloseModal = useCallback(() => {
    if (paymentStatus === "confirmed" || modalPhase === "generating") return;
    setShowPixModal(false);
    setHasClicked(false);
    setModalPhase("generating");
    setGenProgress(0);
  }, [paymentStatus, modalPhase]);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-12 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <span className="institutional-label">Finalização do Processo de Contratação</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6" data-testid="text-checkout-title">
                Checkout
              </h1>
              <div className="section-divider" />

              <div className="space-y-8">
                <section className="bg-blue-50/50 p-6 rounded-md border border-blue-100">
                  <h3 className="institutional-label mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Resumo da Vaga
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Vaga:</span>
                      <span className="text-gray-900 font-bold">{vagaName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Empresa parceira:</span>
                      <span className="text-gray-900 font-bold">Mercado Livre Logística</span>
                    </div>
                    {salario && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Salário estimado:</span>
                        <span className="text-green-600 font-bold">{salario}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Localidade:</span>
                      <span className="text-gray-900 font-bold">Região Metropolitana</span>
                    </div>
                  </div>
                </section>

                <section className="bg-gray-50 p-6 rounded-md border border-gray-200">
                  <h3 className="institutional-label mb-4 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Taxa Administrativa
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxa de Cadastro</span>
                      <span>R$ {taxaCadastro.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxa de Documentação</span>
                      <span>R$ {taxaDocumentacao.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Kit de Admissão</span>
                      <span>R$ {kitAdmissao.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="section-divider !my-2" />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                    </div>
                  </div>
                </section>

                <div className="bg-amber-50 border border-amber-200 p-5 rounded-md">
                  <div className="flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-900 text-sm font-bold leading-relaxed">
                      Todos os valores serão reembolsados no primeiro salário, junto com os adicionais de contratação. Dependendo do cargo, a remuneração pode chegar até R$ 5.543,76 + adicionais.
                    </p>
                  </div>
                </div>

                <section>
                  <h3 className="institutional-label mb-4">Forma de Pagamento</h3>
                  <div className="flex items-center gap-4 p-5 border-2 border-[#2d3277] rounded-lg bg-blue-50/40">
                    <QrCode className="w-8 h-8 text-[#2d3277]" />
                    <div>
                      <p className="font-bold text-gray-900">Pix</p>
                      <p className="text-xs text-gray-500">Aprovação imediata</p>
                    </div>
                    <span className="ml-auto text-xs font-bold text-[#2d3277] bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Selecionado
                    </span>
                  </div>
                </section>

                <div className="bg-gray-50/50 p-6 rounded-md border border-gray-200">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="accept-terms-checkout"
                      checked={accepted}
                      onCheckedChange={(val) => setAccepted(val === true)}
                      className="mt-1 border-gray-300 data-[state=checked]:bg-[#2d3277] data-[state=checked]:border-[#2d3277]"
                      data-testid="checkbox-aceite-checkout"
                    />
                    <Label
                      htmlFor="accept-terms-checkout"
                      className="normative-text leading-relaxed cursor-pointer font-bold text-gray-700"
                    >
                      Declaro que li e concordo com os termos administrativos e aceito os valores apresentados para prosseguir com a contratação.
                    </Label>
                  </div>
                </div>

                <Button
                  onClick={handleFinish}
                  disabled={hasClicked}
                  className="w-full h-16 ml-button"
                  data-testid="button-finalizar-contratacao"
                >
                  FINALIZAR CONTRATAÇÃO
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />

      <AnimatePresence>
        {showPixModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={(e) => { if (e.target === e.currentTarget && modalPhase !== "generating") handleCloseModal(); }}
            data-testid="modal-pix-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
              data-testid="modal-pix-content"
            >
              <div className="bg-gradient-to-r from-[#2d3277] to-[#3b3f8f] p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <QrCode className="w-6 h-6 text-white" />
                  <h2 className="text-lg font-extrabold text-white">Pagamento via PIX</h2>
                </div>
                {paymentStatus !== "confirmed" && modalPhase === "ready" && (
                  <button onClick={handleCloseModal} className="text-white/70 hover:text-white transition-colors" data-testid="button-close-modal">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="p-6">
                {modalPhase === "generating" ? (
                  <div className="text-center py-8">
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 border-4 border-[#2d3277]/10 border-t-[#2d3277] rounded-full animate-spin" />
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2" data-testid="text-generating-title">
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
                ) : paymentStatus === "confirmed" ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-extrabold text-green-600 mb-2">Pagamento Confirmado</h3>
                    <p className="text-gray-500 text-sm">Redirecionando...</p>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 text-sm text-center mb-6">
                      Escaneie o QR Code ou utilize o código abaixo para realizar o pagamento.
                    </p>

                    <div className="flex justify-center mb-6">
                      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                        {qrImage ? (
                          <img src={qrImage} alt="QR Code PIX" className="w-[200px] h-[200px]" data-testid="img-qrcode" />
                        ) : (
                          <div className="w-[200px] h-[200px] flex items-center justify-center">
                            <div className="w-8 h-8 border-3 border-gray-200 border-t-[#2d3277] rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-md border border-gray-200 p-4 mb-4">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Código PIX Copia e Cola</p>
                      <p className="text-xs text-gray-600 font-mono break-all leading-relaxed" data-testid="text-pix-code">
                        {pixCode}
                      </p>
                    </div>

                    <div className="flex items-center justify-between bg-blue-50 rounded-md p-4 mb-6 border border-blue-100">
                      <div>
                        <p className="text-xs text-gray-500">Valor:</p>
                        <p className="text-xl font-extrabold text-gray-900">R$ {total.toFixed(2).replace(".", ",")}</p>
                      </div>
                      <div className="flex items-center gap-2 text-amber-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold">Aguardando pagamento...</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleCopyPix}
                        variant="outline"
                        className="w-full h-12 border-[#2d3277] text-[#2d3277] font-bold"
                        data-testid="button-copiar-pix"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        COPIAR CÓDIGO PIX
                      </Button>
                      <Button
                        onClick={handleConfirmPayment}
                        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold"
                        data-testid="button-confirmar-pagamento"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        JÁ REALIZEI O PAGAMENTO
                      </Button>
                      <button
                        onClick={handleCloseModal}
                        className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium py-2"
                        data-testid="button-fechar-modal"
                      >
                        Fechar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
