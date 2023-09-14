'use client'
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "./clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export const fetchData =  () => {
  const [user] = useAuthState(auth);
  const [result, setResult] = useState<DocumentData | null>([])

  const docRef = doc(firestore, "users", `${user?.uid}`);

  // let result = null;
  let error = null;

  useEffect(()=> {
    const blab = async()=> {

      try {
        const docSnapshot = await getDoc(docRef);
        const docData = docSnapshot.data()
        if (docData !== undefined) {
          setResult(docData as DocumentData);
          console.log(docData.userLinks);
        } else {
          setResult(null);
        }
        console.log((await getDoc(docRef)).data()?.userLinks);
        
      } catch (e) {
        error = e;
      }
    }
    blab()
  }, [user])
  
  console.log(result);
  
  return {result, error}
};
