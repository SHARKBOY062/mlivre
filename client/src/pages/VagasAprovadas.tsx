import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { CheckCircle2, Lock, MapPin, Clock, DollarSign, Briefcase } from "lucide-react";

const openJobs = [
  {
    id: "auxiliar-administrativo",
    title: "Auxiliar Administrativo",
    salary: "R$ 1.850,00 ~ R$ 2.340,00",
    benefits: "VT + VR + Plano de Saúde",
    schedule: "Segunda a Sexta — 08h às 17h",
    location: "Região Metropolitana",
  },
  {
    id: "operador-maquinas",
    title: "Operador de Máquinas",
    salary: "R$ 2.100,00 ~ R$ 2.890,00",
    benefits: "VT + VR + Seguro de Vida",
    schedule: "Segunda a Sábado — 07h às 15h20",
    location: "Centro de Distribuição Regional",
  },
  {
    id: "entregador-regiao",
    title: "Entregador da Região",
    salary: "R$ 2.400,00 ~ R$ 3.200,00",
    benefits: "VT + VR + Adicional por Entrega",
    schedule: "Segunda a Sábado — Escala Flexível",
    location: "Área de Cobertura Local",
  },
];

const premiumJobs = [
  {
    id: "gerente-estoque",
    title: "Gerente de Estoque (Home Office)",
    salary: "R$ 4.200,00 ~ R$ 5.543,76",
    benefits: "VR + Plano Saúde/Odonto + PLR",
    schedule: "Segunda a Sexta — Remoto",
    location: "Home Office — Nacional",
  },
  {
    id: "lider-logistica",
    title: "Líder de Logística",
    salary: "R$ 3.800,00 ~ R$ 4.950,00",
    benefits: "VT + VR + Plano de Saúde + Bônus",
    schedule: "Segunda a Sexta — 08h às 18h",
    location: "Hub Logístico Regional",
  },
];

export default function VagasAprovadas() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const unlockedFromParam = queryParams.get("unlocked");
  const [unlockedJobs, setUnlockedJobs] = useState<string[]>(unlockedFromParam ? [unlockedFromParam] : []);

  const handleSelectOpen = (jobId: string) => {
    const job = openJobs.find(j => j.id === jobId);
    if (job) {
      navigate(`/vagas-checkout/${id}?vaga=${encodeURIComponent(job.title)}&salario=${encodeURIComponent(job.salary)}`);
    }
  };

  const handleSelectUnlocked = (jobId: string) => {
    const job = premiumJobs.find(j => j.id === jobId);
    if (job) {
      navigate(`/vagas-checkout/${id}?vaga=${encodeURIComponent(job.title)}&salario=${encodeURIComponent(job.salary)}`);
    }
  };

  const handleUnlock = (jobId: string) => {
    navigate(`/avaliacao-gerencial/${id}?vaga=${jobId}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />
      <main className="max-w-4xl mx-auto px-4 py-12 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3" data-testid="text-vagas-title">
              Parabéns! Você foi aprovado para vagas na sua região
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto" data-testid="text-vagas-subtitle">
              Com base na sua análise, você foi selecionado para as seguintes oportunidades.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Vagas Disponíveis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {openJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  data-testid={`card-job-open-${job.id}`}
                >
                  <div className="bg-gradient-to-r from-[#2d3277] to-[#3b3f8f] p-4">
                    <h3 className="text-white font-bold text-base">{job.title}</h3>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{job.benefits}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{job.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <Button
                      onClick={() => handleSelectOpen(job.id)}
                      className="w-full ml-button"
                      data-testid={`button-select-${job.id}`}
                    >
                      Selecionar Vaga
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Vagas Premium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {premiumJobs.map((job, i) => {
                const isUnlocked = unlockedJobs.includes(job.id);
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`rounded-lg border shadow-sm overflow-hidden transition-all ${
                      isUnlocked
                        ? "bg-white border-green-200 hover:shadow-md"
                        : "bg-gray-50 border-gray-200 opacity-75"
                    }`}
                    data-testid={`card-job-premium-${job.id}`}
                  >
                    <div className={`p-4 ${isUnlocked ? "bg-gradient-to-r from-green-600 to-green-700" : "bg-gray-400"}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-base">{job.title}</h3>
                        {!isUnlocked && <Lock className="w-5 h-5 text-white/70" />}
                        {isUnlocked && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>{job.benefits}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{job.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="px-5 pb-5">
                      {isUnlocked ? (
                        <Button
                          onClick={() => handleSelectUnlocked(job.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                          data-testid={`button-select-unlocked-${job.id}`}
                        >
                          Selecionar Vaga
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleUnlock(job.id)}
                          variant="outline"
                          className="w-full border-gray-300 text-gray-600 font-bold"
                          data-testid={`button-unlock-${job.id}`}
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Desbloquear Vaga
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
