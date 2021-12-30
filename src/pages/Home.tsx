import { useNavigate } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss';
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from 'react';
import { getDatabase, get, ref, onValue, child } from 'firebase/database';


export function Home() {
    const [roomCode, setRoomCode] = useState('');

    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateNewRoom(){  
        //se nao existir usuario logado, antes de direcionar a rota, fazer login
        if (!user){
            await signInWithGoogle();
        }      
        
        navigate('/rooms/new');         
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return ;
        }

        //pega a instancia do db
        const db = getDatabase();

        //recuperando a DocumentReference do documento em questao, que é rooms/codigoDaRoom 
        const roomRef = ref(db, `rooms/${roomCode}`);
     
        //forma padrao da documentacao 9
        /*get(child(roomRef, `rooms/${roomCode}`)).then(snapshot => {
            if(!snapshot.exists()){
                alert('A sala informada não existe');
                return;
            }
        });*/

        //faz um get na referencia, para conseguir o snapshot
        const roomSnapshot = await get(roomRef);

        //se o snapshot nao existir...
        if (!roomSnapshot.exists()){
            alert('A sala informada não existe');
            return;
        }

        navigate(`rooms/${roomCode}`);

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
                    <form onSubmit={handleJoinRoom} >
                        <input 
                            type="text" 
                            placeholder='Digite o código da sala'
                            
                            value={roomCode}
                            onChange={event => setRoomCode(event.target.value)}
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