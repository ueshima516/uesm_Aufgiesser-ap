import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


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
