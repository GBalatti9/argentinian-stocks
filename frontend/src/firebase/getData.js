import { onSnapshot, query, getDoc, collection, getDocs, doc } from "firebase/firestore";
import { FirebaseApp, FirebaseDB } from "./config";

const accionesRef = collection(FirebaseDB, 'acciones') ;

let accionesArray = [];

export const changeListener = () => {
    console.log('cambio');
}
onSnapshot(accionesRef, ( snapshot ) => {
    accionesArray = [];
    snapshot.forEach(( doc ) => {
        accionesArray.push(doc.data());
    })
    console.log({accionesArray});
    return accionesArray;
})


