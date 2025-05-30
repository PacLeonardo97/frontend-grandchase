import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { styled as styleMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import styled from './styled.module.scss';
import TextField from '@/components/Form/Textfield';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearAllRedux } from '@/store/user';

const NotificationBadge = styleMui(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

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
          <Typography className={styled.title} variant="h2">
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
            <Avatar>{user?.username?.at(0)?.toLocaleUpperCase() || 'C'}</Avatar>
          </IconButton>
          <Popover
            sx={{ zIndex: 999 }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {user?.id ? (
              <div>
                <Button
                  fullWidth
                  onClick={() => {
                    dispatch(clearAllRedux());
                  }}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className={styled.popover}>
                <Link
                  href="/auth/login"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Typography variant="h4" style={{ color: 'black' }}>
                    Login
                  </Typography>
                  <Button></Button>
                </Link>

                <Link
                  onClick={() => {
                    handleClose();
                  }}
                  href="/auth/register"
                >
                  <Typography variant="h4" style={{ color: 'black' }}>
                    Registrar
                  </Typography>
                </Link>
              </div>
            )}
          </Popover>
        </div>
      </div>
    </header>
  );
}
