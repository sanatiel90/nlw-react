import { Link } from 'react-router-dom'
import { FormEvent, useState } from "react";

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

import { getDatabase, ref, set } from "firebase/database";

import '../styles/auth.scss';

export function NewRoom() {
    const { user } = useAuth(); //no do cara ta comentada essa linha

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === '') {
            return;
        }

        //pegando a conexao com firebase
        const db = getDatabase();

        //escrevendo dados (versao 9 do Firebase)
        set(ref(db, 'rooms'), {
            title: newRoom,
            authorId: user?.id
        });

        

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