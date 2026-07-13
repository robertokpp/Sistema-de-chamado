type Props = React.ComponentProps<"input"> & {
  legend: string;
};

type SelectProps = React.ComponentProps<"select"> & {
  legend: string;
};

type TextAreaProps = React.ComponentProps<"textarea"> & {
  legend: string;
};
export function Input({ legend, ...rest }: Props) {
  return (
    <fieldset>
      <legend className="uppercase font-bold text-[10px] text-gray-400">{legend}</legend>
      <input
        className="placeholder:text-gray-400 px-2 w-full border-b border-[#E3E5E8] py-2"
        type="text"
        {...rest}
      />
    </fieldset>
  );
}

export function Textarea({ legend, children, ...rest }: TextAreaProps) {
  return (
    <fieldset>
      <legend className="uppercase font-bold text-[10px] text-gray-400">
        {legend}
      </legend>


      <textarea
        name=""
        id=""
        cols={50}
        className="placeholder:text-gray-400 px-2 w-full resize-y border-b border-[#E3E5E8] py-2"
        onInput={(event) => {
          event.currentTarget.style.height = "auto";
          event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
        }}
        {...rest}
      >
        {children}
      </textarea>
    </fieldset>
  );
}

export function Select({ legend, children, ...rest }: SelectProps) {
  return (
    <fieldset>
      <legend className="uppercase font-bold text-[10px] text-gray-400">
        {legend}
      </legend>

      <select
        {...rest}
        className="placeholder:text-gray-400 px-2 w-full border-b border-[#E3E5E8] py-2"
      >
        {children}
      </select>
    </fieldset>
  );
}
