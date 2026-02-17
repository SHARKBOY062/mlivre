import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { Progress } from "@/components/ui/progress";

export default function QuizProcessamento() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const score = queryParams.get('score');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = Math.floor(Math.random() * (15000 - 13000 + 1) + 13000);
    const interval = 100;
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
      navigate(`/quiz-resultado/${id}?score=${score}`);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [id, navigate, score]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <MLHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-10">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 border-4 border-[#2d3277]/10 border-t-[#2d3277] rounded-full animate-spin" />
            </div>
            
            <h1 className="text-2xl font-extrabold text-gray-900 mb-4">
              Analisando suas respostas...
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Estamos validando suas informações e processando seu perfil profissional.
            </p>

            <div className="space-y-3">
              <Progress value={progress} className="h-3" />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Validação em tempo real: {Math.round(progress)}%
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-[10px] mt-6 uppercase tracking-widest font-bold">
            Protocolo de Segurança Nível 4 – Auditoria Mercado Livre
          </p>
        </div>
      </main>
      <MLFooter />
    </div>
  );
}
