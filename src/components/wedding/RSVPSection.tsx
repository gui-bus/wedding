"use client";
import { useEffect, useState } from "react";
import { EnvelopeOpenIcon, CheckCircleIcon, PaperPlaneTiltIcon, UsersIcon } from "@phosphor-icons/react";
import { WeddingSelect } from "@/components/ui/WeddingSelect";
import confetti from "canvas-confetti";
import { WeddingOrnaments } from "./WeddingOrnaments";
import type { Attendance, RSVPSettings } from "@/types/guests";
type PublicInvite = {
  label: string;
  guests: { id: string; name: string; status: Attendance }[];
  revision: number;
  respondedAt: string | null;
  message: string;
  dietaryRestrictions: string;
};
export function RSVPSection() {
  const [code, setCode] = useState("");
  const [invite, setInvite] = useState<PublicInvite | null>(null);
  const [settings, setSettings] = useState<RSVPSettings>({
    enabled: true,
    deadline: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    let active = true;
    const syncHash = () => {
      const value = window.location.hash.slice(1);
      if (/^[a-f0-9]{48}$/.test(value)) {
        setCode(value); setBusy(true); setError("");
        fetch("/api/rsvp/lookup", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:value})}).then(async response => { const result = await response.json(); if (!response.ok) throw new Error(result.error); if (!active) return; setInvite(result.invitation);setSettings(result.settings);setClosed(!result.settings.enabled || (!!result.settings.deadline && Date.now() > Date.parse(result.settings.deadline))); }).catch(e => {if(active) setError(e.message || "Não foi possível consultar o convite.");}).finally(() => {if(active) setBusy(false);});
      }
    };
    window.addEventListener("hashchange", syncHash);
    queueMicrotask(syncHash);
    return () => { active = false; window.removeEventListener("hashchange", syncHash); };
  }, []);

  async function lookup(event: React.FormEvent) {
    event.preventDefault();
    const token = code.trim().toLowerCase();
    if (!/^[a-f0-9]{48}$/.test(token)) {setError("Esse código parece incompleto ou inválido. Copie os 48 caracteres do convite enviado por Giovanna e Edson, sem espaços, ou abra o link que você recebeu."); return;}
    setBusy(true);
    setError("");
    setSaved(false);
    setInvite(null);
    try {
      const response = await fetch("/api/rsvp/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: code.trim().toLowerCase() }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(response.status === 404 ? "Não encontramos um convite ativo com esse código. Confira se você copiou o código completo ou use o link recebido. Se continuar sem conseguir, fale com Giovanna ou Edson." : response.status === 400 ? "Não foi possível reconhecer esse código. Copie o código completo do convite ou abra o link enviado pelos noivos." : result.error);
      setCode(token);
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search + "#" + token);
      setInvite(result.invitation);
      setSettings(result.settings);
      setClosed(
        !result.settings.enabled ||
          (!!result.settings.deadline &&
            Date.now() > Date.parse(result.settings.deadline)),
      );
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Não foi possível consultar o convite.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!invite) return;
    if (invite.guests.some(g => g.status === "pendente")) {setError("Escolha uma resposta para cada pessoa do convite."); return;}
    setBusy(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: code.trim().toLowerCase(),
          revision: invite.revision,
          responses: invite.guests.map((g) => ({ id: g.id, status: g.status })),
          message: invite.message,
          dietaryRestrictions: invite.dietaryRestrictions,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setInvite({
        ...invite,
        revision: result.revision,
        respondedAt: new Date().toISOString(),
      });
      setSaved(true);
      if (invite.guests.some((g) => g.status === "confirmado"))
        confetti({
          particleCount: 80,
          spread: 65,
          colors: ["#C7B79D", "#5D613C", "#80654E"],
        });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Não foi possível salvar. Tente novamente.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section
      id="rsvp"
      className="rsvp-section relative overflow-hidden px-6 py-20 text-[#3D2501]"
    >
      <WeddingOrnaments variant="vows" tone="paper" />
      <div className="rsvp-shell relative z-10 mx-auto max-w-2xl space-y-8">
        <div className="text-center">
          <span className="rsvp-emblem"><EnvelopeOpenIcon size={30} weight="duotone" aria-hidden="true" /></span><p className="cinema-eyebrow">Um lugar especial para você</p>
          <h2 className="font-serif text-5xl sm:text-7xl">
            Confirmação de <em className="text-[#5D613C]">presença</em>
          </h2>
          <p className="mt-5 text-[#80654E]">
            Abra seu link exclusivo ou informe o código enviado com o convite.
          </p>
        </div>
        <div className="rsvp-card">
          {!invite && <form onSubmit={lookup} className="space-y-4">
            <label className="block text-sm" htmlFor="invite-code">
              Código do convite
            </label>
            <input
              id="invite-code"
              aria-invalid={!!error}
              aria-describedby={error ? "rsvp-error" : undefined}
              autoComplete="off"
              required
              maxLength={48}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setInvite(null);
                setSaved(false);
              }}
              className="guest-input"
              disabled={busy}
              placeholder="Cole aqui o código do seu convite"
            />
            <button className="guest-button w-full" disabled={busy}>
              {busy ? "Aguarde…" : "Consultar convite"}
            </button>
          </form>}
          {busy && !invite && <div className="rsvp-loading" role="status"><span className="wedding-skeleton" /><span className="wedding-skeleton" /><p>Preparando seu convite…</p></div>}
          {error && (
            <p
              role="alert"
              id="rsvp-error"
              className="mt-5 rounded-xl bg-rose-50 p-4 text-rose-800"
            >
              {error}
            </p>
          )}
          {saved && (
            <p
              role="status"
              className="mt-5 rounded-xl bg-green-50 p-4 text-green-800"
            >
              <CheckCircleIcon size={22} className="inline mr-2" aria-hidden="true" />Resposta salva! Obrigado pelo carinho. Você pode revisar sua
              resposta até o encerramento das confirmações.
            </p>
          )}
          {invite && (
            <form onSubmit={submit} className="rsvp-response space-y-6">
              <div>
                <button type="button" className="rsvp-change" disabled={busy} onClick={() => {setInvite(null);setCode("");setSaved(false);setError("");if (/^[a-f0-9]{48}$/.test(window.location.hash.slice(1))) window.history.replaceState(null,"",window.location.pathname + window.location.search);}}>Consultar outro convite</button><p className="rsvp-card-eyebrow"><UsersIcon size={16} aria-hidden="true" /> Seu convite</p><h3 className="font-serif text-3xl">{invite.label}</h3><p className="rsvp-instruction">Conte para nós quem estará presente nesse dia tão especial.</p>
                {invite.respondedAt && (
                  <p className="mt-2 text-sm">
                    Já recebemos uma resposta deste convite. Confira abaixo e
                    altere se precisar.
                  </p>
                )}
                {settings.deadline && (
                  <p className="mt-2 text-sm">
                    Prazo:{" "}
                    {new Date(settings.deadline).toLocaleString("pt-BR", {
                      timeZone: "America/Sao_Paulo",
                    })}{" "}
                    (Brasília).
                  </p>
                )}
              </div>
              {closed ? (
                <p role="status">
                  As confirmações estão encerradas. Para alterações, fale com os
                  noivos.
                </p>
              ) : (
                <fieldset disabled={busy} className="space-y-5">
                  {invite.guests.map((g) => (
                    <label key={g.id} className="rsvp-person block space-y-2">
                      <span className="rsvp-person-heading"><span className="rsvp-person-avatar" aria-hidden="true">{g.name.slice(0,1)}</span>{g.name}</span>
                      <WeddingSelect label={"Presença de " + g.name} disabled={busy} placeholder="Selecione uma resposta" value={g.status === "pendente" ? "" : g.status} onValueChange={value => {setSaved(false);setInvite({...invite,guests:invite.guests.map(p => p.id === g.id ? {...p,status:value as Attendance} : p)});}} options={[{value:"confirmado",label:"Vou comparecer"},{value:"recusado",label:"Não poderei comparecer"}]} />
                    </label>
                  ))}
                  <label className="block space-y-2">
                    <span>Restrições alimentares (opcional)</span>
                    <textarea
                      className="guest-input"
                      maxLength={500}
                      value={invite.dietaryRestrictions}
                      onChange={(e) => {
                        setSaved(false); setInvite({
                          ...invite,
                          dietaryRestrictions: e.target.value,
                        }); }
                      }
                    />
                  </label>
                  <label className="block space-y-2">
                    <span>Recado aos noivos (opcional)</span>
                    <textarea
                      className="guest-input"
                      maxLength={500}
                      value={invite.message}
                      onChange={(e) => {setSaved(false); setInvite({ ...invite, message: e.target.value });}}
                    />
                  </label>
                  <p className="text-sm text-[#80654E]">
                    Cada pessoa deve estar incluída no convite. Para ajustar a
                    lista, fale com Giovanna ou Edson.
                  </p>
                  <button className="guest-button w-full" disabled={busy}>
                    <PaperPlaneTiltIcon size={18} aria-hidden="true" />{busy ? "Salvando…" : "Salvar respostas"}
                  </button>
                </fieldset>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
