import { useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Badge, { badgeClasses } from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { styled as styleMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';
import TextField from '@/components/Form/Textfield';

const NotificationBadge = styleMui(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

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
          <Typography fontSize={24} className={styled.title} variant="h2">
            MinMaxed
          </Typography>
        </div>

        <div className={styled.userContainer}>
          <IconButton style={{ marginRight: 16 }}>
            <NotificationsIcon />
            <NotificationBadge
              badgeContent={2}
              color="primary"
              overlap="circular"
            />
          </IconButton>
          <IconButton
            aria-describedby={id}
            onClick={handleClick}
            onMouseOver={handleClick}
          >
            <Avatar>U</Avatar>
          </IconButton>
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
            <div className={styled.popover}>
              <Button>Logar</Button>

              <Button>Registrar</Button>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
}
