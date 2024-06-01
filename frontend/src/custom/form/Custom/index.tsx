import { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, ReactNode, useState } from "react";
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
  bckenderr?: any;
  touched?: any;
  handlePasswordShowHide?: any,
  showPassword?: boolean,
  setPasswordType?: any,
  passwordType?: string
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
  errors,
  bckenderr,
  touched,
  setPasswordType,
  passwordType
}: InputTempProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const handlePasswordShowHide = (inputId: any) => {
    setActiveInput(inputId)
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }

    if (passwordType === '') {
      setPasswordType(id)
    }else if (passwordType === id ) {
      setPasswordType('')
    } else if (passwordType != id && passwordType != '') {
      setPasswordType(id)
    }
  };
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
        {(id === 'password' || id === 'confirmPassword') && (
          <div className="show-hide" onClick={() => {handlePasswordShowHide(id)}}>
            {showPassword && activeInput === id && passwordType === id ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          </div>
        )}
      </div>
      {errors[name || ''] && touched[name || ''] ? (<p className='error-message'>{String(errors[name || ''])}</p>) : null}
      {<p className="error-message">{bckenderr}</p>}
    </div>
  );
};
