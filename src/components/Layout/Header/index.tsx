import { useState } from 'react';

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';
import TextField from '@/components/Form/Textfield';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header className={styled.header}>
      <div className={styled.content}>
        <div>
          <TextField size="small" variant="standard" />
        </div>
        <div>
          <Typography className={styled.title} variant="h5">
            Grand Chase Classic
          </Typography>
        </div>

        <div>
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            onMouseOver={handleClick}
          >
            Open Popover
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </div>
      </div>
    </header>
  );
}
