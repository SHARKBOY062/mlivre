import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "Este processo seletivo é confiável?",
    answer: "Sim. Este é um formulário oficial vinculado ao programa de recrutamento para a operação logística. Todas as informações são tratadas com total confidencialidade e segurança, em conformidade com a LGPD (Lei Geral de Proteção de Dados)."
  },
  {
    question: "Quando começo a trabalhar?",
    answer: "Após a confirmação da sua participação e conclusão de todas as etapas do processo seletivo, você será incluído no próximo ciclo operacional. O agendamento será comunicado por e-mail e WhatsApp com a data exata de início das atividades."
  },
  {
    question: "E se eu desistir?",
    answer: "Você pode desistir do processo seletivo a qualquer momento, sem nenhuma penalidade. Basta entrar em contato com nossa equipe de suporte para solicitar o cancelamento da sua inscrição."
  },
  {
    question: "Posso parcelar os valores?",
    answer: "Sim. Oferecemos opções de parcelamento para facilitar sua participação. Entre em contato com nossa equipe de suporte para conhecer as condições disponíveis no momento."
  },
  {
    question: "Preciso ter experiência anterior?",
    answer: "Não é necessário ter experiência prévia na área logística. O programa inclui treinamento completo para que você possa desempenhar suas funções com excelência desde o primeiro dia."
  },
  {
    question: "Quais são os benefícios oferecidos?",
    answer: "Os benefícios incluem remuneração competitiva, possibilidade de crescimento dentro da operação, treinamento contínuo e ambiente de trabalho dinâmico. Detalhes completos serão informados durante o processo de contratação."
  },
  {
    question: "Posso me candidatar sem CNH?",
    answer: "Sim. Candidatos sem CNH podem participar do processo seletivo através do Programa de Habilitação vinculado à contratação. Você poderá trabalhar e, ao mesmo tempo, obter sua habilitação com suporte do programa."
  },
  {
    question: "Como sei que minha inscrição foi recebida?",
    answer: "Após o envio do formulário, você será redirecionado para as próximas etapas do processo. Além disso, uma confirmação será enviada para o e-mail e WhatsApp cadastrados."
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#ededed]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2" data-testid="text-title-faq">
              Perguntas Frequentes
            </h1>
            <p className="text-gray-500 mb-8">Tire suas dúvidas sobre o processo seletivo</p>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-md px-4"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
