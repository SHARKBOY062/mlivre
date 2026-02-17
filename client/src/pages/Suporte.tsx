import { useState } from 'react';
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-field';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Mail, MessageCircle, HelpCircle } from 'lucide-react';

export default function Suporte() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#ededed]">
      <MLHeader />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2" data-testid="text-title-suporte">
              Central de Suporte
            </h1>
            <p className="text-gray-500 mb-8">Estamos aqui para ajudar. Envie sua dúvida ou entre em contato pelos canais abaixo.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-gray-100">
                <CardContent className="p-4 text-center">
                  <Mail className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 text-sm">E-mail</h3>
                  <p className="text-xs text-gray-500 mt-1">suporte@operacao.com.br</p>
                </CardContent>
              </Card>
              <Card className="border-gray-100">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 text-sm">WhatsApp</h3>
                  <p className="text-xs text-gray-500 mt-1">Resposta em até 24h</p>
                </CardContent>
              </Card>
              <Card className="border-gray-100">
                <CardContent className="p-4 text-center">
                  <HelpCircle className="w-8 h-8 text-[#2968c8] mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 text-sm">FAQ</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    <a href="/faq" className="text-[#2968c8] underline">Ver perguntas frequentes</a>
                  </p>
                </CardContent>
              </Card>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Mensagem Enviada!</h2>
                <p className="text-gray-600">Nossa equipe responderá sua solicitação em até 24 horas úteis.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  label="Nome"
                  required
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  data-testid="input-support-name"
                />
                <FormInput
                  label="E-mail"
                  required
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  data-testid="input-support-email"
                />
                <FormInput
                  label="Assunto"
                  required
                  placeholder="Resumo da sua dúvida"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  data-testid="input-support-subject"
                />
                <div className="space-y-2 mb-6">
                  <Label className="text-base font-semibold text-gray-700 flex items-center gap-1">
                    Mensagem
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    placeholder="Descreva sua dúvida ou solicitação com o máximo de detalhes"
                    className="min-h-[120px] bg-white border-gray-300 ml-input text-base"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    data-testid="textarea-support-message"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-base ml-button"
                  disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                  data-testid="button-send-support"
                >
                  Enviar Mensagem
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </main>
      <MLFooter />
    </div>
  );
}
