import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { motion } from 'framer-motion';

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-[#ededed]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6" data-testid="text-title-privacidade">
              Política de Privacidade
            </h1>

            <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-lg font-bold text-gray-800">1. Introdução</h2>
                <p className="leading-relaxed">
                  Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos os dados pessoais dos candidatos que participam do processo seletivo para a operação logística, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">2. Dados Coletados</h2>
                <p className="leading-relaxed">Coletamos os seguintes dados pessoais através do formulário de inscrição:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nome completo</li>
                  <li>CPF</li>
                  <li>Número de celular (WhatsApp)</li>
                  <li>Endereço de e-mail</li>
                  <li>Data de nascimento</li>
                  <li>Informações sobre deficiência (PcD)</li>
                  <li>Gênero</li>
                  <li>Estado civil</li>
                  <li>Cor/raça</li>
                  <li>Escolaridade</li>
                  <li>Informações sobre CNH</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">3. Finalidade do Tratamento</h2>
                <p className="leading-relaxed">Os dados pessoais coletados são tratados para as seguintes finalidades:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Avaliação e triagem de candidatos</li>
                  <li>Comunicação sobre o andamento do processo seletivo</li>
                  <li>Agendamento de etapas do processo</li>
                  <li>Cumprimento de obrigações legais e regulatórias</li>
                  <li>Promoção de políticas de diversidade e inclusão</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">4. Base Legal</h2>
                <p className="leading-relaxed">
                  O tratamento dos dados pessoais está fundamentado no consentimento do titular (Art. 7º, I, LGPD) e na execução de procedimentos preliminares relacionados a contrato de trabalho (Art. 7º, V, LGPD).
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">5. Armazenamento e Segurança</h2>
                <p className="leading-relaxed">
                  Os dados são armazenados em servidores seguros com criptografia e acesso restrito. Adotamos medidas técnicas e administrativas adequadas para proteger seus dados contra acessos não autorizados, destruição, perda ou alteração.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">6. Compartilhamento de Dados</h2>
                <p className="leading-relaxed">
                  Seus dados pessoais não serão compartilhados com terceiros, exceto quando necessário para o cumprimento de obrigações legais ou mediante seu consentimento expresso.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">7. Direitos do Titular</h2>
                <p className="leading-relaxed">Em conformidade com a LGPD, você tem direito a:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Confirmar a existência de tratamento de seus dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Solicitar a correção de dados incompletos ou desatualizados</li>
                  <li>Solicitar a eliminação de dados desnecessários</li>
                  <li>Revogar o consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">8. Retenção de Dados</h2>
                <p className="leading-relaxed">
                  Os dados serão retidos pelo período necessário para o cumprimento das finalidades descritas nesta política. Após esse período, os dados serão eliminados de forma segura.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-800">9. Contato</h2>
                <p className="leading-relaxed">
                  Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de seus dados pessoais, entre em contato através da nossa página de suporte.
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
