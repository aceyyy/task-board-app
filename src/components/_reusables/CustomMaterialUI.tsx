import CircularProgress from '@mui/material/CircularProgress';
import Button, { ButtonProps } from '@mui/material/Button';

export const CustomButton = ({ variant = "contained", size = "small", children, ...restProps }: ButtonProps) => {
  return <Button variant={variant} size={size} {...restProps}>{children}</Button>
};

export const CustomCircularProgressForButton = () => {
  return <CircularProgress size={14} sx={{ color: "black", marginLeft: 1 }} />
};