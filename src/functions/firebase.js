import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    collection, 
    doc, 
    query, 
    orderBy, 
    getDocs, 
    setDoc,
    deleteDoc
} from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { firebaseConfig } from '../constants/firebase';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function login(secret){
   let cred = await signInWithEmailAndPassword(auth, 'rayhomecooking@gmail.com', secret)
   return cred.user;
}

export function isLoggedIn(){
    return auth.currentUser !== null;
}

export function logout(){
    signOut(auth)
        .then(() => console.log('signed out'))
        .catch(e => alert(e))
}

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
export async function modifyMenu(menuObj, docPath){
    const docRef = doc(db, docPath)
    try {
        return await setDoc(docRef, menuObj, {merge: true});
      } catch (e) {
        console.error("Error modifying menu: ", e);
      }
}

//docPath is collectionName/docID
export async function deleteMenu(docPath){
    const docRef = doc(db, docPath)
    try {
        return await deleteDoc(docRef);
      } catch (e) {
        console.error("Error deleting menu: ", e);
      }
}