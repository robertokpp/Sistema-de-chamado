import logoDark from "../assets/Logo_IconDark.svg";
import iconLogout from "../assets/icon-logout.svg";
import iconMenu from "../assets/icon-menu.svg";
import iconUpload from "../assets/icon-upload.svg";
import iconTrash from "../assets/icon-trash.svg";

import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { NavItem } from "./NavItem";
import { menu } from "../config/menu";
import { Link } from "react-router";
import { useMemo, useState } from "react";
import { api } from "../services/api";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { Modal } from "./Modal";
import { Input } from "./Inputs";

const bodySchema = z.object({
  name: z.string().min(3, "Digite um nome válido."),
  email: z.email(),
  password: z
    .string()
    .min(6, "A senha deve conter no mínimo 6 caracteres.")
    .optional(),
});

export function LayoutSideMenu() {
  const { session, remove, save } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(session?.user.name);
  const [email, setEmail] = useState(session?.user.email);
  const [password, setPassword] = useState("");

  if (!session) return null;
  const items = menu[session?.user.role];

  async function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile || !session) return;

    setFile(selectedFile);

    const response = await api.patch("/users/avatar");

    save({
      token: session.token,
      user: response.data.user,
    });
  }

  async function handleUpload(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (file) {
        const formData = new FormData();
        formData.append("avatar", file);
        await api.patch("/user/avatar", formData);
      }

      const data = bodySchema.parse({
        name,
        email,
        password: password || undefined,
      });

      console.log(data);
      await api.patch("/user/show", data);

      alert("Atualizado com sucesso.");
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      return { message: " Não foi possível Atualizar o usuário." };
    }
  }

  const PreviewAvatar = useMemo(() => {
    if (!file) {
      return;
    }
    return URL.createObjectURL(file);
  }, [file]);

  return (
    <div className="flex bg-gray-100 max-lg:flex-col">
      <aside className="px-5 py-6 flex flex-col justify-between h-screen mt-3 w-fit max-lg:h-fit max-lg:w-full max-lg:m-0">
        <div>
          <header className="max-lg:w-full max-lg:flex max-lg:items-center max-lg:justify-between">
            <div className="flex gap-3 py-5 items-center max-lg:p-0 ">
              <Button
                svg={iconMenu}
                className="bg-gray-200 h-fit lg:hidden"
              ></Button>
              <img src={logoDark} alt="logo Dark" className="w-11 h-11" />

              <div className="flex flex-col gap-0.5">
                <span className="text-gray-500 font-bold text-[20px]">
                  HelpDesk
                </span>
                <span className="uppercase text-blue-lavender text-[10px] font-bold">
                  {session?.user.role}
                </span>
              </div>
            </div>
            <Avatar className="lg:hidden" avatar={session.user.avatar}></Avatar>
          </header>

          <nav className="flex flex-col gap-2 max-lg:hidden">
            {items.map((item) => (
              <NavItem
                key={item.path}
                title={item.title}
                path={item.path}
                icon={item.icon}
              />
            ))}
          </nav>
        </div>

        <footer className="flex gap-2 items-center w-fit max-lg:hidden">
          <div
            className="cursor-pointer flex gap-2 justify-center items-center"
            onClick={() => setIsOpen(true)}
          >
            <Avatar avatar={session.user.avatar}></Avatar>
            <div className="flex flex-col">
              <span className="text-gray-500 text[14px] text-nowrap">
                {name}
              </span>
              <span className="text-gray-400 text-[12px]">{email}</span>
            </div>
          </div>

          <Link
            to={"/"}
            onClick={remove}
            className="w-7.5 h-7.5 items-center flex justify-center"
          >
            <img src={iconLogout} alt="iconLogout" />
          </Link>
        </footer>
      </aside>

      <Modal tittle="Perfil" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleUpload}>
          <div className="flex gap-4 items-center">
            {PreviewAvatar ? (
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={PreviewAvatar}
              />
            ) : (
              <Avatar
                className="w-12 h-12"
                classNameImg="w-12 h-12"
                avatar={session.user.avatar}
              />
            )}

            <label
              id="avatar"
              className="flex gap-2 justify-center items-center rounded-[5px] p-1.5 h-fit bg-gray-500 font-bold"
            >
              <input
                type="file"
                name="avatar"
                className="hidden"
                onChange={handleSelectFile}
              />
              <img
                className="w-3.5 h-3.5"
                src={iconUpload}
                alt="icon de upload"
              />
              <span>Nova imagem</span>
            </label>

            <Button svg={iconTrash} className="bg-gray-500 "></Button>
          </div>
          <div className="flex flex-col gap-4 mt-5 mb-14">
            <Input
              legend="Nome"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Input
              legend="e-mail"
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              legend="senha"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>

          <Button type="submit" className="w-full">
            Salvar
          </Button>
        </form>
      </Modal>

      <main className="bg-white rounded-tl-[20px] mt-3 w-full p-12 flex flex-col max-lg:rounded-t-[20px] max-lg:mt-0 max-lg:p-4">
        <Outlet />
      </main>
    </div>
  );
}
