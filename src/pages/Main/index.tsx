// import { Input } from "../../components/common/Input";
import "./style.css";
import InputWrapper, { Input } from "../../components/common/Input";

export interface Props {
  style?: React.CSSProperties;
}

export function Main({ style }: Props) {
  return (
    <body className="wrapper" style={{ ...style }}>
      <div className="card">
        <p className="header">Challenge Opah</p>
        <InputWrapper>
          <Input.Title name="Nome" />
          <Input.InputText value={""} onChange={() => {}} />
        </InputWrapper>
        <InputWrapper>
          <Input.Title name="E-mail" />
          <Input.InputText value={""} onChange={() => {}} />
        </InputWrapper>
        <InputWrapper>
          <Input.Title name="Cpf" />
          <Input.InputText value={""} onChange={() => {}} />
        </InputWrapper>
        <InputWrapper>
          <Input.Title name="Data de nascimento" />
          <Input.InputDate
            value={""}
            onChange={(e: any) => {
              console.log({ e: e.target.value });
            }}
          />
        </InputWrapper>
        <div className="button-wrapper">
          <a className="button">
            <strong>salvar</strong>
          </a>
        </div>
      </div>
    </body>
  );
}
