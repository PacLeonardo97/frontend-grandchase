import { TextField as TextFieldMui, TextFieldProps } from '@mui/material';

type IProps = TextFieldProps;

function TextField({ ...props }: IProps) {
  return <TextFieldMui style={{ borderRadius: '4px' }} fullWidth {...props} />;
}

export default TextField;
