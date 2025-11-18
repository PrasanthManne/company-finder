import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <BusinessIcon sx={{ mr: 1, fontSize: 32 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '-0.02em',
            }}
            onClick={() => navigate('/')}
          >
            Company Finder
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => navigate('/')}
              sx={{
                fontWeight: location.pathname === '/' ? 700 : 500,
                borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
                borderRadius: 0,
                px: 2,
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/companies')}
              sx={{
                fontWeight: location.pathname === '/companies' ? 700 : 500,
                borderBottom: location.pathname === '/companies' ? '2px solid white' : 'none',
                borderRadius: 0,
                px: 2,
              }}
            >
              Companies
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
