import type React from "react";
import './Loja.scss';

import { Outlet } from "react-router-dom";

type Props = {

};

const Loja: React.FC<Props> = () => {
    return(
         <main className="conteudo">
               <Outlet />
         </main>
    );
}

export default Loja;