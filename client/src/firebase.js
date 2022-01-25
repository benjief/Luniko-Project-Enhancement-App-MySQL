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
// var uid = "";
// var firstName = "";
// var lastName = "";
// var email = "";

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

const getUIDs = async () => {
    // Pull all UIDs from the MySQL DB
    try {
        await Axios.get("http://localhost:3001/get-uids", {
        }).then((response) => {
            return response.data;
        });
    } catch (err) {
        console.log(err);
    }
};

const writePersonnelToDB = async (uid, firstName, lastName, email) => {
    // Add the new user to the MySQL DB
    try {
        await Axios.post("http://localhost:3001/create", {
            uid: uid,
            firstName: firstName,
            lastName: lastName,
            email: email
        });
    } catch (err) {
        console.log(err);
    }
};

// Google authentication
const googleProvider = new GoogleAuthProvider();
const loginWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;

        let uidList = [];

        uidList = await getUIDs(user);
        await writePersonnelToDB(user.uid, user.displayName.split(" ")[0],
            user.displayName.split(" ")[1], user.email).then(() => {
                console.log("Personnel written to DB!");
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

        // Add the new user to the MySQL DB
        await writePersonnelToDB(user.uid, name.split(" ")[0], name.split(" ")[1], email = user.email).then(() => {
            console.log("Personnel written to DB!")
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