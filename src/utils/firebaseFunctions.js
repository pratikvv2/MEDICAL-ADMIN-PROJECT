import { FIRESTORE } from "@/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getAllDocsFromCollection = async (collectionName) => {
    const querySnapshot = await getDocs(collection(FIRESTORE, collectionName));
    let documents = []
    querySnapshot.forEach((doc) => {
        documents.push({
            id: doc.id,
            ...doc.data(),
        })

    });
    return documents;
}

export const getDataFromDocumentByID = async (collectionName, docId) => {
    const docRef = doc(FIRESTORE, collectionName, docId);
    const fetchedDoc = await getDoc(docRef);
    return fetchedDoc.data();
}