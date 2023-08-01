import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LogoutIcon from '@mui/icons-material/Logout';
import { LinkIconButton } from "@/components/MaterialUI/CustomizedComponents";

export default function MUI() {
  return (
    <Container component="main" maxWidth="sm"
      // sx={{ bgcolor: '#cfe8fc' }}
    >
      <Box
        component="span"
        sx={{
          height: 50,
          my: 1,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          // bgcolor: '#FAFAD2',
        }}
      >
        FitShow
      </Box>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          // bgcolor: '#FAFAD2',
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
          onClick={() => {
            alert('clicked');
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Stack>
    </Container>
  );
}