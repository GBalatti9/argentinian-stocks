import { onSnapshot, collection } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";
import { useEffect, useState } from "react";

export const firebaseHook = () => {

    const [stocks, setStocks] = useState({
        loading: false,
        data: [],
    });

    useEffect(() => {
        const accionesRef = collection(FirebaseDB, 'acciones');

        setStocks((prevStocks) => ({
            ...prevStocks,
            loading: true,
            data: []
        }));

        const unsubscribe = onSnapshot(accionesRef, (snapshot) => {
            const newStocks = [];
            snapshot.forEach((doc) => {
                newStocks.push(doc.data());
            });

            setStocks({
                loading: false,
                data: newStocks,
            });
        });

        return () => unsubscribe();
    }, []);

    return {
        stocks
    }
}


