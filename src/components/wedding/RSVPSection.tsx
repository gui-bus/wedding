"use client";

import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import confetti from "canvas-confetti";
import { weddingConfig } from "@/config/wedding.config";
import {
  CheckCircle2,
  Users,
  UserPlus,
  Trash2,


  MessageSquare,
  AlertCircle,
} from "lucide-react";

const rsvpSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Por favor, informe seu nome completo.")
      .max(100, "Nome muito longo."),
    whatsapp: z
      .string()
      .min(10, "Informe um telefone/WhatsApp válido com DDD.")
      .max(20, "Número inválido."),
    attending: z.enum(["sim", "nao"], {
      required_error: "Selecione se irá comparecer ou não.",
    }),
    hasCompanions: z.boolean().default(false),
    companions: z.array(
      z.object({
        name: z
          .string()
          .min(3, "Informe o nome completo do acompanhante.")
          .max(100, "Nome muito longo."),
      })
    ),
    dietaryRestrictions: z.string().optional(),
    message: z.string().max(500, "Mensagem muito longa.").optional(),
  })
  .refine(
    (data) => {
      if (data.attending === "sim" && data.hasCompanions) {
        return (
          data.companions.length > 0 &&
          data.companions.every((c) => c.name && c.name.trim().length >= 3)
        );
      }
      return true;
    },
    {
      message:
        "Por favor, informe o nome completo de todos os acompanhantes que irão com você.",
      path: ["companions"],
    }
  );

type RsvpFormValues = z.infer<typeof rsvpSchema>;

export function RSVPSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<RsvpFormValues | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,

    setValue,
    reset,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      fullName: "",
      whatsapp: "",
      attending: "sim",
      hasCompanions: false,
      companions: [],
      dietaryRestrictions: "",
      message: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companions",
  });

  const attendingValue = useWatch({ control, name: "attending" });
  const hasCompanionsValue = useWatch({ control, name: "hasCompanions" });

  const onSubmit = async (data: RsvpFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Não foi possível registrar no momento.");
      }

      setSubmittedData(data);
      setIsSuccess(true);

      if (data.attending === "sim") {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C89B6D", "#B89768", "#E8B4B8", "#F1F1F1", "#5C7C58"],
        });
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(
        (err instanceof Error ? err.message : "") || "Ocorreu um erro ao enviar. Tente novamente ou confirme pelo WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessageUrl = (data: RsvpFormValues) => {
    const couple = weddingConfig.couple;
    const phone = weddingConfig.rsvp.contactWhatsApp || weddingConfig.pix.whatsappConfirmationPhone;

    let text = `Olá! Gostaria de confirmar minha presença no casamento de ${couple.partner1} e ${couple.partner2}!\n\n`;
    text += `*Convidado(a):* ${data.fullName}\n`;
    text += `*Telefone:* ${data.whatsapp}\n`;
    text += `*Presença:* ${data.attending === "sim" ? "Confirmada com alegria" : "Infelizmente não poderei comparecer"}\n`;

    if (data.attending === "sim" && data.companions && data.companions.length > 0) {
      text += `\n*Acompanhante(s) confirmados:*\n`;
      data.companions.forEach((comp, idx) => {
        text += `${idx + 1}. ${comp.name}\n`;
      });
    }

    if (data.dietaryRestrictions) {
      text += `\n*Restrições alimentares:* ${data.dietaryRestrictions}\n`;
    }

    if (data.message) {
      text += `\n*Recado:* "${data.message}"\n`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

    return (
    <section
      id="rsvp"
      className="w-full py-20 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#F5F5DA] text-[#3D2501]"
    >
      <div className="w-full space-y-16 sm:space-y-20">
        {/* Cabeçalho Editorial */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#3D2501]/15 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#5D613C] block font-semibold">
              [ 06 &bull; PRESENÇA &amp; CONVITE ]
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] text-[#3D2501]">
              Confirmação de Presença
            </h2>
          </div>

          <p className="text-sm text-[#80654E] font-light leading-relaxed">
            {weddingConfig.rsvp.deadlineDate ? "Favor confirmar até " + weddingConfig.rsvp.deadlineDate + "." : "Em breve, disponibilizaremos a confirmação de presença."}
          </p>
        </div>

        {/* Formulário Editorial Direto na Página (Sem Card!) */}
        <div>
          {isSuccess && submittedData ? (
            <div className="py-12 space-y-8 text-center border-t border-[#3D2501]/15">
              <div className="w-16 h-16 bg-[#3D2501] text-[#F5F5DA] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-4xl sm:text-5xl font-light text-[#3D2501]">
                  {submittedData.attending === "sim"
                    ? "Presença Confirmada!"
                    : "Agradecemos o seu retorno"}
                </h3>
                <p className="text-[#80654E] text-sm sm:text-base font-light">
                  {submittedData.attending === "sim"
                    ? "Será uma honra imensa ter você ao nosso lado neste dia inesquecível!"
                    : "Sentiremos muito sua falta, mas guardamos seu carinho em nossos corações."}
                </p>
              </div>

              {/* Lista dos Nomes Confirmados */}
              {submittedData.attending === "sim" && (
                <div className="border-t border-b border-[#3D2501]/15 py-6 space-y-2 text-left">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5D613C] font-semibold">
                    Confirmados na Recepção:
                  </p>
                  <p className="font-serif text-xl text-[#3D2501]">
                    &bull; {submittedData.fullName}
                  </p>
                  {submittedData.companions &&
                    submittedData.companions.map((comp, idx) => (
                      <p key={idx} className="font-serif text-lg text-[#80654E] pl-4">
                        &bull; {comp.name} <span className="text-xs font-mono uppercase text-[#80654E]/70">(Acompanhante)</span>
                      </p>
                    ))}
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                {weddingConfig.rsvp.contactWhatsApp && <a href={generateWhatsAppMessageUrl(submittedData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3D2501] hover:bg-[#80654E] text-[#F5F5DA] font-medium px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar no WhatsApp</span>
                </a>}

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    reset();
                  }}
                  className="w-full sm:w-auto text-[#80654E] hover:text-[#3D2501] text-xs font-mono uppercase tracking-widest px-4 py-2"
                >
                  Confirmar Outro Convidado
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10"><fieldset disabled={process.env.NEXT_PUBLIC_RSVP_ENABLED !== "true" || isSubmitting} className="space-y-10 disabled:opacity-60">
              {errorMessage && (
                <div className="p-4 bg-rose-50 border-l-2 border-rose-600 text-rose-800 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Nome */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#5D613C] font-semibold">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Nome do Convidado"
                  {...register("fullName")}
                  className={`w-full py-3 bg-transparent border-b ${
                    errors.fullName ? "border-rose-500" : "border-[#3D2501]/20 focus:border-[#5D613C]"
                  } text-lg font-serif text-[#3D2501] placeholder-[#80654E]/50 focus:outline-none transition-colors`}
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1 font-light">{errors.fullName.message}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#5D613C] font-semibold">
                  Seu Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="Ex: (11) 99999-9999"
                  {...register("whatsapp")}
                  className={`w-full py-3 bg-transparent border-b ${
                    errors.whatsapp ? "border-rose-500" : "border-[#3D2501]/20 focus:border-[#5D613C]"
                  } text-lg font-serif text-[#3D2501] placeholder-[#80654E]/50 focus:outline-none transition-colors`}
                />
                {errors.whatsapp && (
                  <p className="text-xs text-rose-600 mt-1 font-light">{errors.whatsapp.message}</p>
                )}
              </div>

              {/* Comparecimento */}
              <div className="space-y-4 pt-2">
                <label className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#5D613C] font-semibold">
                  Você comparecerá ao casamento? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`flex items-center justify-center p-4 border cursor-pointer transition-all ${
                      attendingValue === "sim"
                        ? "bg-[#3D2501] border-[#3D2501] text-[#F5F5DA]"
                        : "border-[#3D2501]/20 text-[#3D2501] hover:border-[#3D2501]"
                    }`}
                  >
                    <input
                      type="radio"
                      value="sim"
                      {...register("attending")}
                      className="sr-only"
                    />
                    <span className="text-xs font-mono uppercase tracking-[0.2em]">
                      Sim, com certeza!
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-center p-4 border cursor-pointer transition-all ${
                      attendingValue === "nao"
                        ? "bg-[#80654E] border-[#80654E] text-[#F5F5DA]"
                        : "border-[#3D2501]/20 text-[#80654E] hover:border-[#80654E]"
                    }`}
                  >
                    <input
                      type="radio"
                      value="nao"
                      {...register("attending")}
                      className="sr-only"
                    />
                    <span className="text-xs font-mono uppercase tracking-[0.2em]">
                      Não poderei comparecer
                    </span>
                  </label>
                </div>
              </div>

              {/* SEÇÃO DE ACOMPANHANTES */}
              {attendingValue === "sim" && (
                <div className="pt-6 border-t border-[#3D2501]/15 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-mono uppercase tracking-[0.2em] text-[#3D2501] flex items-center gap-2 font-medium">
                        <Users className="w-4 h-4 text-[#5D613C]" />
                        Você levará acompanhante(s)?
                      </label>
                      <p className="text-xs text-[#80654E] font-light mt-0.5">
                        Cônjuge, namorado(a) ou familiares.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const nextState = !hasCompanionsValue;
                        setValue("hasCompanions", nextState);
                        if (nextState && fields.length === 0) {
                          append({ name: "" });
                        } else if (!nextState) {
                          setValue("companions", []);
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out ${
                        hasCompanionsValue ? "bg-[#3D2501]" : "bg-[#C7B79D]"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-300 ease-in-out ${
                          hasCompanionsValue ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Campos com Nomes dos Acompanhantes */}
                  {hasCompanionsValue && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#5D613C] font-semibold">
                          Nome Completo de cada Acompanhante
                        </p>
                        <button
                          type="button"
                          onClick={() => append({ name: "" })}
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#3D2501] hover:text-[#5D613C] transition-colors"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>+ Adicionar outro</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {fields.map((field, index) => (
                          <div key={field.id} className="space-y-1">
                            <div className="flex items-center gap-4">
                              <span className="text-xs font-mono text-[#80654E] w-6">
                                0{index + 1}.
                              </span>
                              <input
                                type="text"
                                placeholder={`Nome completo do acompanhante ${index + 1}`}
                                {...register(`companions.${index}.name` as const)}
                                className="flex-1 py-2.5 bg-transparent border-b border-[#3D2501]/20 focus:border-[#5D613C] text-base font-serif text-[#3D2501] focus:outline-none"
                              />
                              {fields.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="p-2 text-[#80654E] hover:text-rose-600 transition-colors"
                                  title="Remover acompanhante"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            {errors.companions?.[index]?.name && (
                              <p className="text-xs text-rose-600 pl-10 font-light">
                                {errors.companions[index]?.name?.message}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Restrições Alimentares */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#5D613C] font-semibold">
                      Restrições Alimentares (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Vegetariano, intolerância a glúten ou lactose..."
                      {...register("dietaryRestrictions")}
                      className="w-full py-2.5 bg-transparent border-b border-[#3D2501]/20 focus:border-[#5D613C] text-base font-serif text-[#3D2501] placeholder-[#80654E]/60 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Mensagem */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-[0.25em] text-[#5D613C] font-semibold">
                  Recado aos Noivos (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Deixe uma mensagem de carinho..."
                  {...register("message")}
                  className="w-full py-2.5 bg-transparent border-b border-[#3D2501]/20 focus:border-[#5D613C] text-base font-serif text-[#3D2501] placeholder-[#80654E]/60 focus:outline-none resize-none"
                />
              </div>

              {/* Botão de Envio */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 px-8 bg-[#3D2501] hover:bg-[#80654E] text-[#F5F5DA] font-mono text-xs uppercase tracking-[0.25em] rounded-full transition-colors disabled:opacity-50 font-medium"
                >
                  {isSubmitting ? "Confirmando Presença..." : "Confirmar Presença"}
                </button>
              </div>
            </fieldset></form>
          )}
        </div>
      </div>
    </section>
  );
}
