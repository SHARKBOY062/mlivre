import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";

const messages = [
  "Processando suas respostas...",
  "Analisando informações...",
  "Verificando compatibilidade de perfil..."
];

export default function AnaliseDados() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    const timeout = setTimeout(() => {
      navigate(`/educativo-cnh/${id}`);
    }, 12000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <MLHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 border-4 border-[#2d3277]/20 border-t-[#2d3277] rounded-full animate-spin" />
          </div>
          <div className="h-20 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl font-bold text-[#2d3277] absolute w-full"
              >
                {messages[index]}
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="text-gray-500 text-sm mt-4 uppercase tracking-widest font-bold">
            Sistema de Auditoria Interna
          </p>
        </div>
      </main>
      <MLFooter />
    </div>
  );
}
