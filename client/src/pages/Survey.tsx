import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertCandidateSchema, type InsertCandidate } from '@shared/schema';
import { useCreateCandidate } from '@/hooks/use-candidates';
import { FormInput } from '@/components/ui/form-field';
import { RadioGroupField } from '@/components/ui/radio-group-field';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Options Data
const yesNoOptions = [
  { value: "Sim, sou uma pessoa com deficiência", label: "Sim, sou uma pessoa com deficiência" },
  { value: "Não, não sou uma pessoa com deficiência", label: "Não, não sou uma pessoa com deficiência" },
  { value: "Prefiro não informar", label: "Prefiro não informar" },
];

const genderOptions = [
  { value: "Feminino (cisgênero)", label: "Feminino (cisgênero - nasci e me identifico com o sexo feminino)" },
  { value: "Feminino (transgênero)", label: "Feminino (transgênero - não nasci com o sexo feminino mas me identifico com ele)" },
  { value: "Masculino (cisgênero)", label: "Masculino (cisgênero - nasci e me identifico com o sexo masculino)" },
  { value: "Masculino (transgênero)", label: "Masculino (transgênero - não nasci com o sexo masculino mas me identifico com ele)" },
  { value: "Não binário", label: "Não binário" },
  { value: "Outros", label: "Outros" },
  { value: "Prefiro não informar", label: "Prefiro não informar" },
];

const maritalStatusOptions = [
  { value: "Solteiro(a)", label: "Solteiro(a)" },
  { value: "Casado(a)", label: "Casado(a)" },
  { value: "Em união estável", label: "Em união estável" },
  { value: "Divorciado(a)", label: "Divorciado(a)" },
  { value: "Viúvo(a)", label: "Viúvo(a)" },
  { value: "Prefiro não informar", label: "Prefiro não informar" },
];

const raceOptions = [
  { value: "Branca", label: "Branca" },
  { value: "Preta", label: "Preta" },
  { value: "Parda", label: "Parda" },
  { value: "Amarela", label: "Amarela" },
  { value: "Indígena", label: "Indígena" },
  { value: "Prefiro não informar", label: "Prefiro não informar" },
];

const educationOptions = [
  { value: "Sem escolaridade", label: "Sem escolaridade" },
  { value: "Fundamental I completo", label: "Fundamental I completo (até 4ª série ou 5º ano)" },
  { value: "Fundamental II completo", label: "Fundamental II completo (até 8ª série ou 9º ano)" },
  { value: "Ensino médio incompleto", label: "Ensino médio incompleto" },
  { value: "Ensino médio completo", label: "Ensino médio completo" },
  { value: "Ensino superior incompleto", label: "Ensino superior incompleto" },
  { value: "Ensino superior completo", label: "Ensino superior completo" },
];

export default function Survey() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending, error: submitError } = useCreateCandidate();

  const form = useForm<InsertCandidate>({
    resolver: zodResolver(insertCandidateSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      whatsapp: "",
      email: "",
      birthDate: "",
      isPcd: undefined,
      gender: undefined,
      maritalStatus: undefined,
      race: undefined,
      education: undefined,
    },
  });

  const onSubmit = (data: InsertCandidate) => {
    mutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#ededed] flex items-center justify-center p-4">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center border-t-4 border-[#ffe600]"
         >
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Candidatura Enviada!</h2>
            <p className="text-gray-600 mb-6">
              Agradecemos seu interesse em fazer parte do nosso time. Analisaremos seus dados e entraremos em contato se houver oportunidades compatíveis com seu perfil.
            </p>
            <Button 
              className="ml-button w-full"
              onClick={() => window.location.reload()}
            >
              Voltar ao início
            </Button>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ededed]">
      {/* Mercado Libre Header */}
      <header className="bg-[#ffe600] h-16 shadow-sm flex items-center px-4 md:px-8 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
           <div className="flex items-center gap-2">
             <img 
               src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png" 
               alt="Mercado Livre" 
               className="h-8 md:h-10 object-contain"
             />
           </div>
           <span className="text-[#2d3277] font-semibold text-sm md:text-base hidden sm:block">
             Trabalhe Conosco
           </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Intro Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="aspect-video w-full bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/3IKz_huxGKc" 
                title="Time de Recrutamento - Mercado Livre" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                Olá! Temos orgulho em saber que você quer trabalhar na nossa operação logística.
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Este é um <strong className="text-gray-800">formulário oficial do Mercado Livre</strong> para participação do nosso processo seletivo. Para seguir adiante com sua candidatura é obrigatório o preenchimento dos dados solicitados a seguir.
              </p>
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-[#2d3277] rounded-r-md">
                <p className="text-sm text-[#2d3277]">
                  Todas as informações fornecidas serão tratadas com <strong>confidencialidade</strong> e utilizadas exclusivamente para fins de recrutamento.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card className="ml-card">
              <CardContent className="p-6 md:p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Dados Pessoais</h2>
                  <p className="text-gray-500 text-sm">Preencha com seus dados atualizados</p>
                </div>

                <FormInput
                  label="Nome completo"
                  required
                  placeholder="Ex: Maria Silva"
                  error={form.formState.errors.fullName?.message}
                  {...form.register("fullName")}
                />

                <FormInput
                  label="CPF"
                  required
                  placeholder="Somente números (ex: 12345678900)"
                  error={form.formState.errors.cpf?.message}
                  {...form.register("cpf")}
                />

                <FormInput
                  label="Número celular com DDD (WhatsApp)"
                  required
                  type="tel"
                  placeholder="Ex: 11999999999"
                  error={form.formState.errors.whatsapp?.message}
                  {...form.register("whatsapp")}
                />

                <FormInput
                  label="E-mail"
                  required
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  error={form.formState.errors.email?.message}
                  {...form.register("email")}
                />

                <FormInput
                  label="Data de nascimento"
                  required
                  type="date"
                  error={form.formState.errors.birthDate?.message}
                  {...form.register("birthDate")}
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Controller
                control={form.control}
                name="isPcd"
                render={({ field }) => (
                  <RadioGroupField
                    label="Você é uma pessoa com deficiência (PcD)?"
                    required
                    options={yesNoOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.isPcd?.message}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <RadioGroupField
                    label="Qual é seu gênero?"
                    required
                    options={genderOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.gender?.message}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <RadioGroupField
                    label="Qual seu estado civil?"
                    required
                    options={maritalStatusOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.maritalStatus?.message}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="race"
                render={({ field }) => (
                  <RadioGroupField
                    label="Com qual das seguintes opções de cor/raça você se identifica?"
                    required
                    options={raceOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.race?.message}
                  />
                )}
              />

              <Controller
                control={form.control}
                name="education"
                render={({ field }) => (
                  <RadioGroupField
                    label="Escolaridade"
                    required
                    options={educationOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.education?.message}
                  />
                )}
              />
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p>{submitError.message}</p>
              </div>
            )}

            <div className="sticky bottom-0 bg-[#ededed]/90 backdrop-blur-sm p-4 -mx-4 md:mx-0 border-t border-gray-200 md:border-none md:bg-transparent md:static">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-14 text-lg ml-button shadow-lg shadow-blue-900/10"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  "Enviar candidatura"
                )}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">
                Ao clicar em "Enviar candidatura", você concorda com nossos termos de privacidade.
              </p>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
