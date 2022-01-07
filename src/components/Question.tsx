import { Children, ReactNode } from 'react'; //ReactNode é uma tipagem usada para a prop children, indica q children pode receber qualquer contudo jsx
import '../styles/question.scss';

type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    isAnswered?: boolean;
    isHighLighted?: boolean;
    children?: ReactNode;
}



export function Question ({ content, author, isAnswered = false, isHighLighted = false, children }: QuestionsProps) {
    return (
        <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted && !isAnswered ? 'highlighted' : '' } `}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}