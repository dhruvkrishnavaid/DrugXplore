import { useEffect } from "react";
import { AddInputProps } from "../types";

const AddInput = ({
  title,
  required,
  placeholder,
  count,
  inputs,
  setCount,
  setInputs,
  buttonText,
}: AddInputProps) => {
  useEffect(() => {
    if (inputs.length > count) {
      setCount(inputs.length);
    }
  }, [count, inputs, setCount]);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xl font-bold">
          {title}
          {required && <span className="text-red-500">*</span>}
        </span>
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="items-center hidden px-4 py-2 font-bold text-white rounded cursor-pointer lg:flex gap-2 bg-tertiary/95 hover:bg-tertiary transition-colors duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
          {buttonText}
        </button>
      </div>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex justify-between gap-4">
          <input
            type="text"
            placeholder={`${placeholder} ${i + 1}`}
            value={inputs[i]}
            onChange={(e) => {
              const newInputs = [...inputs];
              newInputs[i] = e.target.value;
              setInputs(newInputs);
            }}
            className="w-full md:max-w-lg p-2 bg-white border rounded-lg outline-none border-neutral-300 text-neutral-900 ring-primary focus:ring-2 focus:ring-primary"
          />
          {count > 1 && (
            <button
              type="button"
              onClick={() => {
                const newInputs = [...inputs];
                newInputs.splice(i, 1);
                setInputs(newInputs);
                setCount(count - 1);
              }}
              className="flex items-center justify-center p-2 text-red-500 rounded-full cursor-pointer bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-evenly">
        <button
          type="button"
          onClick={() => setInputs([...inputs, ""])}
          className="flex px-4 py-2 font-bold text-white rounded cursor-pointer lg:hidden gap-2 bg-tertiary/95 hover:bg-tertiary transition-colors duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default AddInput;
