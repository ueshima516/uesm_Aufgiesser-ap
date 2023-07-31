import { SendButton } from "@/components/MaterialUI/CustomizedComponents";
import SendIcon from '@mui/icons-material/Send';

export default function MUI () {
  return (
    <>
      <SendButton endIcon={<SendIcon />}>送信</SendButton>
    </>
  );
};
