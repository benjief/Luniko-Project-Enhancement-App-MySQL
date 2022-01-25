import Axios from "axios";
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";
// import {
//     getFirestore,
//     query,
//     getDocs,
//     collection,
//     where,
//     addDoc,
// } from "firebase/firestore";

// Variable definition
var uid = "";
var firstName = "";
var lastName = "";
var email = "";

const firebaseConfig = {
    apiKey: "AIzaSyAQPWZwAjHAaT-9cSvGpyYexkiZ0NSPP70",
    authDomain: "luniko-enhancement-mysql.firebaseapp.com",
    projectId: "luniko-enhancement-mysql",
    storageBucket: "luniko-enhancement-mysql.appspot.com",
    messagingSenderId: "597214047017",
    appId: "1:597214047017:web:4c445b1f855b3b53c4a538",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google authentication
const googleProvider = new GoogleAuthProvider();
const loginWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;

        var uidList = [];
        // Pull all UIDs from the MySQL DB
        Axios.get("http://localhost:3001/get-uids", {
        }).then((response) => {
            uidList = response.data;
            if (!uidList.includes(user.id)) {
                uid = user.id;
                firstName = user.displayName.split(" ")[0];
                lastName = user.displayName.split(" ")[1];
                email = user.email;

                // Add the new user to the MySQL DB
                Axios.post("http://localhost:3001/create", {
                    uid: uid,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }).then(() => {
                    console.log("New user added!");
                });
            }
        });

        // const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // const docs = await getDocs(q);

        // await addDoc(collection(db, "users"), {
        //     uid: user.uid,
        //     name: user.displayName,
        //     authProvider: "google",
        //     email: user.email,
        // });

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Standard Authentication
const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Register with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        uid = user.id;
        firstName = user.displayName.split(" ")[0];
        lastName = user.displayName.split(" ")[1];
        email = user.email;

        // Add the new user to the MySQL DB
        Axios.post("http://localhost:3001/create", {
            uid: uid,
            firstName: firstName,
            lastName: lastName,
            email: email
        }).then(() => {
            console.log("New user added!");
        });

        //   await addDoc(collection(db, "users"), {
        //     uid: user.uid,
        //     name,
        //     authProvider: "local",
        //     email,
        //   });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Send a password reset link to an email address
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Logout
const logout = () => {
    signOut(auth);
};

export {
    auth,
    loginWithGoogle,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
};