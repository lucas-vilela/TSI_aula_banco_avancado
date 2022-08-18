import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth, signInWithEmailAndPassword,deleteUser, signOut
} from 'firebase/auth';
import {
    getDatabase, set,ref
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
           
            createUserWithEmailAndPassword(this.auth,email,password)
            .then((userCredential)=>{
                console.log('Criado no autentication.')
                this.credentials = userCredential.user;
                console.log(this.credentials)  
                //fazer com o set concatenando com o auth.uid como chave
                set(ref(this.db,'users/'+ this.credentials.uid),{'email':this.credentials.email,'ID_Authentication':this.credentials.uid})
                .then(()=>{
                    console.log('Armazenado no realtime.')
                })
                .catch(e=>{
                    console.log('Erro na parte do realtime: ' + e)
                    //this.credentials = null
                    deleteUser(this.auth.currentUser)
                    .then(()=>{
                        console.log('Usuário deletado do athentication.')
                        this.credentials = null
                    })
                    .catch((e)=>{
                        console.log('Erro ao deletar usuário do authentication: '+e)
                    })
                })
            })
            .catch(e=>{
                console.log(e.message)
                console.log('Erro na parte do althentication: ' + e)
            })

           //throw new Error("Função indisponível") //remova essa linha
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
        signOut(this.auth)
    };
}

export default Firebase;
