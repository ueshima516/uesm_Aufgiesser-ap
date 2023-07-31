import React from 'react';
import Button from '@mui/material/Button';


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


export { SendButton };
