import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Input } from "../components/Inputs";
import { NewTable } from "../components/NewTable";

import iconTrash from "../assets/icon-trash.svg";
import iconPen from "../assets/icon-pen-line.svg";

import { api } from "../services/api";
import { useState, useEffect } from "react";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { Avatar } from "../components/Avatar";

interface client {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export function Client() {
  const [clients, useClients] = useState<client[]>([]);
  const [editingIsOpen, setEditingIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [id, setId] = useState("");

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      const data = {
        name,
        email,
      };

      await api.patch(`/client/${id}`, data);

      ListClient();
      setEditingIsOpen(false);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      return { message: "Não foi possível realizar a alteração." };
    }
  }

  async function handlerDeleteClient() {
    try {
      await api.delete(`/client/${id}`);

      ListClient();
      setDeleteIsOpen(false);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      return { message: "Não foi possível Excluir o Cliente." };
    }
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
      <div className="flex justify-between items-center mb-4">
        <Header>Clientes</Header>
      </div>

      <section>
        <NewTable
          title={[
            { name: "Name", className: "flex-2" },
            { name: "E-mail", className: "flex-2" },
            { name: "", className: "flex-1" },
          ]}
        >
          {clients.map((client) => (
            <li className="border-t border-gray-500 gap-1" key={client.id}>
              <div className="flex-2">
                <div className="flex gap-1 items-center">
                  <Avatar avatar={client.avatar}></Avatar>
                  <p className="truncate font-bold">{client.name}</p>
                </div>
              </div>
              <p className="truncate flex-2">{client.email}</p>
              <div className="flex-1">
                <div className="flex gap-2 justify-end">
                  <Button
                    svg={iconTrash}
                    onClick={() => {
                      (setDeleteIsOpen(true),
                        setId(client.id),
                        setName(client.name));
                    }}
                    className="bg-gray-500 "
                  ></Button>
                  <Button
                    svg={iconPen}
                    onClick={() => {
                      (setEditingIsOpen(true),
                        setId(client.id),
                        setName(client.name),
                        setEmail(client.email),
                        setAvatar(client.avatar));
                    }}
                    className="bg-gray-500 "
                  ></Button>
                </div>
              </div>
            </li>
          ))}
        </NewTable>
      </section>

      <Modal
        tittle="Cliente"
        isOpen={editingIsOpen}
        onClose={() => setEditingIsOpen(false)}
      >
        <div className="pb-5">
          <Avatar className="w-12 h-12" classNameImg="w-12 h-12" avatar={avatar}></Avatar>
        </div>
        <form onSubmit={onSubmit}>
          <Input
            required
            legend="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <Input
            legend="E-mail"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Button className="w-full mt-14" type="submit">
            Salva
          </Button>
        </form>
      </Modal>

      <Modal
        tittle="Excluir cliente"
        isOpen={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
      >
        <p>
          {`Deseja realmente excluir`}{" "}
          <span className="font-bold">{`${name}?`}</span>
        </p>
        <p className="mt-5 mb-8">
          Ao excluir, todos os chamados deste cliente serão removidos e esta
          ação não poderá ser desfeita.
        </p>
        <div className="flex gap-2">
          <Button
            className="w-full bg-gray-500 text-black "
            onClick={() => setDeleteIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button className="w-full" onClick={handlerDeleteClient}>
            Sim, excluir
          </Button>
        </div>
      </Modal>
    </div>
  );
}
