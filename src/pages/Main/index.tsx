import { useState } from "react";
import "./style.css";
import { Card } from "../../components/common/Card";
import { CreatePersonForm } from "../../components/CreatePersonForm";
import { ListOfPersons } from "../../components/ListOfPersons";
import { Icon } from "@iconify/react";

export interface Props {
  style?: React.CSSProperties;
}

/**
 * Decidi não incorporar bibliotecas de formulários no projeto,
 * uma vez que este se trata de um formulário simples, e,
 * portanto, não identifiquei a necessidade de sua utilização.
 */

export function Main({ style }: Props) {
  const [toggleCardContent, setToggleCardContent] = useState(false);

  return (
    <body className="wrapper" style={{ ...style }}>
      <Card className={toggleCardContent ? "--lg" : ""}>
        <div className="header-wrapper">
          <div className="header-title">
            <p>Challenge Opah</p>
          </div>
          <span
            className="icon"
            data-tooltip-id="info-tooltip"
            data-tooltip-content={`ir para ${
              toggleCardContent ? "o formulario" : "a lista"
            }`}
            onClick={() => setToggleCardContent((oldState) => !oldState)}
          >
            <Icon inline icon="uil:exchange" />
          </span>
        </div>
        {!toggleCardContent ? <CreatePersonForm /> : <ListOfPersons />}
      </Card>
    </body>
  );
}
