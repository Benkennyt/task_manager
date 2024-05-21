import { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";
import { HidePasswordIcon, ShowPasswordIcon } from "../../../assets/svg/SVG";


interface InputTempProps {
  label?: string;
  name?: string;
  id?: string;
  inputType?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  defaultValue?: any;
  value?: any;
  children?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  fieldClass?: string;
  disabled?: boolean;
  autoComplete?: string;
  errors?: any;
  bckenderr?:any;
  touched?: any;
  handlePasswordShowHide?: any,
  showPassword?: boolean,
}

export const InputTemp = ({
  name,
  id,
  inputType,
  placeholder,
  defaultValue,
  value,
  onChange,
  onBlur,
  disabled,
  autoComplete,
  errors,
  bckenderr,
  touched,
  handlePasswordShowHide,
  showPassword,
}: InputTempProps) => {

  return (
    <div className="field">
      {/* <label>
        {label}{" "}
      </label> */}
      <div className="pass">
        <input
          autoComplete={'off'}
          disabled={disabled}
          placeholder={placeholder}
          type={inputType}
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onBlur={onBlur}
          onChange={onChange}
        />
        {id === 'password' || id === 'confirmPassword'? <div className="show-hide" onClick={handlePasswordShowHide}>{showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}</div>: ''}
      </div>
      {errors[name || ''] && touched[name || ''] ? (<p className='error-message'>{String(errors[name || ''])}</p>) : null}
      {<p className="error-message">{bckenderr}</p>}
    </div>
  );
};
