import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    collection, 
    doc, 
    query, 
    orderBy, 
    getDocs, 
    setDoc 
} from 'firebase/firestore/lite';

import { firebaseConfig } from '../constants/firebase';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getMenu() {
    const menuCollection = collection(db, 'menu');
    const menuQuery = query(menuCollection, orderBy('category'))
    const menuSnapshot = await getDocs(menuQuery);
    const menu = menuSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    return menu;
}

//docPath is collectionName/docID
export async function addMenu(menuObj, docPath){
    const docRef = doc(db, docPath)
    try {
        await setDoc(docRef, menuObj, {merge: true});
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}