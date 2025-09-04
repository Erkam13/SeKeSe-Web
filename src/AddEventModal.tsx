import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { title: string; date: string; time: string; type: string }) => void;
};

const AddEventModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");
    const [type, setType] = React.useState("Seminer");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!title || !date) return;
        onSave({ title, date, time, type });
        onClose();
        setTitle("");
        setDate("");
        setTime("");
        setType("Seminer");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 shadow-xl">
                <h2 className="text-xl font-bold">Yeni Etkinlik Ekle</h2>
                <input
                    type="text"
                    placeholder="Etkinlik Adı"
                    className="w-full border rounded p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="date"
                    className="w-full border rounded p-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="time"
                    className="w-full border rounded p-2"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <select
                    className="w-full border rounded p-2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option>Seminer</option>
                    <option>Konferans</option>
                    <option>Tiyatro</option>
                    <option>Kulüp Etkinliği</option>
                    <option>Spor</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-2 rounded bg-gray-200">
                        Vazgeç
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-3 py-2 rounded bg-emerald-600 text-white"
                    >
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;