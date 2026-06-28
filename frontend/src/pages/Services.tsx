import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
export function Services() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Header>Serviços</Header>
        <Button>Novo</Button>
      </div>

      <Modal></Modal>
    </div>
  );
}
