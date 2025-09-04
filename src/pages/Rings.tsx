import React from "react";
import rings from "../data/rings";

const Rings: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Ring Saatleri</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rings.map((route, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow p-6 flex flex-col"
                    >
                        <div className="mb-2">
                            <h2 className="text-xl font-semibold">{route.title}</h2>
                            {route.description && (
                                <p className="text-gray-600 mt-1">{route.description}</p>
                            )}
                        </div>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {route.times.map((time, tIdx) => (
                                <li
                                    key={tIdx}
                                    className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {time}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rings;