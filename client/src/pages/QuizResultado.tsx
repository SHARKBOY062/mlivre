import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { Award, Zap, TrendingUp, Target } from "lucide-react";

export default function QuizResultado() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const score = parseInt(queryParams.get('score') || "0");

  let profile = {
    title: "",
    icon: Award,
    color: "",
    desc: ""
  };

  if (score >= 20 && score <= 40) {
    profile = {
      title: "Perfil Iniciante",
      icon: Target,
      color: "text-blue-500",
      desc: "Você demonstra interesse e potencial para iniciar sua jornada logística. Seu comprometimento inicial é o primeiro passo para uma carreira sólida."
    };
  } else if (score >= 41 && score <= 55) {
    profile = {
      title: "Perfil em Desenvolvimento",
      icon: TrendingUp,
      color: "text-green-500",
      desc: "Você possui bases sólidas e demonstra uma curva de aprendizado acelerada. Seu perfil é ideal para ambientes operacionais dinâmicos."
    };
  } else if (score >= 56 && score <= 70) {
    profile = {
      title: "Perfil Avançado",
      icon: Zap,
      color: "text-amber-500",
      desc: "Seu comprometimento e visão estratégica são diferenciais. Você está acima da média em termos de organização e foco em resultados."
    };
  } else {
    profile = {
      title: "Perfil Alta Performance",
      icon: Award,
      color: "text-[#2d3277]",
      desc: "Excelência e maestria. Seu perfil demonstra total alinhamento com os valores de eficiência e liderança operacional do Mercado Livre."
    };
  }

  const handleContinue = () => {
    navigate(`/vagas-aprovadas/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <span className="institutional-label">Avaliação de Perfil Concluída</span>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Resultado da Avaliação</h1>
              
              <div className="section-divider" />

              <div className="py-8 flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6 border-2 border-dashed border-gray-200`}>
                  <profile.icon className={`w-12 h-12 ${profile.color}`} />
                </div>
                
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Seu perfil identificado:</p>
                <h2 className={`text-3xl font-black mb-4 ${profile.color}`}>{profile.title}</h2>
                <div className="bg-gray-50 px-4 py-2 rounded-full mb-8">
                  <span className="text-gray-600 font-bold">Pontuação Final: {score} pontos</span>
                </div>

                <p className="normative-text text-center text-lg max-w-md mx-auto mb-12">
                  {profile.desc}
                </p>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full h-16 ml-button"
              >
                Continuar Processo
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
