import React from "react";
import { useNavigate } from "react-router-dom";
import events from "../data/events";

type FormData = {
    fullName: string;
    studentId: string;
    email: string;
    phone: string;
    eventId: string;
    participation: "Katılımcı" | "Gönüllü" | "Konuşmacı";
    note: string;
    consent: boolean;
};

const initial: FormData = {
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    eventId: "",
    participation: "Katılımcı",
    note: "",
    consent: false,
};

const EtkinlikKatilim: React.FC = () => {
    const [data, setData] = React.useState<FormData>(initial);
    const [errors, setErrors] = React.useState<Partial<Record<keyof FormData, string>>>({});
    const [sent, setSent] = React.useState<null | "ok" | "fail">(null);
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (sent === "ok") {
            const t = setTimeout(() => {
                navigate("/");
            }, 5000);
            return () => clearTimeout(t);
        }
    }, [sent, navigate]);

    const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
        setData((s) => ({ ...s, [k]: v }));

    const validate = () => {
        const e: typeof errors = {};
        if (!data.fullName.trim()) e.fullName = "Ad Soyad gerekli.";
        if (!/^[0-9]{6,}$/.test(data.studentId.trim())) e.studentId = "Öğrenci no en az 6 haneli olmalı.";
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = "Geçerli bir e‑posta giriniz.";
        if (!/^[0-9+()\s-]{7,}$/.test(data.phone)) e.phone = "Geçerli bir telefon giriniz.";
        if (!data.eventId) e.eventId = "Bir etkinlik seçiniz.";
        if (!data.consent) e.consent = "Aydınlatma metnini onaylayınız.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setSent(null);
        if (!validate()) return;
        setLoading(true);
        try {
            // TODO: backend'e gönder
            // await fetch("/api/event-register", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(data) });

            await new Promise((r) => setTimeout(r, 800)); // demo
            setSent("ok");
            setData(initial);
        } catch {
            setSent("fail");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50/60 min-h-screen">
            <div className="mx-auto max-w-3xl px-6 pt-10 pb-12">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                    Etkinlik Katılım Formu
                </h1>
                <p className="mt-2 text-slate-600">
                    Aşağıdaki formu doldurarak seçtiğiniz etkinliğe kayıt oluşturabilirsiniz.
                </p>

                {/* durum mesajı */}
                {sent === "ok" && (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
                        Başvurunuz alınmıştır. 5 saniye içinde ana sayfaya yönlendirileceksiniz.
                    </div>
                )}
                {sent === "fail" && (
                    <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800">
                        Bir sorun oluştu. Lütfen tekrar deneyin.
                    </div>
                )}

                <form onSubmit={onSubmit} className="mt-6 grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    {/* Ad Soyad */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Ad Soyad</label>
                        <input
                            type="text"
                            value={data.fullName}
                            onChange={(e) => set("fullName", e.target.value)}
                            className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${errors.fullName ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200"
                                }`}
                            placeholder="Örn: Ayşe Yılmaz"
                        />
                        {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>}
                    </div>

                    {/* Öğrenci No & Telefon (2 kolon) */}
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Öğrenci No</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={data.studentId}
                                onChange={(e) => set("studentId", e.target.value)}
                                className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${errors.studentId ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200"
                                    }`}
                                placeholder="Örn: 190102345"
                            />
                            {errors.studentId && <p className="mt-1 text-xs text-rose-600">{errors.studentId}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Telefon</label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => set("phone", e.target.value)}
                                className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${errors.phone ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200"
                                    }`}
                                placeholder="+90 5XX XXX XX XX"
                            />
                            {errors.phone && <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* E-posta */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">E‑posta</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => set("email", e.target.value)}
                            className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${errors.email ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200"}`}
                            placeholder="ornek@st.uskudar.edu.tr"
                        />
                        {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                    </div>

                    {/* Etkinlik seçimi & Katılım türü (2 kolon) */}
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Etkinlik</label>
                            <select
                                value={data.eventId}
                                onChange={(e) => set("eventId", e.target.value)}
                                className={`mt-1 w-full rounded-xl border bg-white px-3 py-2 outline-none focus:ring-2 ${errors.eventId ? "border-rose-300 focus:ring-rose-200" : "border-slate-300 focus:ring-emerald-200"
                                    }`}
                            >
                                <option value="">Seçiniz…</option>
                                {events.map((ev) => (
                                    <option key={ev.id} value={ev.id}>
                                        {ev.title}
                                    </option>
                                ))}
                            </select>
                            {errors.eventId && <p className="mt-1 text-xs text-rose-600">{errors.eventId}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Katılım Türü</label>
                            <select
                                value={data.participation}
                                onChange={(e) => set("participation", e.target.value as FormData["participation"])}
                                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                            >
                                <option>Katılımcı</option>
                                <option>Gönüllü</option>
                                <option>Konuşmacı</option>
                            </select>
                        </div>
                    </div>

                    {/* Not */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Not</label>
                        <textarea
                            value={data.note}
                            onChange={(e) => set("note", e.target.value)}
                            rows={4}
                            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
                            placeholder="Varsa eklemek istediğiniz bilgiler… (örn. erişilebilirlik talebi, görev tercihi vb.)"
                        />
                    </div>

                    {/* KVKK / Onay */}
                    <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                        <input
                            type="checkbox"
                            checked={data.consent}
                            onChange={(e) => set("consent", e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
                        />
                        <span className={`text-sm ${errors.consent ? "text-rose-700" : "text-slate-600"}`}>
                            Kişisel verilerimin <strong>Etkinlik Katılım Süreçleri</strong> kapsamında işlenmesini kabul ediyorum.
                        </span>
                    </label>
                    {errors.consent && <p className="mt-1 -mb-2 text-xs text-rose-600">{errors.consent}</p>}

                    {/* actions */}
                    <div className="mt-2 flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-white shadow hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {loading ? "Gönderiliyor…" : "Kaydı Gönder"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setData(initial);
                                setErrors({});
                                setSent(null);
                            }}
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                        >
                            Temizle
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EtkinlikKatilim;