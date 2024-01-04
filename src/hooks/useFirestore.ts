import { db } from "@/firebase/config";
import {
    CollectionReference,
    DocumentData,
    Query,
    QueryCompositeFilterConstraint,
    collection,
    onSnapshot,
    query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface DocumentsType {
    id: string;
    [key: string]: any;
}

const useFirestore = (
    collectionName: string,
    conditions?: QueryCompositeFilterConstraint
) => {
    const [documents, setDocuments] = useState<Array<DocumentsType>>([]);
    useEffect(() => {
        let collectionRef:
            | CollectionReference<DocumentData, DocumentData>
            | Query<DocumentData, DocumentData> = collection(
            db,
            collectionName
        );

        if (conditions) {
            collectionRef = query(collectionRef, conditions);
        }

        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const docs = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(docs);
        });

        return () => unsubscribe();
    }, [collectionName, conditions]);

    return documents;
};

export default useFirestore;
