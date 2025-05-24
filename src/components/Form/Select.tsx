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
      <InputLabel id={id}>{label}</InputLabel>
      <SelectMui label={label} labelId={id} {...props}>
        {list.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.value}
          </MenuItem>
        ))}
      </SelectMui>
    </FormControl>
  );
}
