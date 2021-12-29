//na pasta hooks ficam os hooks pessoais que criamos
//este é para encapsular o AuthContext

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth(){    
    return useContext(AuthContext);
}