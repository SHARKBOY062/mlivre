import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MLHeader } from "@/components/ui/ml-header";
import { MLFooter } from "@/components/ui/ml-footer";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const questions = [
  { q: "Como você lida com prazos apertados?", a: "Trabalho melhor sob pressão", b: "Mantenho a calma e priorizo", c: "Sinto um pouco de estresse", d: "Tenho dificuldade em organizar" },
  { q: "Qual sua principal motivação profissional?", a: "Crescimento financeiro", b: "Reconhecimento e status", c: "Aprender novas habilidades", d: "Segurança e estabilidade" },
  { q: "Como você prefere trabalhar?", a: "Totalmente independente", b: "Em equipe com liderança clara", c: "Colaborando igualmente", d: "Seguindo instruções detalhadas" },
  { q: "O que você busca em um novo emprego?", a: "Desafios constantes", b: "Ambiente amigável", c: "Equilíbrio vida-trabalho", d: "Benefícios sólidos" },
  { q: "Como você reage a críticas construtivas?", a: "Aceito e mudo imediatamente", b: "Analiso e aplico o que faz sentido", c: "Ouço, mas às vezes me sinto mal", d: "Prefiro não receber críticas" },
  { q: "Qual seu nível de familiaridade com tecnologia?", a: "Muito avançado", b: "Bom domínio técnico", c: "Conhecimento básico", d: "Aprendendo agora" },
  { q: "Como você se vê em 5 anos?", a: "Em cargo de alta liderança", b: "Especialista na minha área", c: "Com estabilidade garantida", d: "Em uma nova carreira" },
  { q: "Qual sua atitude diante de imprevistos?", a: "Busco solução rápida e sozinho", b: "Comunico a equipe e busco apoio", c: "Fico ansioso, mas tento resolver", d: "Aguardo instruções superiores" },
  { q: "Como você mantém seu foco no trabalho?", a: "Bloqueio todas as distrações", b: "Uso listas de tarefas", c: "Trabalho em blocos de tempo", d: "Dependo do ritmo da equipe" },
  { q: "O que é mais importante para você em um líder?", a: "Competência técnica", b: "Empatia e escuta", c: "Visão estratégica", d: "Clareza nas ordens" },
  { q: "Como você lida com mudanças de processos?", a: "Adapto-me instantaneamente", b: "Vejo como oportunidade de melhoria", c: "Demoro um pouco a me acostumar", d: "Prefiro manter a rotina atual" },
  { q: "Qual seu compromisso com a pontualidade?", a: "Chego sempre 15 min antes", b: "Sou rigorosamente pontual", c: "Eventualmente me atraso", d: "Tenho dificuldade com horários" },
  { q: "Como você avalia sua comunicação?", a: "Clara, direta e persuasiva", b: "Boa capacidade de ouvir e falar", c: "Prefiro comunicação escrita", d: "Sou mais reservado e silencioso" },
  { q: "O que você faz quando termina suas tarefas?", a: "Busco novas responsabilidades", b: "Ajudo meus colegas", c: "Organizo meu espaço de trabalho", d: "Aguardo o fim do expediente" },
  { q: "Qual sua tolerância a erros próprios?", a: "Sou meu maior crítico", b: "Aprendo e não repito", c: "Fico frustrado por muito tempo", d: "Acho que errar é natural e aceitável" },
  { q: "Como você lida com conflitos na equipe?", a: "Medio e busco harmonia", b: "Foco apenas no trabalho", c: "Evito o confronto a todo custo", d: "Expresso minha opinião firmemente" },
  { q: "Qual seu nível de energia durante o dia?", a: "Alta performance constante", b: "Foco oscilante, mas produtivo", c: "Melhor pela manhã", d: "Melhor no final do dia" },
  { q: "O que você faz para se atualizar na sua área?", a: "Cursos e certificações frequentes", b: "Leio notícias e artigos", c: "Aprendo na prática", d: "Confio na minha experiência" },
  { q: "Como você lida com ferramentas de gestão?", a: "Uso todas disponíveis com maestria", b: "Conheço o essencial para o cargo", c: "Aprendo conforme a necessidade", d: "Tenho resistência a novos sistemas" },
  { q: "Qual sua principal qualidade profissional?", a: "Resiliência extrema", b: "Proatividade genuína", c: "Capacidade analítica", d: "Lealdade à empresa" }
];

export default function Quiz() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
      navigate(`/quiz-processamento/${id}?score=${totalScore}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <MLHeader />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Pergunta {currentStep + 1} de {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-8 leading-tight">
                  {questions[currentStep].q}
                </h2>

                <RadioGroup 
                  value={answers[currentStep]?.toString()} 
                  onValueChange={(val) => setAnswers({...answers, [currentStep]: parseInt(val)})}
                  className="space-y-4"
                >
                  {['a', 'b', 'c', 'd'].map((opt, idx) => (
                    <Label
                      key={opt}
                      className={`flex items-center gap-4 p-5 rounded-lg border-2 cursor-pointer transition-all ${
                        answers[currentStep] === idx + 1 
                        ? "border-[#2d3277] bg-blue-50/50" 
                        : "border-gray-100 hover:border-gray-200 bg-gray-50/30"
                      }`}
                    >
                      <RadioGroupItem value={(idx + 1).toString()} className="sr-only" />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[currentStep] === idx + 1 ? "border-[#2d3277] bg-[#2d3277]" : "border-gray-300"
                      }`}>
                        {answers[currentStep] === idx + 1 && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-gray-700 font-medium">{(questions[currentStep] as any)[opt]}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-12">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex-1 h-14 uppercase tracking-wider font-bold text-xs"
              >
                Voltar
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentStep]}
                className="flex-[2] h-14 ml-button"
              >
                {currentStep === questions.length - 1 ? "Finalizar Avaliação" : "Próximo"}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
