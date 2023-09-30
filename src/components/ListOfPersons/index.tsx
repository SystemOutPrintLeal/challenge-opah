import { useState, useEffect } from "react";
import "./styles.css";
import {
  GetListOfPersons,
  Person,
  PipedreamService,
} from "../../services/pipedream.service";
import { toast } from "react-toastify";

const DEFAULT_LIMIT = 6;

interface PersonsList {
  total: number;
  persons: Person[];
}

const mockPerson = {
  name: "mocked_name",
  email: "mocked_email@gmail.com",
  cpf: "mocked_cpf",
  birth_date: "mocked_birth_date",
};

const mockValues: PersonsList = {
  total: 20,
  persons: [
    mockPerson,
    mockPerson,
    mockPerson,
    mockPerson,
    mockPerson,
    mockPerson,
  ],
};

export function ListOfPersons() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentList, setCurrentList] = useState<PersonsList | null>(null);

  useEffect(() => {
    loadListOfPersons();
  }, []);

  async function loadListOfPersons() {
    const response = await PipedreamService({
      baseUrl: "https://eou3ns36bjp3reg.m.pipedream.net",
    }).post<GetListOfPersons>({
      offset: currentPage * DEFAULT_LIMIT,
      limit: DEFAULT_LIMIT,
    });
    if (response?.status === 400) {
      setCurrentList(mockValues);
      toast.error("pipedream limit exceeded... 😢");
      return false;
    }

    if (response?.status !== 200) {
      toast.error("something went wrong... 😢");
      return false;
    }

    setCurrentList(currentList);
    return true;
  }

  async function handlePage(value: number) {
    const status = await loadListOfPersons();
    if (status) {
      return setCurrentPage(value);
    }
    return;
  }

  return (
    <>
      <section className="content-list">
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Cpf</th>
            <th>BirthDate</th>
          </tr>
          {currentList?.persons?.map((person: Person) => (
            <tr>
              <td
                data-tooltip-id="info-tooltip"
                data-tooltip-content={person.name}
              >
                {person.name}
              </td>
              <td
                data-tooltip-id="info-tooltip"
                data-tooltip-content={person.email}
              >
                {person.email}
              </td>
              <td
                data-tooltip-id="info-tooltip"
                data-tooltip-content={person.cpf}
              >
                {person.cpf}
              </td>
              <td
                data-tooltip-id="info-tooltip"
                data-tooltip-content={person.birth_date}
              >
                {person.birth_date}
              </td>
            </tr>
          ))}
        </table>
      </section>
      <div className="pagination">
        <button
          onClick={() => handlePage(currentPage - 1)}
          disabled={!currentPage}
        >
          {"<"}
        </button>
        <span>{currentPage + 1}</span>
        <button
          onClick={() => handlePage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(currentList?.total ?? 0 / DEFAULT_LIMIT)
          }
        >
          {">"}
        </button>
      </div>
    </>
  );
}
