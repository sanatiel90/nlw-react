import '../styles/button.scss';

import { ButtonHTMLAttributes } from 'react';  //ButtonHTMLAttributes: ja possui todas as props HTML que um botao pode receber

//atribui a tipagem desse componente Button como ButtonHTMLAttributes, dizendo entre <> que é um elemento HTMLButtonElement
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>


export function Button(props: ButtonProps){   
    return(
        //usando spread operator para repassar todas as props recebidas como param para o elemento <button>
        <button className="button" {...props} />  
    )
}