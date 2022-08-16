import { initializeApp } from 'firebase/app'
import {
    getAuth, signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getDatabase
} from "firebase/database"
// import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {

    constructor() {
        this.app = initializeApp(firebaseConfig)
        this.db = getDatabase(this.app)
        this.auth = getAuth();
        this.isLogged = false;
        this.credentials =null;
    }

    // *** AUTH API ***
    async doCreateUserWithEmailAndPassword(email, password) {
        try {
           //implemente aqui a função para criar um usuário
           throw new Error("Função indisponível") //remova essa linha
        } catch (error) {
            console.error(error.message)
            throw error;
        }
    }

    async doSignInWithEmailAndPassword(email, password) {
        try {
            //console.error([email, password])
            /**
            Quando o usuário estiver logado atribua o valor TRUE
            ao atributo this.isLogged e as credenciais ao atributo this.credentials
            */
           //implemente aqui função logar o usuario

            this.credentials = await signInWithEmailAndPassword(this.auth,email,password)
            if(this.credentials)
            this.isLogged = true
            console.error(this.credentials)
            return this.credentials.user
           //throw new Error("Função Indisponível!!") //remova essa linha
        } catch (error) {
            console.error(error.message)
            throw error;
        }
    }

    doSignOut = () => {
    };
}

export default Firebase;
