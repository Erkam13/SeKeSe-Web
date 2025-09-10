
import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Building2,
    Clock,
    Send,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

/**
 * Contact
 * - Solda iletişim bilgileri (adres, telefon, e‑posta, mesai saatleri)
 * - Sağda erişilebilir bir iletişim formu (back-end yok; sadece ekranda onay gösterir)
 * - Altta kampüs haritası (Google Maps embed)
 *
 * Notlar:
 * - Form submit → sayfa yenilenmeden, basit doğrulama ve başarı/uyarı mesajı gösterir.
 * - Hiçbir e‑posta gönderimi yapılmaz; yalnızca "Başvurunuz/mesajınız alındı" bildirimi gösterilir.
 */

type FormState = {
    name: string;
    email: string;
    subject: string;
    department: string;
    message: string;
    kvkk: boolean;
};

const initialState: FormState = {
    name: "",
    email: "",
    subject: "",
    department: "",
    message: "",
    kvkk: false,
};

const Contact: React.FC = () => {
    const [form, setForm] = React.useState<FormState>(initialState);
    const [status, setStatus] = React.useState<"idle" | "error" | "success">("idle");
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const onChange =
        (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const value = field === "kvkk" && "checked" in e.target ? (e.target as HTMLInputElement).checked : e.target.value;
            setForm((s) => ({ ...s, [field]: value as any }));
        };

    const validate = (): boolean => {
        const errs: Record<string, string> = {};
        if (!form.name.trim()) errs.name = "Ad Soyad zorunludur.";
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = "Geçerli bir e‑posta giriniz.";
        if (!form.subject.trim()) errs.subject = "Konu zorunludur.";
        if (!form.message.trim() || form.message.trim().length < 10)
            errs.message = "Mesaj en az 10 karakter olmalıdır.";
        if (!form.kvkk) errs.kvkk = "KVKK aydınlatma metnini onaylayınız.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("idle");

        if (!validate()) {
            setStatus("error");
            return;
        }

        // Sunucuya gönderim YOK. Sadece başarı mesajı gösteriyoruz.
        setStatus("success");
        // Formu temizle
        setForm(initialState);
    };

    return (
        <main className="bg-gray-50/60 min-h-screen">
            {/* Başlık */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                        İletişim
                    </h1>
                    <p className="mt-1 text-slate-600">
                        Sorularınız ve geri bildirimleriniz için bize ulaşın. Formu doldurun; ekibimiz en kısa
                        sürede size dönüş yapsın.
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-8 grid gap-8 lg:grid-cols-5">
                {/* Sol sütun: iletişim bilgileri */}
                <aside className="lg:col-span-2 space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-extrabold tracking-tight text-slate-900">İletişim Bilgileri</h2>
                        <ul className="mt-4 space-y-3 text-sm text-slate-700">
                            <li className="flex gap-3">
                                <Building2 className="h-5 w-5 text-emerald-700 mt-0.5" />
                                <div>
                                    <div className="font-semibold">Sağlık Kültür ve Spor Daire Başkanlığı</div>
                                    <div className="text-slate-600">Üsküdar Üniversitesi, Altunizade Kampüsü</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <MapPin className="h-5 w-5 text-emerald-700 mt-0.5" />
                                <div>Mah. Haluk Turksoy Sk. No:14, Üsküdar / İstanbul</div>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="h-5 w-5 text-emerald-700 mt-0.5" />
                                <a href="tel:+902123000000" className="hover:underline">+90 (212) 300 00 00</a>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="h-5 w-5 text-emerald-700 mt-0.5" />
                                <a href="mailto:sks@uskudar.edu.tr" className="hover:underline">sks@uskudar.edu.tr</a>
                            </li>
                            <li className="flex gap-3">
                                <Clock className="h-5 w-5 text-emerald-700 mt-0.5" />
                                <div>Hafta içi 09:00 – 17:00</div>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-sm font-extrabold tracking-tight text-slate-900">Kampüs Haritası</h3>
                        <div className="mt-3 aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200">
                            <iframe
                                title="Üsküdar Üniversitesi Harita"
                                className="h-full w-full"
                                referrerPolicy="no-referrer-when-downgrade"
                                loading="lazy"
                                src="https://www.google.com/maps?q=Üsküdar%20Üniversitesi&output=embed"
                            />
                        </div>
                    </div>
                </aside>

                {/* Sağ sütun: iletişim formu */}
                <section className="lg:col-span-3">
                    <form
                        onSubmit={onSubmit}
                        className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
                        noValidate
                    >
                        <h2 className="text-lg font-extrabold tracking-tight text-slate-900">Bize Yazın</h2>

                        {/* Durum mesajı */}
                        {status === "success" && (
                            <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
                                <CheckCircle2 className="h-5 w-5 mt-0.5" />
                                <p className="text-sm">
                                    Mesajınız alındı. En kısa sürede sizinle e‑posta üzerinden iletişime geçeceğiz.
                                </p>
                            </div>
                        )}
                        {status === "error" && (
                            <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">
                                <AlertCircle className="h-5 w-5 mt-0.5" />
                                <p className="text-sm">Lütfen formdaki hataları düzeltin.</p>
                            </div>
                        )}

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700">Ad Soyad</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={onChange("name")}
                                    className={`mt-1 h-11 w-full rounded-xl border px-3 outline-none focus:ring-2 ${errors.name ? "border-rose-300 focus:ring-rose-400/60" : "border-slate-200 focus:ring-emerald-500/60"
                                        }`}
                                    placeholder="Adınız Soyadınız"
                                />
                                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700">E‑posta</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={onChange("email")}
                                    className={`mt-1 h-11 w-full rounded-xl border px-3 outline-none focus:ring-2 ${errors.email ? "border-rose-300 focus:ring-rose-400/60" : "border-slate-200 focus:ring-emerald-500/60"
                                        }`}
                                    placeholder="ornek@posta.com"
                                />
                                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700">Konu</label>
                                <input
                                    type="text"
                                    value={form.subject}
                                    onChange={onChange("subject")}
                                    className={`mt-1 h-11 w-full rounded-xl border px-3 outline-none focus:ring-2 ${errors.subject ? "border-rose-300 focus:ring-rose-400/60" : "border-slate-200 focus:ring-emerald-500/60"
                                        }`}
                                    placeholder="Kısa konu başlığı"
                                />
                                {errors.subject && <p className="mt-1 text-xs text-rose-600">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700">Birim</label>
                                <select
                                    value={form.department}
                                    onChange={onChange("department")}
                                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-emerald-500/60"
                                >
                                    <option value="">Seçiniz (opsiyonel)</option>
                                    <option value="sks">SKS (Genel)</option>
                                    <option value="kulupler">Öğrenci Kulüpleri</option>
                                    <option value="spor">Spor Tesisleri</option>
                                    <option value="saglik">Sağlık Hizmetleri</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700">Mesaj</label>
                                <textarea
                                    value={form.message}
                                    onChange={onChange("message")}
                                    className={`mt-1 min-h-[140px] w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${errors.message ? "border-rose-300 focus:ring-rose-400/60" : "border-slate-200 focus:ring-emerald-500/60"
                                        }`}
                                    placeholder="İletmek istediğiniz mesaj…"
                                />
                                {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="inline-flex items-start gap-2 select-none">
                                    <input
                                        type="checkbox"
                                        checked={form.kvkk}
                                        onChange={onChange("kvkk")}
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="text-sm text-slate-700">
                                        KVKK aydınlatma metnini okudum ve kişisel verilerimin bu kapsamda işlenmesine onay veriyorum.
                                    </span>
                                </label>
                                {errors.kvkk && <p className="mt-1 text-xs text-rose-600">{errors.kvkk}</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-white font-semibold shadow-sm hover:bg-emerald-700 transition"
                            >
                                <Send className="h-4 w-4" />
                                Gönder
                            </button>
                        </div>
                    </form>
                </section>
            </section>
        </main>
    );
};

export default Contact;
