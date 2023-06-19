import React from "react";
import { Controller, UseControllerProps, useFormState } from "react-hook-form";
import { TextField, TextFieldProps } from '@mui/material';

type ControlledTextFieldProps = {
  name: string;
} & TextFieldProps & UseControllerProps;

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
  id,
  name,
  label,
  rules,
  variant = "outlined",
  size = "small",
  fullWidth = true,
  ...restProps
}) => {
  const formState = useFormState();

  return (
    <Controller
      name={name}
      defaultValue=""
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <TextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          error={Boolean(formState.errors && formState.errors[name])}
          helperText={formState.errors && formState.errors[name]?.message as string}
          label={label}
          variant={variant}
          size={size}
          fullWidth
          FormHelperTextProps={{ style: { marginLeft: '0' } }}
          {...restProps}
        />
      )}
      rules={rules}
    />
  );
};

export default ControlledTextField;