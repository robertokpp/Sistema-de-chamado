import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { Checkbox } from "../components/Checkbox";

import iconPen from "../assets/icon-pen-line.svg"

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
    console.log(response.data);

    useTechnicals(response.data);
  }

  useEffect(() => {
    ListTechnical();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Header>Técnicos</Header>
        <Button onClick={() => navigate("/novo-tecnico")}>Novo</Button>
      </div>

      <Table ths={["Nome", "E-mail", "Disponibilidade"]}>
        {technicals.map((technical) => (
          <tr>
            <td className="pl-2">{technical.name}</td>
            <td className="font-normal">{technical.email}</td>
            <td className="flex gap-2">
              {technical.hours.map((hour) => (
                <Checkbox checked={false} onChange={() => false} className={"text-gray-400"}>
                  {hour}
                </Checkbox>
              ))}
            </td>
            <td><Button svg={iconPen} className="bg-gray-500"></Button></td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
