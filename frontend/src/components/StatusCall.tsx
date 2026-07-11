import iconOpen from "../assets/icon-circleHelp.svg";
import iconProgress from "../assets/icon-progress.svg";
import iconClose from "../assets/icon-close2.svg";

interface Props {
  variant: "OPEN" | "IN_PROGRESS" | "CLOSE";
}

export function StatusCall({ variant }: Props) {
  const variants = {
    OPEN: {
      className: "bg-feedback-open/20 text-feedback-open",
      svg: iconOpen,
      label: "Aberto",
    },

    IN_PROGRESS: {
      className: "bg-feedback-progress/20 text-feedback-progress",
      svg: iconProgress,
      label: "Em atendimento",
    },
    CLOSE: {
      className: "bg-feedback-done/20 text-feedback-done",
      svg: iconClose,
      label: "Encerrado",
    },
  };

  const status = variants[variant];
  return (
    <div
      className={`${status.className} rounded-2xl p-1 flex gap-1 justify-center items-center w-fit`}
    >
      <img src={status.svg} />
      <span>{status.label}</span>
    </div>
  );
}
