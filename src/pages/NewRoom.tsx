import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from "react";

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

import { getDatabase, push, ref, set } from "firebase/database";

import '../styles/auth.scss';
import { timeStamp } from 'console';

export function NewRoom() {
    const { user } = useAuth(); //no do cara ta comentada essa linha
    const navigate = useNavigate();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }
        
        //escrevendo dados (versao 9 do Firebase)
        const db = getDatabase(); //pegando a conexao com firebase         
        const roomsListRef = ref(db, 'rooms'); //pegando a ref (documento) em questao, no caso 'rooms'
        const newRoomRef = push(roomsListRef); //abrindo um novo espaco nesse Ref
        //setando o novo valor que sera gravado no banco
        set(newRoomRef, {
            title: newRoom,
            authorId: user?.id
        });

        const roomId = newRoomRef.key; //a nova ref tera uma key unica para identifica-la
        
        navigate(`/rooms/${roomId}`);        
        
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
                    <h2>Criar uma nova sala</h2>
                    <h1>{user?.name}</h1>
                    <form onSubmit={handleCreateRoom} >
                        <input 
                            type="text" 
                            placeholder='Digite o código da sala'
                            value={newRoom}
                            onChange={event => setNewRoom(event.target.value)}
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to={"/"} >Clique aqui</Link>
                    </p>
                </div>
            </main>

        </div>
    )
}