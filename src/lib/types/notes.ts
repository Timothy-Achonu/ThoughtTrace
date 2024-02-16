import { FieldValue } from "firebase/firestore";


export type NoteType  =  {
    body: string;
    user_id: string;
    id?: string;
    createdAt?: string | FieldValue;
    updatedAt?: string;
}