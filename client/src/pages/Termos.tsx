import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { motion } from 'framer-motion';

export default function Termos() {
  return (
    <div className="min-h-screen bg-[#ededed]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6" data-testid="text-title-termos">
              Termos e Condições de Uso
            </h1>

            <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-lg font-bold text-gray-800">1. Aceitação dos Termos</h2>
                <p className="leading-relaxed">
                  Ao acessar e utilizar este formulário de inscrição para o processo seletivo da operação logística, você concorda integralmente com os presentes Termos e Condições. Caso não concorde com algum dos termos descritos, recomendamos que não prossiga com o preenchimento.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">2. Finalidade do Formulário</h2>
                <p className="leading-relaxed">
                  Este formulário destina-se exclusivamente à coleta de dados de candidatos interessados em participar do processo seletivo para vagas na operação logística. As informações coletadas serão utilizadas para fins de avaliação, triagem e contato com os candidatos.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">3. Veracidade das Informações</h2>
                <p className="leading-relaxed">
                  O candidato declara que todas as informações fornecidas são verdadeiras, precisas e completas. Informações falsas ou imprecisas podem resultar na desclassificação do processo seletivo.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">4. Processo Seletivo</h2>
                <p className="leading-relaxed">
                  O preenchimento do formulário não garante a contratação. Todos os candidatos passarão por etapas de avaliação conforme os critérios definidos pela empresa. A ordem de inscrição poderá ser considerada como critério de prioridade.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">5. Comunicação</h2>
                <p className="leading-relaxed">
                  Ao fornecer seus dados de contato, o candidato autoriza o envio de comunicações relacionadas ao processo seletivo por meio de e-mail, telefone e WhatsApp. Estas comunicações podem incluir atualizações sobre o status da candidatura, convocações e informações relevantes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">6. Propriedade Intelectual</h2>
                <p className="leading-relaxed">
                  Todo o conteúdo deste formulário, incluindo textos, imagens, logotipos e design, é protegido por direitos autorais. É proibida a reprodução, distribuição ou uso não autorizado de qualquer material presente nesta plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">7. Modificações</h2>
                <p className="leading-relaxed">
                  Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento, sem aviso prévio. As alterações entrarão em vigor imediatamente após a publicação.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">8. Foro</h2>
                <p className="leading-relaxed">
                  Para dirimir quaisquer controvérsias decorrentes destes Termos, fica eleito o foro da comarca de São Paulo/SP, com renúncia expressa de qualquer outro, por mais privilegiado que seja.
                </p>
              </section>

              <p className="text-sm text-gray-400 mt-8">Última atualização: Fevereiro de 2026.</p>
            </div>
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
