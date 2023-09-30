import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import "./style.css";
import InputWrapper, { Input } from "../../components/common/Input";
import {
  InsertPerson,
  PipedreamService,
} from "../../services/pipedream.service";

export interface Props {
  style?: React.CSSProperties;
}

interface Values {
  value: string;
  error: string | null;
}

export interface FormValues {
  name: Values;
  email: Values;
  cpf: Values;
  birth_date: Values;
}

const initial_values = {
  name: { value: "", error: null },
  email: { value: "", error: null },
  cpf: { value: "", error: null },
  birth_date: { value: "", error: null },
};

/**
 * Decidi não incorporar bibliotecas de formulários no projeto,
 * uma vez que este se trata de um formulário simples, e,
 * portanto, não identifiquei a necessidade de sua utilização.
 */
export function CreatePersonForm() {
  const [values, setValues] = useState<FormValues>(initial_values);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInput =
    (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((oldState) => ({
        ...oldState,
        [key]: { value: e.target.value, error: null },
      }));
    };

  /**
   * Geralmente utilizo a biblioteca Yup para
   * validação dos valores do formulario
   */
  async function validateIfNotEmpty(formValues: FormValues) {
    let newFormValues = { ...formValues };
    for (const key in newFormValues) {
      const currentValue: Values = formValues[key as keyof FormValues];
      if (!currentValue?.value?.trim()) {
        newFormValues = {
          ...newFormValues,
          [key]: { value: currentValue?.value, error: "input not be empty *" },
        };
      } else {
        newFormValues = {
          ...newFormValues,
          [key]: { value: currentValue?.value, error: null },
        };
      }
    }
    setValues({ ...newFormValues });
    return Object.entries(newFormValues).every((values) => !values[1].error);
  }

  async function onSubmit(formValues: FormValues) {
    try {
      setLoading(true);
      const allInputsFilled = await validateIfNotEmpty(formValues);

      if (!allInputsFilled) {
        return toast.warn("Fill in all values");
      }

      const response = await PipedreamService({
        baseUrl: "https://eoobbrocsh5s3k.m.pipedream.net",
      }).post<InsertPerson>({
        id: uuid(),
        data: {
          name: formValues.name.value,
          email: formValues.email.value,
          cpf: formValues.cpf.value,
          birth_date: formValues.birth_date.value,
        },
      });
      if (!response) {
        throw new Error("Error when create a person");
      }
      setValues(initial_values);
      return toast.success("Successfully when create a person");
    } catch (error) {
      return toast.error("error when create a person");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Geralmente utilizo a biblioteca Formik
   * para montar os fomularios
   */
  return (
    <>
      <InputWrapper>
        <Input.Title name="Nome" />
        <Input.InputText
          value={values.name.value}
          error={values.name.error}
          onChange={handleInput("name")}
        />
      </InputWrapper>
      <InputWrapper>
        <Input.Title name="E-mail" />
        <Input.InputText
          value={values.email.value}
          error={values.email.error}
          onChange={handleInput("email")}
        />
      </InputWrapper>
      <InputWrapper>
        <Input.Title name="Cpf" />
        <Input.InputText
          value={values.cpf.value}
          error={values.cpf.error}
          onChange={handleInput("cpf")}
        />
      </InputWrapper>
      <InputWrapper>
        <Input.Title name="Data de nascimento" />
        <Input.InputDate
          value={values.birth_date.value}
          error={values.birth_date.error}
          onChange={handleInput("birth_date")}
        />
      </InputWrapper>
      <div
        className="button-wrapper"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (!loading) {
            onSubmit(values);
          }
        }}
      >
        <a
          className="button"
          style={{ backgroundColor: loading ? "var(---gray-20)" : "" }}
        >
          <strong>{loading ? "salvando..." : "salvar"}</strong>
        </a>
      </div>
    </>
  );
}
