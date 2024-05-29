import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVEG7vq53puHrrbxXmB1KYbUR8nc4OHUo",
  authDomain: "stone-view.firebaseapp.com",
  projectId: "stone-view",
  storageBucket: "stone-view.appspot.com",
  messagingSenderId: "472883192474",
  appId: "1:472883192474:web:7320208376975456bdb523"
};

const app = initializeApp(firebaseConfig);
export default app;