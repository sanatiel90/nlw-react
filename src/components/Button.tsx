import { useState } from "react";

//definindo props/atributos que o Button pode receber, com suas respectivas tipagens
type ButtonProps = {
    text?: string;
    children?: string;
}

export function Button(props: ButtonProps){
    const [counter, setCounter] = useState(0);

    
    function increment(){
        setCounter(counter + 1);
    }

    return(
        <button onClick={increment}>{counter}</button>
    )
}