import type React from "react";
import './ButtonPrimary.scss';
type Props = {
texto: string;
onClick: () => void;
};

const ButtonPrimary: React.FC<Props> = ({texto,onClick}) => {
    return(
            <button className="button-primary" onClick={onClick} >{texto}</button>
    );
};

export default ButtonPrimary;
