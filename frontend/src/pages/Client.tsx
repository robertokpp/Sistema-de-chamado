import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Inputs";

import iconTrash from "../assets/icon-trash.svg";
import iconPen from "../assets/icon-pen-line.svg";

import { api } from "../services/api";
import { useState, useEffect } from "react";

interface client {
  id: string;
  name: string;
  email: string;
}

export function Client() {
  const [clients, useClients] = useState<client[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [id, setId] = useState("");

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const data = {
      name,
      email,
    };

    await api.patch(`/client/${id}`, data);

    ListClient();
    setIsOpen(false)
  }

  async function ListClient() {
    const response = await api.get("/client");
    return useClients(response.data);
  }

  useEffect(() => {
    ListClient();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Header>Clientes</Header>
      </div>

      <section>
        <Table ths={["Nome", "E-mail"]}>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="pl-2">{client.name}</td>
              <td className="font-normal">{client.email}</td>
              <td className="flex justify-end pr-2 gap-2">
                <Button svg={iconTrash} className="bg-gray-500 "></Button>
                <Button
                  svg={iconPen}
                  onClick={() => {
                    (setIsOpen(true),
                      setId(client.id),
                      setName(client.name),
                      setEmail(client.email));
                  }}
                  className="bg-gray-500 "
                ></Button>
              </td>
            </tr>
          ))}
        </Table>
      </section>

      <Modal tittle="Cliente" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={onSubmit}>
          <Input
            legend="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Input
            legend="nome"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Button className="w-full mt-14" type="submit">
            Salva
          </Button>
        </form>
      </Modal>
    </div>
  );
}
