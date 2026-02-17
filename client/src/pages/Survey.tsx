import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertCandidateSchema, type InsertCandidate } from '@shared/schema';
import { z } from 'zod';
import { useCreateCandidate } from '@/hooks/use-candidates';
import { FormInput } from '@/components/ui/form-field';
import { RadioGroupField } from '@/components/ui/radio-group-field';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { MLHeader } from '@/components/ui/ml-header';
import { MLFooter } from '@/components/ui/ml-footer';
import { useLocation } from 'wouter';

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

const cnhOptions = [
  { value: "sim", label: "Sim, possuo CNH" },
  { value: "nao", label: "Não possuo CNH" },
];

const surveySchema = insertCandidateSchema.extend({
  cnhAnswer: z.string().min(1, "Campo obrigatório"),
});

type SurveyFormData = z.infer<typeof surveySchema>;

export default function Survey() {
  const [, navigate] = useLocation();
  const { mutate, isPending, error: submitError } = useCreateCandidate();

  const form = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
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
      cnhAnswer: "",
    },
  });

  const onSubmit = (data: SurveyFormData) => {
    const hasCnh = data.cnhAnswer === "sim";
    const { cnhAnswer, ...candidateData } = data;
    mutate({ ...candidateData, hasCnh }, {
      onSuccess: (result: any) => {
        const candidateId = result.id;
        navigate(`/quiz/${candidateId}`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#ededed]">
      <MLHeader />

      <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                data-testid="video-youtube"
              ></iframe>
            </div>
            <div className="p-6 md:p-10">
              <span className="institutional-label">Procedimento Administrativo Vinculado ao Processo Seletivo</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
                Formalização da Etapa de Contratação
              </h1>
              <div className="section-divider" />
              <p className="normative-text mb-6">
                O presente ambiente destina-se à formalização das etapas administrativas vinculadas ao processo seletivo da operação logística. O candidato declara estar ciente de que as informações fornecidas serão analisadas conforme critérios internos de conformidade e elegibilidade.
              </p>
              <div className="mt-4 p-5 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  Para fins de auditoria interna e validação sistêmica, todos os dados coletados seguem rigorosos protocolos de proteção de dados e governança corporativa.
                </p>
              </div>
            </div>
          </div>

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
                  data-testid="input-fullname"
                  {...form.register("fullName")}
                />

                <FormInput
                  label="CPF"
                  required
                  placeholder="Somente números (ex: 12345678900)"
                  error={form.formState.errors.cpf?.message}
                  data-testid="input-cpf"
                  {...form.register("cpf")}
                />

                <FormInput
                  label="Número celular com DDD (WhatsApp)"
                  required
                  type="tel"
                  placeholder="Ex: 11999999999"
                  error={form.formState.errors.whatsapp?.message}
                  data-testid="input-whatsapp"
                  {...form.register("whatsapp")}
                />

                <FormInput
                  label="E-mail"
                  required
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  error={form.formState.errors.email?.message}
                  data-testid="input-email"
                  {...form.register("email")}
                />

                <FormInput
                  label="Data de nascimento"
                  required
                  type="date"
                  error={form.formState.errors.birthDate?.message}
                  data-testid="input-birthdate"
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

              <Controller
                control={form.control}
                name="cnhAnswer"
                render={({ field }) => (
                  <RadioGroupField
                    label="Possui CNH (Carteira Nacional de Habilitação)?"
                    required
                    options={cnhOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.cnhAnswer?.message}
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
                data-testid="button-submit"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  "Confirmar"
                )}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">
                Ao clicar em "Confirmar", você concorda com nossos{" "}
                <a href="/termos" className="text-[#2968c8] underline">termos de uso</a>{" "}
                e{" "}
                <a href="/privacidade" className="text-[#2968c8] underline">política de privacidade</a>.
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <MLFooter />
    </div>
  );
}
