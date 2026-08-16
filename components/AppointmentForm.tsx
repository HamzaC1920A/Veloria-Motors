"use client";

import { useId, useState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";
import { services } from "@/data/services";
import {
  appointmentMessage,
  whatsappUrl,
  type AppointmentPayload,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const EMPTY: AppointmentPayload = {
  name: "",
  phone: "",
  brand: "",
  model: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

type FieldName = keyof AppointmentPayload;
type Errors = Partial<Record<FieldName, string>>;

/** Accepte les formats tunisiens courants : 29 491 524, +216 29 491 524, 0029… */
const PHONE_PATTERN = /^\+?[\d\s().-]{8,20}$/;

function validate(values: AppointmentPayload): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Merci d'indiquer votre nom.";
  }
  if (values.phone.trim() === "") {
    errors.phone = "Merci d'indiquer un numéro de téléphone.";
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Ce numéro ne semble pas valide.";
  }
  if (values.service.trim() === "") {
    errors.service = "Merci de choisir un service.";
  }

  return errors;
}

const fieldClasses =
  "h-12 w-full border border-white/12 bg-base px-4 text-sm text-white placeholder:text-white/30 " +
  "transition-colors duration-300 focus:border-gold focus:outline-none";

export function AppointmentForm() {
  const formId = useId();
  const [values, setValues] = useState<AppointmentPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const setField = (field: FieldName, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0];
      document.getElementById(`${formId}-${firstField}`)?.focus();
      return;
    }

    // V1 sans base de données : la demande part directement sur WhatsApp.
    window.open(whatsappUrl(appointmentMessage(values)), "_blank", "noopener");
    setSent(true);
  };

  const fieldId = (field: FieldName) => `${formId}-${field}`;
  const errorId = (field: FieldName) => `${formId}-${field}-error`;

  const renderError = (field: FieldName) =>
    errors[field] ? (
      <p id={errorId(field)} role="alert" className="mt-1.5 text-xs text-red-400">
        {errors[field]}
      </p>
    ) : null;

  const invalidProps = (field: FieldName) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
    className: cn(fieldClasses, errors[field] && "border-red-500/70"),
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={fieldId("name")}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
          >
            Nom <span className="text-gold">*</span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Votre nom"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            {...invalidProps("name")}
          />
          {renderError("name")}
        </div>

        <div>
          <label
            htmlFor={fieldId("phone")}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
          >
            Téléphone <span className="text-gold">*</span>
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+216 ..."
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            {...invalidProps("phone")}
          />
          {renderError("phone")}
        </div>

        <div>
          <label
            htmlFor={fieldId("brand")}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
          >
            Marque
          </label>
          <input
            id={fieldId("brand")}
            name="brand"
            type="text"
            placeholder="Ex. Volkswagen"
            value={values.brand}
            onChange={(event) => setField("brand", event.target.value)}
            className={fieldClasses}
          />
        </div>

        <div>
          <label
            htmlFor={fieldId("model")}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
          >
            Modèle
          </label>
          <input
            id={fieldId("model")}
            name="model"
            type="text"
            placeholder="Ex. Golf 7"
            value={values.model}
            onChange={(event) => setField("model", event.target.value)}
            className={fieldClasses}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={fieldId("service")}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
          >
            Service souhaité <span className="text-gold">*</span>
          </label>
          <select
            id={fieldId("service")}
            name="service"
            value={values.service}
            onChange={(event) => setField("service", event.target.value)}
            {...invalidProps("service")}
            className={cn(invalidProps("service").className, "[color-scheme:dark]")}
          >
            <option value="">Choisir un service…</option>
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          {renderError("service")}
        </div>

        <div>
          <label
            htmlFor={fieldId("date")}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
          >
            Date souhaitée
          </label>
          <input
            id={fieldId("date")}
            name="date"
            type="date"
            value={values.date}
            onChange={(event) => setField("date", event.target.value)}
            className={cn(fieldClasses, "[color-scheme:dark]")}
          />
        </div>

        <div>
          <label
            htmlFor={fieldId("time")}
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
          >
            Heure souhaitée
          </label>
          <input
            id={fieldId("time")}
            name="time"
            type="time"
            value={values.time}
            onChange={(event) => setField("time", event.target.value)}
            className={cn(fieldClasses, "[color-scheme:dark]")}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={fieldId("message")}
          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
        >
          Message
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          placeholder="Décrivez votre besoin en quelques mots…"
          value={values.message}
          onChange={(event) => setField("message", event.target.value)}
          className={cn(fieldClasses, "h-auto resize-y py-3.5")}
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        <MessageCircle className="size-4" aria-hidden="true" />
        Envoyer ma demande
      </Button>

      <p className="text-center text-xs leading-relaxed text-white/40">
        Votre demande est transmise directement sur WhatsApp — aucune donnée
        n&apos;est enregistrée sur ce site.
      </p>

      <p aria-live="polite" className="min-h-0">
        {sent ? (
          <span className="flex items-center justify-center gap-2 text-sm text-gold">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            WhatsApp a été ouvert avec votre demande pré-remplie.
          </span>
        ) : null}
      </p>
    </form>
  );
}
