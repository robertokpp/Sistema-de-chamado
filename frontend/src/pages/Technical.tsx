import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";

import iconPen from "../assets/icon-pen-line.svg";
import iconPlus from "../assets/icon-plus.svg";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";
import { NewTable } from "../components/NewTable";
import { Avatar } from "../components/Avatar";

interface technical {
  id: string;
  name: string;
  email: string;
  avatar: string
  hours: [];
}

export function Technical() {
  const navigate = useNavigate();
  const [technicals, useTechnicals] = useState<technical[]>([]);

  async function ListTechnical() {
    const response = await api.get("/technical");
    useTechnicals(response.data);

    console.log(response.data)
  }

  useEffect(() => {
    ListTechnical();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Header>Técnicos</Header>
        <Button svg={iconPlus} onClick={() => navigate("/novo-tecnico")}>
          Novo
        </Button>
      </div>

      <section>
        <NewTable
          title={[
            { name: "Nome", className: "flex-2" },
            { name: "E-mail", className: "flex-2" },
            { name: "Disponibilidade", className: "flex-3" },
            { name: "", className: "flex-[0.5]" },
          ]}
        >
          {technicals.map((technical) => (
            <li className="gap-1" key={technical.id}>
              <div className="flex-2 truncate">
                <div className="flex gap-1 items-center">
                  <Avatar avatar={technical.avatar}></Avatar>
                  <p className="font-bold truncate">{technical.name}</p>
                </div>
              </div>
              <p className="font-normal flex-2 truncate">{technical.email}</p>
              <div className="flex-3 truncate">
                <div className="flex gap-1">
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
              </div>
              <div className="flex-[0.5] flex w-full items-center justify-center">
                <Button
                  svg={iconPen}
                  onClick={() => navigate(`/tecnicos/${technical.id}`)}
                  className="bg-gray-500"
                ></Button>
              </div>
            </li>
          ))}
        </NewTable>
      </section>
    </>
  );
}
