import React from 'react';
import { Box, Typography, Link, Stack, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#ccc',
        py: 4,
        px: 2,
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Typography variant="h6" color="white" gutterBottom>
        CryptoEngine
      </Typography>
      <Typography variant="body2" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
        Secure. Fast. Reliable. Your gateway to decentralized finance.
      </Typography>

      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ mb: 2 }}
      >
        <Link href="/about" underline="hover" color="inherit">About</Link>
        <Link href="/docs" underline="hover" color="inherit">Docs</Link>
        <Link href="/support" underline="hover" color="inherit">Support</Link>
        <Link href="/privacy" underline="hover" color="inherit">Privacy</Link>
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <IconButton href="https://twitter.com" color="inherit">
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://github.com" color="inherit">
          <GitHubIcon />
        </IconButton>
        <IconButton href="https://linkedin.com" color="inherit">
          <LinkedInIcon />
        </IconButton>
      </Stack>

      <Typography variant="caption" color="text.secondary">
        &copy; {new Date().getFullYear()} CryptoEngine. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
