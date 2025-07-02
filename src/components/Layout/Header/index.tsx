'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type Dispatch, type SetStateAction, useState } from 'react';

import DehazeIcon from '@mui/icons-material/Dehaze';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import { styled as styleMui } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import LanguageSwitcher from '../ChangeLang';
import styled from './styled.module.scss';
import TextField from '@/components/Form/Textfield';
import { useLogout } from '@/hooks/auth/useLogout';
import { useUser } from '@/hooks/user/useUser';

const NotificationBadge = styleMui(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setOpenDrawer }: IProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data: user } = useUser();
  const logout = useLogout();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={(theme) => ({
        background: theme.palette.grey[900],
      })}
      component="header"
      className={styled.header}
    >
      <div className={styled.content}>
        <div>
          <TextField size="small" variant="standard" />
        </div>
        <Link href="/">
          <div>
            <Typography className={styled.title} variant="h2">
              MinMaxed
            </Typography>
          </div>
        </Link>

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
            onClick={handleClick}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handleClick}
          >
            <Avatar>
              {user?.user.username?.at(0)?.toLocaleUpperCase() || 'C'}
            </Avatar>
          </IconButton>
          <IconButton
            onClick={() => {
              setOpenDrawer((oldState) => !oldState);
            }}
            sx={(theme) => ({
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            })}
          >
            <DehazeIcon />
          </IconButton>

          <Popover
            sx={{ zIndex: 999 }}
            open={open}
            aria-hidden={!open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div
            // onPointerLeave={() => {
            //   handleClose();
            // }}
            >
              <LanguageSwitcher />

              {user?.user.id ? (
                <div className={styled.popover}>
                  <Button
                    fullWidth
                    onClick={() => {
                      logout();
                      router.refresh();
                    }}
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <div className={styled.popover}>
                  <Typography variant="h4">
                    <Link
                      href="/auth/login"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Login
                    </Link>
                  </Typography>

                  <Typography variant="h4">
                    <Link
                      onClick={() => {
                        handleClose();
                      }}
                      href="/auth/register"
                    >
                      Registrar
                    </Link>
                  </Typography>
                </div>
              )}
            </div>
          </Popover>
        </div>
      </div>
    </Box>
  );
}
