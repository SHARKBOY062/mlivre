import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AvaliacaoProcessando() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const vagaId = queryParams.get("vaga") || "";
  const passed = queryParams.get("passed") === "1";

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "result">("loading");

  useEffect(() => {
    const duration = 6000;
    const interval = 80;
    const steps = duration / interval;
    const increment = 100 / steps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const timeout = setTimeout(() => {
      setPhase("result");
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, []);

  const handleProceed = () => {
    if (passed) {
      navigate(`/vagas-aprovadas/${id}?unlocked=${vagaId}`);
    } else {
      navigate(`/vagas-aprovadas/${id}`);
    }
  };

  if (phase === "result") {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
        <MLHeader />
        <main className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10 text-center">
              {passed ? (
                <>
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Avaliação Concluída</h1>
                  <p className="text-green-600 font-bold text-lg mb-2">Vaga Desbloqueada!</p>
                  <p className="text-gray-600 text-sm mb-8">
                    Você atingiu a pontuação mínima necessária. A vaga premium agora está disponível para seleção.
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <XCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Pontuação Insuficiente</h1>
                  <p className="text-red-500 font-bold text-lg mb-2">Aproveitamento abaixo de 60%</p>
                  <p className="text-gray-600 text-sm mb-8">
                    Infelizmente você não atingiu a pontuação mínima para desbloquear esta vaga. Você pode selecionar outras vagas disponíveis.
                  </p>
                </>
              )}
              <Button onClick={handleProceed} className="w-full h-14 ml-button" data-testid="button-prosseguir">
                Prosseguir
              </Button>
            </div>
          </motion.div>
        </main>
        <MLFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <MLHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 border-4 border-[#2d3277]/10 border-t-[#2d3277] rounded-full animate-spin" />
            </div>
            <h1 className="text-xl font-extrabold text-gray-900 mb-3">Analisando desempenho...</h1>
            <p className="text-gray-600 text-sm mb-8">
              Estamos processando suas respostas e validando seu perfil gerencial.
            </p>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Processamento: {Math.round(progress)}%
              </p>
            </div>
          </div>
        </div>
      </main>
      <MLFooter />
    </div>
  );
}
