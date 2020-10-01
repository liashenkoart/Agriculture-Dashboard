import Firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import config from "./config"
const firebaseConfig = config.firebase
// Initialize Firebase
const fire = Firebase.initializeApp(firebaseConfig)
export default fire
