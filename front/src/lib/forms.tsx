import {
  Children,
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Working from "./working";
import { getValidPattern } from "./utils";
import autosize from "autosize";
import { UseFormSetError, UseFormReset, useForm } from "react-hook-form";

export type FormRef = {
  setError: UseFormSetError<any>;
  reset: UseFormReset<any>;
};

const Form = forwardRef((props: any, ref: any) => {
  const { defaultValues, children, onSubmit, ...rest } = props;
  const methods = useForm({ values: defaultValues });
  const {
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = methods;

  if (ref) {
    useImperativeHandle(ref, () => ({
      setError,
      reset,
      handleSubmit,
    }));
  }

  return (
    <div className={rest.className}>
      <form onSubmit={handleSubmit(onSubmit)} {...rest}>
        {Children.map(children, (child) => {
          return child.props.name
            ? createElement(child.type, {
                ...{
                  ...child.props,
                  register: methods.register,
                  key: child.props.name,
                  errors: errors,
                },
              })
            : child;
        })}
      </form>
    </div>
  );
});

export default Form;

export function Hidden({ register, name }: any) {
  return <input {...register(name)} name={name} type="hidden" />;
}

export function Input({ register, name, options = [], ...rest }: any) {
  const pattern = getValidPattern(rest);
  return (
    <div className={`form-input${rest.size ? " " + rest.size : ""}`}>
      <input
        {...register(name, {
          required: rest.req_msg,
          pattern: pattern,
        })}
        type="text"
        {...rest}
      />
      {rest.errors[name]?.message && (
        <small className="font-bold text-red-600 text-xs">
          {rest.errors[name].message}
        </small>
      )}
    </div>
  );
}

export function Checkbox({ register, name, options = [], ...rest }: any) {
  return (
    <div className="mb-2 h-[70px]">
      <fieldset className="border border-solid border-gray-300 px-2">
        <legend className="text-sm px-1">{rest.legend}</legend>
        {options.map((option: Record<string | number, string>) => (
          <span {...rest} key={option.key}>
            <label className="text-sm mr-1 m-0 p-0">{option.value}</label>
            <input
              key={option.key}
              {...register(name, {
                required: rest.req_msg,
              })}
              type="checkbox"
            />
          </span>
        ))}
      </fieldset>
      {rest.errors[name]?.message && (
        <small className="font-bold text-red-600 text-xs block ml-2">
          {rest.errors[name].message}
        </small>
      )}
    </div>
  );
}

export function Radio({ register, name, options = [], ...rest }: any) {
  return (
    <div className="mb-2">
      {options.map((option: Record<string | number, string>) => (
        <>
          <label className="text-sm mr-2 m-0 p-0">{option.value}</label>
          <input
            key={option.key}
            {...register(name, {
              required: rest.req_msg,
            })}
            type="radio"
            {...rest}
          />
        </>
      ))}

      {rest.errors[name]?.message && (
        <small className="font-bold text-red-600 text-xs ml-2">
          {rest.errors[name].message}
        </small>
      )}
    </div>
  );
}

export function Select({ register, name, options, ...rest }: any) {
  return (
    <div
      className={`${
        rest.not_input ? "flex items-center" : "form-input flex items-center"
      }${rest.size ? " " + rest.size : ""}`}
    >
      <span className="-mt-2">
        <Working loading={rest.fetching} />
      </span>
      <select
        {...register(name, { required: rest.req_msg })}
        onChange={(e) => rest.onChange(e)}
        className={
          rest.className
            ? rest.className
            : `block bg-white text-[17px] px-3 py-1 w-auto rounded-md border border-gray-300 focus:outline-none mb-6`
        }
      >
        <option value="">--select--</option>
        {options?.map((option: { key: string; value: string }) => (
          <option
            key={option.key}
            defaultChecked={option.key == rest.selected}
            value={option.key}
          >
            {option.value}
          </option>
        ))}
      </select>
      {rest.errors[name]?.message && (
        <small className="font-bold text-red-600 text-xs">
          {rest.errors[name].message}
        </small>
      )}
    </div>
  );
}

export function Button({
  status,
  title,
  ...rest
}: {
  title: string;
  status: boolean;
}) {
  return (
    <div className="mt-2">
      <button
        disabled={status}
        type="submit"
        {...rest}
        className="bg-blue-200 working text-black flex"
      >
        <div>{title}</div>
        <div className="mt-1 ml-1">
          <Working loading={status} />
        </div>
      </button>
    </div>
  );
}

export function Textarea({ register, name, errors, ...rst }: any) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [taValue, setTaValue] = useState<String>();
  const { ref, onChange, ...rest } = register(name, {
    required: rst.req_msg,
  });

  useImperativeHandle(ref, () => taRef.current);

  useEffect(() => {
    if (taRef && taRef.current) {
      autosize(taRef.current);
    }
  }, [taValue]);

  return (
    <div className={`mb-4 relative`}>
      <textarea
        rows={2}
        {...rst}
        {...rest}
        ref={taRef}
        className="block !m-0 text-[17px] px-3 w-full rounded-md border border-gray-300 focus:outline-none mb-6"
        onChange={(e) => {
          setTaValue((e.target as HTMLTextAreaElement)?.value);
          onChange(e);
        }}
      />
      {errors[name]?.message && (
        <small className="-bottom-[0.9rem] pl-2 absolute font-bold text-red-600 text-xs">
          {errors[name].message}
        </small>
      )}
    </div>
  );
}
