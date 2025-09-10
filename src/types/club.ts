// src/types/club.ts
export type CatKey = "teknoloji" | "kultur-sanat" | "sosyal" | "spor" | "akademik";

export type ClubDetail = {
    id: string;
    name: string;
    category: CatKey;
    faculty: string;
    members: number;
    events: number;
    instagram?: string;
    emailClub?: string;
    emailPresident?: string;
    president?: string;
    vicePresident?: string;
    advisor?: string;
    about?: string;
};