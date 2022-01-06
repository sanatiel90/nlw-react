import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from "../hooks/useAuth";

import '../styles/room.scss'

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}


type RoomParams = {
    id: string;
}

export function Room(){

    const { user } = useAuth();

    //hook useParams do react-router doom permite pegar os parametros enviados na requisicao, o <RoomParams> indica o tipo desses params
    const params = useParams<RoomParams>(); 
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        //pega a ref no banco
        const roomRef = ref(getDatabase(), `rooms/${roomId}`);
        //retornando os valores presentes na lista e monitorando as mudanças do msm atraves do onValue
        onValue(roomRef, (snapshot) => {            
            //fazendo essa parada doida pq o firebase retorna as questions como um Object, e precisamos de um Array
            const databaseRoom = snapshot.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) =>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            });                        

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);

        });


    }, [roomId]);

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();

        if(newQuestion.trim() === ''){
            //msg de validacao
            return;
        }        


        if(!user){
            toast.error('Você precisa estar logado para fazer uma pergunta!');
            throw new Error('Você precisa estar logado para fazer uma pergunta'); //tip: usar lib react-hot-toast para criar Toast
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false
        }

        //gravando no banco de dados Firebase 9
        const newQuestionRef = push(ref(getDatabase(), `rooms/${roomId}/questions`))
        set(newQuestionRef, question);
        
        setNewQuestion('');        

    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo" />
                    <RoomCode code={roomId || 'not informed'} />
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala { title }</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder='O que você quer perguntar'
                        value={newQuestion}
                        onChange={event => setNewQuestion(event.target.value)}
                    />

                    <div className='form-footer'>
                        { user ? (
                          <div className="user-info">
                              <img src={user.avatar} alt={user.name} />
                              <span>{user.name}</span>
                          </div>  
                        ) : (
                            <span>Para enviar uma pergunta, <button>Faça seu login</button>.</span>
                        ) }                        
                        
                        <Button type='submit' disabled={!user} >Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}                            

                <Toaster />
            </main>
        </div>
    );
}