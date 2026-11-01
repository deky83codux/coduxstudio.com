import { useState } from "react";
import { submitToWeb3Forms } from "../../lib/web3forms";

const EMPTY = { name: "", email: "", phone: "", services: [], message: "" };

// Contact form state + Web3Forms submit.
export function useContactForm({
  subjectPrefix = "New inquiry from",
  fromName = "Coduxstudio Contact Form",
} = {}) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));
  const submit = async (e) => {
    e?.preventDefault?.();
    if (status === "sending") return false;
    setStatus("sending");
    try {
      const services = form.services.join(", ");
      // Field names as they arrive in the Web3Forms email.
      await submitToWeb3Forms({
        subject: `${subjectPrefix} ${form.name || "website"}${services ? ` — ${services}` : ""}`,
        from_name: fromName,
        name: form.name,
        email: form.email,
        phone: form.phone || "—",
        services: services || "—",
        message: form.message,
        botcheck: "",
      });
      setStatus("success");
      setForm(EMPTY);
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  };
  return { form, set, setForm, status, setStatus, submit };
}
