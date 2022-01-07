import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { Question } from "../components/Question";
import { RoomCode } from '../components/RoomCode';
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import '../styles/room.scss'




type RoomParams = {
    id: string;
}

export function AdminRoom(){

    const { user } = useAuth();
    const navigate = useNavigate();

    //hook useParams do react-router doom permite pegar os parametros enviados na requisicao, o <RoomParams> indica o tipo desses params
    const params = useParams<RoomParams>(); 
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');
    
    const { questions, title } = useRoom(roomId);

    function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
            remove(ref(getDatabase(), `rooms/${roomId}/questions/${questionId}`)); //removendo do bd firebase 9
        }
    }
   
    function handleEndRoom(){
        if(window.confirm('Deseja encerrar esta sala?')){
            //atualizando um novo valor no firebase
            update(ref(getDatabase(), `rooms/${roomId}`), {
                endedAt: new Date()
            });

            navigate('/');
        }
    }

    function handleCheckQuestionAsAnsewered(questionId: string){
        update(ref(getDatabase(), `rooms/${roomId}/questions/${questionId}`), {
            isAnswered: true
        });
    }

    function handleHighLightQuestion(questionId: string){
        update(ref(getDatabase(), `rooms/${roomId}/questions/${questionId}`), {
            isHighlighted: true
        });
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo" />
                    <div>
                        <RoomCode code={roomId || 'not informed'} />
                        <Button isOutlined onClick={handleEndRoom} >Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala { title }</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>               

                <div className="questions-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighLighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button type="button" onClick={() => handleCheckQuestionAsAnsewered(question.id)} >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        
                                        <button type="button" onClick={() => handleHighLightQuestion(question.id)} >
                                            <img src={answerImg} alt="Dar destaque à pergunta" />
                                        </button>
                                    </>
                                )}

                                <button type="button" onClick={() => handleDeleteQuestion(question.id)} >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>                           

                <Toaster />
            </main>
        </div>
    );
}