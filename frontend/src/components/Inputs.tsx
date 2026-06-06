type Props = React.ComponentProps<"input"> & {
  legend: string;
};

export function Input({ legend, ...rest }: Props) {
  return (
    <fieldset>
      <legend className="uppercase font-bold text-[10px] text-gray-300">{legend}</legend>
      <input className="placeholder: text-gray-400 w-full border-b border-gray-500 py-2" type="text"  {...rest} />
    </fieldset>
  );
}
