'use client';

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
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import api from '@/api';
import TextField from '@/components/Form/Textfield';
import Layout from '@/components/Layout';

export default function Page() {
  const params = useParams<{ locale: string }>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const req = await api.post('/auth/local/register', {
        username: name,
        email,
        password,
      });
      localStorage.setItem('@GC/jwt', req.data.jwt);
      router.push('/');
    } catch (error) {
      if (isAxiosError(error)) {
        toast(error.response?.data.error.message, {
          type: 'error',
        });
      }
    }
  };

  return (
    <Layout>
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
            Registrar-se
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              sx={{ mt: 3 }}
              margin="normal"
              placeholder="Seu nome"
              required
              id="name"
              label="Nome"
              type="text"
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
                    {showPassword ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container component="div">
              <LinkMui
                component={Link}
                href={`/${params.locale}/login`}
                variant="body2"
              >
                Login
              </LinkMui>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
