import { BaseSelectProps } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SelectMui from '@mui/material/Select';

interface IProps extends BaseSelectProps {
  list: { value: string; label?: string }[];
}

export default function Select({ list, id, label, ...props }: IProps) {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel
        sx={(theme) => ({
          color: `${theme.palette.grey[100]} !important`,
        })}
        htmlFor={`${id}_input`}
        id={`${id}_label`}
      >
        {label}
      </InputLabel>
      <SelectMui
        inputProps={{
          id: `${id}_input`,
        }}
        label={label}
        labelId={`${id}_label`}
        {...props}
      >
        {list.map((item) => (
          <MenuItem
            sx={(theme) => ({
              color: theme.palette.grey[100],
            })}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </SelectMui>
    </FormControl>
  );
}
