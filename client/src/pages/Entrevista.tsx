import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const questions = [
  "Qual é o seu nome completo?",
  "Qual é sua experiência profissional anterior, especialmente em funções operacionais?",
  "Qual é sua motivação para atuar na área logística?",
  "Você já trabalhou em equipes de operação? Se sim, descreva suas funções.",
  "Como você se organiza para cumprir metas e horários?",
  "Qual é sua maior qualidade que agregaria à equipe?",
  "Cite um desafio profissional que você superou e como fez isso.",
  "Como você lida com situações de pressão?",
  "Você possui disponibilidade para trabalhar em turnos?",
  "Como você garante sua pontualidade no trabalho?",
  "Qual sua experiência com tarefas que exigem responsabilidade?",
  "Você já utilizou sistemas digitais para registro de tarefas ou operações?",
  "Como você se comunica com sua equipe em momentos críticos?",
  "Você possui alguma limitação física relevante?",
  "Qual é seu principal objetivo profissional nos próximos 12 meses?",
  "Como você aprende novas atividades operacionais?",
  "Você possui referências profissionais que podemos consultar?",
  "Você tem alguma observação adicional que gostaria de compartilhar?"
];

export default function Entrevista() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [responses, setResponses] = useState<string[]>(new Array(questions.length).fill(""));

  const handleInputChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const isComplete = responses.every(r => r.trim().length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      navigate(`/analisando-dados/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-12">
              <span className="institutional-label">Entrevista de Avaliação – Candidato Sem CNH</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                Perfil Profissional e Operacional
              </h1>
              <div className="section-divider" />
              <p className="normative-text mb-10">
                Você será conduzido(a) por uma série de perguntas profissionais para que possamos conhecer melhor seu perfil, experiência e motivação. Por favor, responda com clareza e objetividade.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {questions.map((q, i) => (
                  <div key={i} className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">{i + 1}. {q}</Label>
                    <Textarea
                      required
                      value={responses[i]}
                      onChange={(e) => handleInputChange(i, e.target.value)}
                      placeholder="Sua resposta..."
                      className="min-h-[100px] border-gray-300 focus:border-[#2d3277] focus:ring-[#2d3277]/10"
                    />
                  </div>
                ))}

                <Button
                  type="submit"
                  disabled={!isComplete}
                  className="w-full h-16 ml-button mt-10"
                >
                  Enviar Entrevista
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
