

import React from "react";

const Unilife: React.FC = () => {
    const magazineUrl = "https://online.fliphtml5.com/uskudarsks/dhqh/#p=1";

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">ÜniLife Dergisi</h1>

            <p className="text-slate-600">
                ÜniLife dergisinin en güncel sayısını aşağıda görüntüleyebilir veya{" "}
                <a
                    href={magazineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 font-semibold hover:underline"
                >
                    tam sayfada açabilirsiniz
                </a>.
            </p>

            <div className="relative aspect-[4/3] h-auto max-h-[800px] overflow-hidden rounded-2xl shadow-lg">
                <iframe
                    src={magazineUrl}
                    className="w-full h-full"
                    title="ÜniLife Dergisi Önizleme"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default Unilife;