import React from 'react';
import Link from 'next/link';
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


const SendButton = (props) => {
  return (
    <Button
      variant='contained'
      sx={{
        color: "#000000",
        backgroundColor: "#90EE90 !important",
        borderRadius: 2,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

const LinkIconButton = ({ href, children, ...rest }) => {
  return (
    <Link href={href} passHref>
      <IconButton {...rest}>
        {children}
      </IconButton>
    </Link>
  )
}


export { SendButton, LinkIconButton };
