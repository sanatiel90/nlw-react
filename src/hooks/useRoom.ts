import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

//quando o tipo é um objeto, usar o tipo Record, no padrao Record<keyType, valueType>
type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>



type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId?: string){
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');


    useEffect(() => {
        //pega a ref no banco
        const roomRef = ref(getDatabase(), `rooms/${roomId}`);
        //retornando os valores presentes na lista e monitorando as mudanças do msm atraves do onValue
        onValue(roomRef, (snapshot) => {            
            //fazendo essa parada doida pq o firebase retorna as questions como um Object, e precisamos de um Array
            //Object.entries para transformar um obj com key/value em Array e Object.values para transmformar um obj com apenas values em array
            const databaseRoom = snapshot.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) =>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],  
                }
            });                        

            console.log(databaseRoom.title);
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);

        });


        //removendo o listener
        return () => {
            off(roomRef);
        }

    }, [roomId, user?.id]);

    return { questions, title };

}