import { forwardRef, useState } from "react";

interface Props {
  value: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
}

export const CustomInput = forwardRef((props: Props, ref) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div>
        <div>FIELD VALUE: </div>
        <div>{value.join(", ")}</div>
      </div>
      <input
        ref={ref}
        value={inputValue}
        onBlur={props.onBlur}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          onChange([...value, inputValue]);
          setInputValue("");
        }}
      >
        Add to Values List
      </button>
    </div>
  );
});
