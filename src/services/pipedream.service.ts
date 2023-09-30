import axios, { AxiosResponse } from "axios";

export interface Props {
  baseUrl: string;
}

export interface Person {
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
}

export interface InsertPerson {
  id: string;
  data: Person;
}

export interface GetListOfPersons {
  offset: number;
  limit: number;
}

export function PipedreamService({ baseUrl }: Props) {
  async function post<T>(body: T): Promise<AxiosResponse | null> {
    console.log(body);
    try {
      return await axios.post(baseUrl, { ...body });
    } catch (error: any) {
      if (error?.request?.status) {
        // @ts-ignore
        return { status: error?.request?.status };
      }
      console.error(error.message);
      return null;
    }
  }

  return { post };
}
