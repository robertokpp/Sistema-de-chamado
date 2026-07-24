import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { Checkbox } from "../components/Checkbox";

import iconPen from "../assets/icon-pen-line.svg";
import iconPlus from "../assets/icon-plus.svg";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

interface technical {
  id: string;
  name: string;
  email: string;
  hours: [];
}

export function Technical() {
  const navigate = useNavigate();
  const [technicals, useTechnicals] = useState<technical[]>([]);

  async function ListTechnical() {
    const response = await api.get("/technical");
    useTechnicals(response.data);
  }

  useEffect(() => {
    ListTechnical();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Header>Técnicos</Header>
        <Button svg={iconPlus} onClick={() => navigate("/novo-tecnico")}>
          Novo
        </Button>
      </div>

      <Table
        ths={[
          { title: "Nome" },
          { title: "E-mail" },
          { title: "Disponibilidade" },
        ]}
      >
        {technicals.map((technical) => (
          <tr key={technical.id}>
            <td>
              <p className="pl-2 truncate">{technical.name}</p>
            </td>
            <td>
              <p className="font-normal truncate">{technical.email}</p>
            </td>
            <td>
              <div className="flex gap-2 truncate">
                {technical.hours.map((hour) => (
                  <Checkbox
                    key={hour}
                    checked={false}
                    onChange={() => false}
                    className={"text-gray-400"}
                  >
                    {hour}
                  </Checkbox>
                ))}
              </div>
            </td>
            <td>
              <div className="flex justify-end p-2 w-fit">
                <Button
                  svg={iconPen}
                  onClick={() => navigate(`/tecnicos/${technical.id}`)}
                  className="bg-gray-500"
                ></Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
