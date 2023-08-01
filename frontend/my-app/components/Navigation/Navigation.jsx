import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LogoutIcon from '@mui/icons-material/Logout';
import { LinkIconButton } from "@/components/MaterialUI/CustomizedComponents";
import { useAuth } from '@/components/Cognito/UseAuth';

function Navigation() {
  const auth = useAuth();

  const executeSignOut = async () => {
    const result = await auth.signOut();

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={6}>

          <Box
            component="span"
            sx={{
              height: 24,
              my: 1,
              alignItems: 'center',
              justifyContent: 'fix-start',
              display: 'flex',
            }}
          >
            {/* FitShow */}
            <h1 style={{ color: '#33CC66', fontFamily: 'Arial, sans-serif', fontSize: '36px' }}>FitShow</h1>
          </Box>

        </Grid>
        <Grid item xs>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
          >
            <LinkIconButton
              aria-label="home"
              href="/"
              sx={{ color: 'black', backgroundColor: 'aquamarine' }}
            >
              <HomeIcon />
            </LinkIconButton>
            <LinkIconButton
              aria-label="calendar"
              href="/calendar"
              sx={{ color: 'black', backgroundColor: 'aquamarine' }}
            >
              <CalendarMonthIcon />
            </LinkIconButton>
            <LinkIconButton
              aria-label="plan"
              href="/plan"
              sx={{ color: 'black', backgroundColor: 'aquamarine' }}
            >
              <EditCalendarIcon />
            </LinkIconButton>
            <LinkIconButton
              aria-label="analysis"
              href="/analysis"
              sx={{ color: 'black', backgroundColor: 'aquamarine' }}
            >
              <QueryStatsIcon />
            </LinkIconButton>
            <IconButton
              aria-label="logout"
              sx={{ color: 'black', backgroundColor: 'aquamarine' }}
              onClick={executeSignOut}
            >
              <LogoutIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Navigation;
