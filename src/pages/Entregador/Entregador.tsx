import type React from 'react';
import './Entregador.scss';

import { Outlet } from 'react-router-dom';

type Props = {

};

const Entregador: React.FC<Props> = () => {
    return(
    <main className="conteudo">
          <Outlet />
    </main>
    );
}

export default Entregador;