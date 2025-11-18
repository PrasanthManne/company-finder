import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 4,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © 2025 Company Finder. Built with React & Material UI.
          </Typography>
        </Container>
      </Box>
  );
};

export default Footer;
