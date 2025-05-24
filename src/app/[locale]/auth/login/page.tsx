'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Link as LinkMui,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';

import TextField from '@/components/Form/Textfield';
import { useAppDispatch } from '@/store/hooks';
import { fetchLogin } from '@/store/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams<{ locale: string }>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await dispatch(fetchLogin({ email, password }));
      router.push('/');
    } catch (error) {
      if (isAxiosError(error)) {
        toast(error.response?.data.error.message, {
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: '#78909C', alignSelf: 'self-start' }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            sx={{ mt: 3 }}
            margin="normal"
            placeholder="email@email.com"
            required
            id="email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword((oldValue) => !oldValue)}
                >
                  {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disabled={loading}
          >
            Entrar
          </Button>
          <Grid
            container
            component="div"
            sx={{
              placeContent: 'space-between',
            }}
          >
            <LinkMui
              component={Link}
              href={`/${params.locale}/auth/forgot-password`}
              variant="body2"
            >
              Esqueceu a senha?
            </LinkMui>
            <LinkMui
              component={Link}
              href={`/${params.locale}/auth/register`}
              variant="body2"
            >
              Registrar
            </LinkMui>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
