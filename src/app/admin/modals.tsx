"use client";
import { WeddingSelect } from "@/components/ui/WeddingSelect";
import { useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  CalendarDays,
  Check,
  Flower2,
  LoaderCircle,
  Plus,
  Save,
  Trash2,
  Users,
  X,
} from "lucide-react";
import type { Guest, Invitation, RSVPSettings } from "@/types/guests";
import type { AdminModalName } from "./modal-state";
export type InviteDraft = Pick<Invitation, "label" | "active" | "guests">;
const labels = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  recusado: "Não comparecerá",
};
const emptyGuest = (): Guest => ({
  id: crypto.randomUUID(),
  name: "",
  child: false,
  status: "pendente",
  checkedIn: false,
});
function Modal({
  title,
  description,
  children,
  busy,
  onClose,
  danger = false,
}: {
  title: string;
  description: string;
  children: ReactNode;
  busy: boolean;
  onClose: () => void;
  danger?: boolean;
}) {
  const content = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open && !busy) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="admin-modal-overlay" />
        <Dialog.Content
          ref={content}
          className={
            "admin-wedding admin-modal" +
            (danger ? " admin-modal--compact" : "")
          }
          onEscapeKeyDown={(event) => {
            if (busy) event.preventDefault();
          }}
          onPointerDownOutside={(event) => {
            if (busy) event.preventDefault();
          }}
          onOpenAutoFocus={(event) => {
            opener.current = document.activeElement as HTMLElement;
            const first = content.current?.querySelector<HTMLElement>(
              "[data-modal-autofocus]",
            );
            if (first) {
              event.preventDefault();
              first.focus();
            }
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const target = opener.current?.isConnected
              ? opener.current
              : document.querySelector<HTMLElement>(
                  ".admin-toolbar .guest-button",
                );
            target?.focus();
          }}
        >
          <header className="admin-modal-heading">
            <span
              className={
                "admin-modal-emblem" +
                (danger ? " admin-modal-emblem--danger" : "")
              }
              aria-hidden="true"
            >
              {danger ? (
                <Trash2 size={22} strokeWidth={1.2} />
              ) : (
                <Flower2 size={27} strokeWidth={1} />
              )}
            </span>
            <div>
              <p className="admin-eyebrow">
                {danger
                  ? "Cuidado com a nossa lista"
                  : "Cada detalhe, com carinho"}
              </p>
              <Dialog.Title asChild>
                <h2>{title}</h2>
              </Dialog.Title>
              <Dialog.Description className="admin-modal-description">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Close
              disabled={busy}
              className="admin-modal-close"
              aria-label="Fechar modal"
            >
              <X size={20} strokeWidth={1.4} />
            </Dialog.Close>
          </header>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
function ErrorMessage({ error }: { error: string }) {
  return error ? (
    <p role="alert" className="admin-alert admin-alert--error">
      {error}
    </p>
  ) : null;
}
function InviteForm({
  initial,
  busy,
  error,
  onClose,
  onSave,
}: {
  initial?: Invitation;
  busy: boolean;
  error: string;
  onClose: () => void;
  onSave: (draft: InviteDraft, original?: Invitation) => void;
}) {
  // Capture the revision with the draft so a concurrent update cannot silently overwrite it.
  const [original] = useState(initial);
  const [label, setLabel] = useState(initial?.label ?? "");
  const [active, setActive] = useState(initial?.active ?? true);
  const [guests, setGuests] = useState<Guest[]>(() =>
    initial ? initial.guests.map((g) => ({ ...g })) : [emptyGuest()],
  );
  function change(id: string, patch: Partial<Guest>) {
    setGuests((current) =>
      current.map((g) =>
        g.id === id
          ? {
              ...g,
              ...patch,
              checkedIn:
                patch.status && patch.status !== "confirmado"
                  ? false
                  : (patch.checkedIn ?? g.checkedIn),
            }
          : g,
      ),
    );
  }
  return (
    <form
      className="admin-modal-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave({ label, active, guests }, original);
      }}
    >
      <div className="admin-modal-body">
        <fieldset disabled={busy} className="admin-modal-fields">
          <ErrorMessage error={error} />
          <section className="admin-form-section">
            <p className="admin-form-kicker">01 · O convite</p>
            <label className="admin-modal-field">
              <span>
                Nome do convite / família <small>Obrigatório</small>
              </span>
              <input
                data-modal-autofocus
                autoComplete="off"
                required
                minLength={2}
                maxLength={100}
                className="guest-input"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                placeholder="Ex.: Família Oliveira"
              />
            </label>
            <label className="admin-invitation-toggle">
              <span>
                <strong>Convite ativo</strong>
                <small>
                  Permite que a família consulte e responda ao convite.
                </small>
              </span>
              <input
                type="checkbox"
                checked={active}
                onChange={(event) => setActive(event.target.checked)}
              />
              <span className="admin-switch-track" aria-hidden="true" />
            </label>
          </section>
          <section className="admin-form-section">
            <div className="admin-people-heading">
              <div>
                <p className="admin-form-kicker">02 · Quem vai receber</p>
                <h3>Pessoas do convite</h3>
              </div>
              <span className="admin-people-count">
                <Users size={13} aria-hidden="true" />
                {guests.length} {guests.length === 1 ? "pessoa" : "pessoas"}
              </span>
            </div>
            <p className="admin-form-help">
              Inclua cada pessoa pelo nome, inclusive crianças e acompanhantes
              autorizados.
            </p>
            <div className="admin-guest-cards">
              {guests.map((guest, index) => (
                <div key={guest.id} className="admin-guest-card">
                  <div className="admin-guest-card-heading">
                    <span>
                      <i>{String(index + 1).padStart(2, "0")}</i>{" "}
                      {guest.name.trim() || "Nova pessoa"}
                    </span>
                    <button
                      type="button"
                      className="admin-remove-person"
                      disabled={guests.length === 1}
                      aria-label={
                        "Remover " +
                        (guest.name.trim() || "pessoa " + (index + 1))
                      }
                      title={
                        guests.length === 1
                          ? "O convite precisa ter pelo menos uma pessoa"
                          : "Remover pessoa deste rascunho"
                      }
                      onClick={() =>
                        setGuests((current) =>
                          current.filter((g) => g.id !== guest.id),
                        )
                      }
                    >
                      <Trash2 size={15} strokeWidth={1.4} />
                      <span>Remover</span>
                    </button>
                  </div>
                  <div className="admin-guest-fields">
                    <label className="admin-modal-field">
                      <span>Nome completo</span>
                      <input
                        className="guest-input"
                        required
                        minLength={2}
                        maxLength={100}
                        value={guest.name}
                        onChange={(event) =>
                          change(guest.id, { name: event.target.value })
                        }
                        placeholder="Nome e sobrenome"
                        autoComplete="off"
                      />
                    </label>
                    <label className="admin-modal-field">
                      <span>Confirmação de presença</span>
                      <WeddingSelect label="Confirmação de presença" disabled={busy} value={guest.status} onValueChange={(value) => change(guest.id, {status: value as Guest["status"]})} options={Object.entries(labels).map(([value,label]) => ({value,label}))} />
                    </label>
                  </div>
                  <div className="admin-guest-options">
                    <label className="admin-option-chip">
                      <input
                        type="checkbox"
                        checked={guest.child}
                        onChange={(event) =>
                          change(guest.id, { child: event.target.checked })
                        }
                      />
                      <span className="admin-option-check" aria-hidden="true">
                        <Check size={11} />
                      </span>
                      Criança
                    </label>
                    <label className="admin-option-chip">
                      <input
                        type="checkbox"
                        disabled={guest.status !== "confirmado"}
                        checked={guest.checkedIn}
                        onChange={(event) =>
                          change(guest.id, { checkedIn: event.target.checked })
                        }
                      />
                      <span className="admin-option-check" aria-hidden="true">
                        <Check size={11} />
                      </span>
                      Chegou ao evento
                    </label>
                    {guest.status !== "confirmado" && (
                      <small>Chegada disponível após confirmar.</small>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="admin-add-person"
              disabled={guests.length >= 40}
              onClick={() => setGuests((current) => [...current, emptyGuest()])}
            >
              <Plus size={17} aria-hidden="true" />
              Adicionar pessoa ao convite<span>{guests.length}/40</span>
            </button>
          </section>
        </fieldset>
      </div>
      <footer className="admin-modal-footer">
        <span className="admin-save-hint">
          <Save size={14} aria-hidden="true" />
          Alterações aplicadas ao salvar.
        </span>
        <button
          type="button"
          className="guest-secondary"
          disabled={busy}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button className="guest-button" disabled={busy}>
          {busy ? (
            <LoaderCircle
              size={15}
              className="admin-refresh-busy"
              aria-hidden="true"
            />
          ) : (
            <Check size={15} aria-hidden="true" />
          )}
          {busy ? "Salvando…" : "Salvar convite"}
        </button>
      </footer>
    </form>
  );
}
function SettingsForm({
  initial,
  busy,
  error,
  onClose,
  onSave,
}: {
  initial: RSVPSettings;
  busy: boolean;
  error: string;
  onClose: () => void;
  onSave: (settings: RSVPSettings) => void;
}) {
  const [settings, setSettings] = useState({ ...initial });
  return (
    <form
      className="admin-modal-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(settings);
      }}
    >
      <div className="admin-modal-body">
        <fieldset disabled={busy} className="admin-modal-fields">
          <ErrorMessage error={error} />
          <label className="admin-invitation-toggle">
            <span>
              <strong>Aceitar confirmações</strong>
              <small>Desative para encerrar o recebimento de respostas.</small>
            </span>
            <input
              data-modal-autofocus
              type="checkbox"
              checked={settings.enabled}
              onChange={(event) =>
                setSettings({ ...settings, enabled: event.target.checked })
              }
            />
            <span className="admin-switch-track" aria-hidden="true" />
          </label>
          <label className="admin-modal-field">
            <span>
              <CalendarDays size={14} aria-hidden="true" />
              Prazo para responder
            </span>
            <input
              type="datetime-local"
              className="guest-input"
              value={
                settings.deadline
                  ? new Date(
                      Date.parse(settings.deadline) -
                        new Date(settings.deadline).getTimezoneOffset() * 60000,
                    )
                      .toISOString()
                      .slice(0, 16)
                  : ""
              }
              onChange={(event) =>
                setSettings({
                  ...settings,
                  deadline: event.target.value
                    ? new Date(event.target.value).toISOString()
                    : "",
                })
              }
            />
          </label>
          <p className="admin-form-help">
            Horário do seu dispositivo. Deixe vazio para não definir prazo.
            Vocês podem corrigir respostas pelo painel mesmo depois do
            encerramento.
          </p>
        </fieldset>
      </div>
      <footer className="admin-modal-footer">
        <button
          type="button"
          className="guest-secondary"
          disabled={busy}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button className="guest-button" disabled={busy}>
          {busy ? "Salvando…" : "Salvar configurações"}
        </button>
      </footer>
    </form>
  );
}
export function AdminModals({
  modal,
  selected,
  settings,
  busy,
  error,
  onClose,
  onSave,
  onSettings,
  onDelete,
}: {
  modal: AdminModalName;
  selected?: Invitation;
  settings: RSVPSettings;
  busy: boolean;
  error: string;
  onClose: () => void;
  onSave: (draft: InviteDraft, original?: Invitation) => void;
  onSettings: (settings: RSVPSettings) => void;
  onDelete: (invite: Invitation) => void;
}) {
  const missing =
    (modal === "editar-convite" || modal === "excluir-convite") && !selected;
  const title = missing
    ? "Convite indisponível"
    : modal === "novo-convite"
      ? "Novo convite"
      : modal === "editar-convite"
        ? "Editar convite"
        : modal === "configuracoes"
          ? "Confirmações de presença"
          : "Excluir convite?";
  const description = missing
    ? "O convite deste link não existe mais ou o endereço está incompleto."
    : modal === "configuracoes"
      ? "Defina quando as pessoas podem responder ao nosso convite."
      : modal === "excluir-convite"
        ? "Esta ação remove o convite e todas as respostas da família."
        : "Uma família, um convite. Organize as pessoas e acompanhe cada resposta.";
  return (
    <Modal
      title={title}
      description={description}
      busy={busy}
      onClose={onClose}
      danger={modal === "excluir-convite"}
    >
      {missing ? (
        <div className="admin-modal-body">
          <p className="admin-form-help">
            Feche esta janela e escolha um convite na lista atualizada.
          </p>
          <button className="guest-secondary" onClick={onClose}>
            Voltar à lista
          </button>
        </div>
      ) : modal === "configuracoes" ? (
        <SettingsForm
          initial={settings}
          busy={busy}
          error={error}
          onClose={onClose}
          onSave={onSettings}
        />
      ) : modal === "excluir-convite" && selected ? (
        <>
          <div className="admin-modal-body">
            <ErrorMessage error={error} />
            <div className="admin-delete-summary">
              <strong>{selected.label}</strong>
              <span>
                {selected.guests.length}{" "}
                {selected.guests.length === 1
                  ? "pessoa incluída"
                  : "pessoas incluídas"}
              </span>
            </div>
            <p className="admin-form-help">
              Para preservar as informações, você pode desativar o convite em
              Editar. A exclusão é definitiva.
            </p>
          </div>
          <footer className="admin-modal-footer">
            <button
              data-modal-autofocus
              className="guest-secondary"
              disabled={busy}
              onClick={onClose}
            >
              Manter convite
            </button>
            <button
              className="guest-button admin-danger-button"
              disabled={busy}
              onClick={() => onDelete(selected)}
            >
              <Trash2 size={14} aria-hidden="true" />
              {busy ? "Excluindo…" : "Excluir definitivamente"}
            </button>
          </footer>
        </>
      ) : (
        <InviteForm
          initial={selected}
          busy={busy}
          error={error}
          onClose={onClose}
          onSave={onSave}
        />
      )}
    </Modal>
  );
}
