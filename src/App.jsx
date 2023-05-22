import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import firebaseConfig from "../dbConfig";
import { useState } from "react";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log("This is app" + app.options.apiKey)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// console.log("This is DB" + db.app.options.apiKey)

function App() {
  const updateUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        author: author,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Add a new document in collection "cities"
  async function addCity() {
    const cityRef = doc(db, "cities", "BJ");
    setDoc(
      cityRef,
      { name: "Beijung", state: "Xianping", country: "China" },
      { merge: true }
    );
  }
  async function addTestData() {
    const docData = {
      stringExample: "Hello world!",
      booleanExample: true,
      numberExample: 3.14159265,
      dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
      arrayExample: [5, true, "hello"],
      nullExample: null,
      objectExample: {
        a: 5,
        b: {
          nested: "foo",
        },
      },
    };
    const dataRef = doc(db,"data","one")
    await setDoc(dataRef, docData);
  }

  async function getDbData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  return (
    <>
      <form>
        <label>Author:</label>
        <button onClick={updateUser}>Update</button>
      </form>
      <button onClick={getDbData}>Get DB Data</button>
      <button onClick={addCity}>Add City</button>
      <button onClick={addTestData}>Add Test Data</button>
    </>
  );
}

export default App;
