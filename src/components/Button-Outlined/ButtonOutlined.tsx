import type React from 'react';
import './ButtonOutlined.scss';

type Props = {
    texto: string;
    onClick: () => void;
};

const ButtonOutlined: React.FC<Props> = ({onClick,texto}) => {
    return(
        <button className="button-outlined" onClick={onClick} >{texto}</button>
    );
}

export default ButtonOutlined;