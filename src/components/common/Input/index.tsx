import "./style.css";
import React, { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
}

export default function InputWrapper({ children }: Props) {
  return <div className="input">{children}</div>;
}
export interface PropsTitle extends Props {
  name: string;
  style?: React.CSSProperties;
}

function Title({ children, name, style = {} }: PropsTitle) {
  return (
    <div className="input-title" style={{ ...style }}>
      {children}
      {name}
    </div>
  );
}

export interface PropsInput extends Props {
  value: string | number;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

function InputText({ value, error, onChange, style = {} }: PropsInput) {
  return (
    <>
      <div className="input-field" style={{ ...style }}>
        <input value={value} onChange={onChange} style={{ flex: 1 }} />
      </div>
      {!!error && <p className="input-description --error">{error}</p>}
    </>
  );
}

function InputDate({ value, error, onChange, style = {} }: PropsInput) {
  return (
    <>
      <div className="input-field --date" style={{ ...style }}>
        <input type="date" value={value} onChange={onChange} />
      </div>
      {!!error && <p className="input-description --error">{error}</p>}
    </>
  );
}

export const Input = { Title, InputText, InputDate };
