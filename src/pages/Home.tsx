import { useNavigate } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss';
import { useAuth } from "../hooks/useAuth";


export function Home() {

    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateNewRoom(){  
        //se nao existir usuario logado, antes de direcionar a rota, fazer login
        if (!user){
            await signInWithGoogle();
        }      
        
        navigate('/rooms/new');         
    }
    
    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audidência em tempo-real</p>
            </aside>
            <main >
                <div className='main-content'>
                    <img src={logoImg} alt="Logo" />
                    <button onClick={handleCreateNewRoom}  className='create-rom'>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com Google
                    </button>
                    <div className='separator' >ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text" 
                            placeholder='Digite o código da sala'
                        />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>

        </div>
    )
}