import { createContext, useState, useEffect, ReactNode } from "react"; //contextos servem para compartilhar valores e modificadores de valores entre os componentes
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


//definindo tipagem do AuthContext, é um objeto chamado user do tipo UserType e uma funcao q retorna uma Promise<void> (pois é assincrona) chamada signInWithGoogle
//detalhe que o user pode ser undefined (quando usuario nao esta logado), entao precisa dizer isso
//essas informacoes vao poder ser compartilhadas via contexto
  type AuthContextType = {
    user: UserType | undefined;
    signInWithGoogle: () => Promise<void>;
  }
  
  type UserType = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextProviderProps = {
      children: ReactNode;
  }

  export const AuthContext = createContext({} as AuthContextType);

  export function AuthContextProvider(props: AuthContextProviderProps){

    const [user, setUser] = useState<UserType>(); //definindo, no estado, qual tipo sera user

    //useEffect: 1º param: funcao que sera executada; 2º param: array contendo as var que serao monitoradas, 
    //toda vez q a var é modificada, a funcao é disparada; deixando 2º param vazio, dispara a funcao uma unica vez
    useEffect(() => {
      const auth = getAuth();
      //vai monitorar quando ja houver um user logado ou uma mudanca de user
      //o onAuthStateChanged é um EVENTLISTENER, que fica ouvindo constantemente uma determinada informacao
      //sempre que um EVENTLISTENER for usado num useEffect, vc precisa retornar esse EVENTLISTENER numa var
      //nesse caso 'unsubscribe', e no final do useEffect, retornar uma funcao que chama esse 'unsubscribe',
      //para se DESCADASTRAR do EVENTLISTENER e evitar que a aplicacao continue chamando o EVENTLISTENER
      //quando sair desta tela
      const unsubscribe = auth.onAuthStateChanged(user => {
          //se existir usuario seta o usuario logado no estado
          if(user){
              const { displayName, photoURL, uid } = user;
  
              if(!displayName || !photoURL){
                throw new Error('Missing information from Google Acount');
              }
             
              setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
              });
          }        
      });
  
      return () => {
        unsubscribe();
      }
    }, []);
  
    async function signInWithGoogle() {
      //login com firebase
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
        
      if(result.user){
            const { displayName, photoURL, uid } = result.user;
    
            if(!displayName || !photoURL){
            throw new Error('Missing information from Google Acount');
            }
        
            setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
            });
        }
      
    }

      return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
      );
  }