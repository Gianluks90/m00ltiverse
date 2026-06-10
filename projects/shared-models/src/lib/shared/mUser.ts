import { Timestamp } from "firebase/firestore";
import { ROLE } from "./role";

export interface mUser {
    uid: string;
    displayName: string;
    nickname: string;
    photoURL: string;
    customPhotoURL?: string;
    role: ROLE;

    friends: string[];
    bio: string;
    
    socialX: string;
    socialTelegram: string;
    socialInstagram: string;
    socialThreads: string;
    socialFacebook: string;

    publicProfile: boolean;
    shareUpdates: boolean;

    createdAt: Timestamp;
    updatedAt: Timestamp;
    }