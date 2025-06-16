import * as React from 'react';
import './Input.scss';
export type Props = {
    type?: string;
    placeholder?: string;
    value: string;
    title?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({type = 'text',placeholder,value,onChange,title}) => {
  return (
        <div className="input">
          <div className="title">
            <p>{title}</p>
          </div>
        <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        />
        </div>
  );
}

export default Input;
