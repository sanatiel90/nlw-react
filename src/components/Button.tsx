import '../styles/button.scss';

import { ButtonHTMLAttributes } from 'react';  //ButtonHTMLAttributes: ja possui todas as props HTML que um botao pode receber

//atribui a tipagem desse componente Button como ButtonHTMLAttributes, dizendo entre <> que é um elemento HTMLButtonElement
//alem disso coloca o & {} para indicar q alem das props padrao de um button, vai receber mais propriedades (definidas dentro do obj)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

//desestruturando props: pegando a prop isOutlined e colocando o resto das propriedades no ...props (spread operator) 
export function Button({ isOutlined, ...props }: ButtonProps){   
    return(
        //usando spread operator para repassar todas as props recebidas como param para o elemento <button>
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props} 
        />  
    )
}