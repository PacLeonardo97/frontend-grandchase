'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  Box,
  Button,
  Container,
  Grid,
  Link as LinkMui,
  Typography,
} from '@mui/material';
import { isAxiosError } from 'axios';

import api from '@/api';
import TextField from '@/components/Form/Textfield';
import Layout from '@/components/Layout';

export default function Login() {
  const params = useParams<{ locale: string }>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const id = toast.loading('Email sendo enviado, espere um momento');
    try {
      const req = await api.post('/auth/forgot-password', {
        email,
      });
      localStorage.setItem('@GC/access_token', req.data.jwt);
      toast.update(id, {
        render: 'email enviado, em alguns minutos veja seu email',
        theme: 'dark',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        isLoading: false,
      });
      router.push('/');
    } catch (error) {
      if (isAxiosError(error)) {
        toast.update(id, {
          render: error.response?.data.error.message,
          theme: 'dark',
          type: 'error',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          isLoading: false,
        });
      }
    } finally {
      setLoading(false);
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
            Esqueci minha senha
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 1, mb: 2 }}
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
                href={`/${params.locale}/auth/register`}
                variant="body2"
              >
                Registrar-se
              </LinkMui>
              <LinkMui
                component={Link}
                href={`/${params.locale}/auth/login`}
                variant="body2"
              >
                login
              </LinkMui>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
