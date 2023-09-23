import React, { createContext, useEffect, useState } from 'react';
import { Alert, Backdrop, Box, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { useLogin } from '@/api/auth';
// import { pageRoutes } from '../routes';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { apiRoutes } from '@/routes';

const LoginModal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [btnLoading, setBtnLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  //   useEffect(() => {
  //     if (Cookies.get('token')) {
  //       history.replace(pageRoutes.main);
  //     }
  //   }, []);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setBtnLoading(true);
    try {
      const resp = await useLogin(email, password);
      if (resp.data.token) {
        // Cookies.set('token', resp.data.token);
        // history.replace(pageRoutes.main);
        queryClient.invalidateQueries();
      } else {
        toast.error('Invalid details', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      toast.error('Invalid details', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} >
          <Box mb={3}>
            <Typography display="block" variant="h5">
              Logue-se para ter acesso à todas as funcionalidades
            </Typography>
          </Box>

          <form
            noValidate
            autoComplete="off"
            style={{ width: '100%' }}
            onSubmit={onSubmit}
          >
            <Box mb={2}>
              <TextField
                fullWidth
                autoComplete="off"
                size="small"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                autoComplete="off"
                size="small"
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Box>

            <Box mb={2}>
              <GoogleLogin
                // login_uri={apiRoutes.loginGoogle}
                click_listener={() => setBtnLoading(true)}
                theme={'outline'}
                
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  useLoginGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
              />
            </Box>
            <Box mb={2}>
              <Alert severity="info">
                You could login with any credentials, even with empty fields. It
                doesn't matter. Just for demonstration purposes.
              </Alert>
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={btnLoading}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;