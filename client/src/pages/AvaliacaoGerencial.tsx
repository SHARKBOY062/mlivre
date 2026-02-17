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
  {
    q: "Qual a principal função de um gestor de estoque?",
    options: ["Vender produtos ao cliente final", "Controlar entradas, saídas e níveis de estoque", "Entregar mercadorias em domicílio", "Fazer a contabilidade financeira da empresa"],
    correct: 1,
  },
  {
    q: "Qual a melhor forma de lidar com um conflito entre membros da equipe?",
    options: ["Ignorar o conflito até que se resolva", "Ouvir ambas as partes e mediar uma solução", "Punir os dois colaboradores imediatamente", "Transferir um dos envolvidos para outro setor"],
    correct: 1,
  },
  {
    q: "O que é KPI em gestão de logística?",
    options: ["Um tipo de produto do estoque", "Indicador-chave de desempenho", "Um código de barras especial", "Um documento fiscal obrigatório"],
    correct: 1,
  },
  {
    q: "Qual a importância do planejamento de rotas na logística?",
    options: ["Nenhuma, as rotas são aleatórias", "Reduzir custos e otimizar o tempo de entrega", "Aumentar o consumo de combustível", "Dificultar o trabalho dos motoristas"],
    correct: 1,
  },
  {
    q: "Qual é a principal característica de um líder eficaz?",
    options: ["Tomar todas as decisões sozinho", "Inspirar e motivar a equipe", "Controlar todos os detalhes operacionais", "Evitar delegar tarefas"],
    correct: 1,
  },
  {
    q: "O que é FIFO na gestão de estoque?",
    options: ["Um tipo de empilhadeira", "Primeiro que entra, primeiro que sai", "Um sistema de resfriamento", "Uma forma de embalar produtos"],
    correct: 1,
  },
  {
    q: "Como manter a produtividade em trabalho remoto?",
    options: ["Trabalhar sem horários definidos", "Estabelecer rotina, metas e comunicação clara", "Evitar contato com a equipe", "Fazer apenas o mínimo necessário"],
    correct: 1,
  },
  {
    q: "Qual a importância de um inventário regular?",
    options: ["Não tem nenhuma importância", "Identificar divergências e manter o controle preciso", "Atrasar as operações do dia a dia", "Aumentar o custo operacional"],
    correct: 1,
  },
  {
    q: "O que é lead time na cadeia de suprimentos?",
    options: ["O nome do líder da equipe", "O tempo total entre pedido e entrega", "O preço de venda do produto", "A margem de lucro da empresa"],
    correct: 1,
  },
  {
    q: "Qual a melhor estratégia de tomada de decisão sob pressão?",
    options: ["Decidir rapidamente sem pensar", "Analisar dados disponíveis e priorizar o impacto", "Adiar toda e qualquer decisão", "Consultar apenas seus superiores"],
    correct: 1,
  },
  {
    q: "Como um gestor deve lidar com metas não atingidas?",
    options: ["Culpar exclusivamente a equipe", "Analisar as causas e criar um plano de ação", "Ignorar e definir novas metas", "Reduzir as metas ao mínimo possível"],
    correct: 1,
  },
  {
    q: "Qual a função do WMS na logística?",
    options: ["Controlar as finanças da empresa", "Gerenciar as operações do armazém", "Monitorar as redes sociais", "Criar relatórios de marketing"],
    correct: 1,
  },
  {
    q: "Como garantir a segurança no ambiente de trabalho?",
    options: ["Ignorar os procedimentos de segurança", "Promover treinamentos e uso de EPIs", "Diminuir o número de funcionários", "Aumentar a velocidade das operações"],
    correct: 1,
  },
  {
    q: "O que é cross-docking?",
    options: ["Um tipo de embalagem especial", "Transferência direta de carga sem armazenamento", "Um sistema de contabilidade", "Uma técnica de venda online"],
    correct: 1,
  },
  {
    q: "Qual a principal vantagem do trabalho home office para a empresa?",
    options: ["Não precisar de funcionários", "Redução de custos operacionais e maior flexibilidade", "Não ter controle sobre a equipe", "Aumentar as despesas com tecnologia"],
    correct: 1,
  },
];

export default function AvaliacaoGerencial() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const vagaId = queryParams.get("vaga") || "";

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      let correctCount = 0;
      for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].correct) {
          correctCount++;
        }
      }
      const passed = correctCount / questions.length >= 0.6;
      navigate(`/avaliacao-processando/${id}?vaga=${vagaId}&passed=${passed ? "1" : "0"}`);
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
            <span className="institutional-label">Avaliação Gerencial</span>
            <p className="text-gray-600 text-sm mb-6">
              Para desbloquear esta vaga, responda a avaliação abaixo.
            </p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
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
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-lg md:text-xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {questions[currentStep].q}
                </h2>

                <RadioGroup
                  value={answers[currentStep]?.toString()}
                  onValueChange={(val) => setAnswers({ ...answers, [currentStep]: parseInt(val) })}
                  className="space-y-3"
                >
                  {questions[currentStep].options.map((opt, idx) => (
                    <Label
                      key={idx}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        answers[currentStep] === idx
                          ? "border-[#2d3277] bg-blue-50/50"
                          : "border-gray-100 hover:border-gray-200 bg-gray-50/30"
                      }`}
                      data-testid={`option-${currentStep}-${idx}`}
                    >
                      <RadioGroupItem value={idx.toString()} className="sr-only" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        answers[currentStep] === idx ? "border-[#2d3277] bg-[#2d3277]" : "border-gray-300"
                      }`}>
                        {answers[currentStep] === idx && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{opt}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-10">
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
                disabled={answers[currentStep] === undefined}
                className="flex-[2] h-14 ml-button"
              >
                {currentStep === questions.length - 1 ? "Enviar Avaliação" : "Próximo"}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
