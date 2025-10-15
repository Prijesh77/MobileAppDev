// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2b35rgI4QV8FgPN3HUWUyEY_S1RaFOqo",
  authDomain: "fir-70e73.firebaseapp.com",
  projectId: "fir-70e73",
  storageBucket: "fir-70e73.firebasestorage.app",
  messagingSenderId: "806022881991",
  appId: "1:806022881991:web:c5b084e194fc0cc671d4e2",
  measurementId: "G-HPB8VG0MHS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
