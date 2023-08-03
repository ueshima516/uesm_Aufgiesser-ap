import Link from 'next/link';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LOGO from '@/public/images/Fotshow-all.svg';

const SignOutView = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={0} alignItems='center' direction="column">
        <Grid item>
          <Box
            component="span"
            sx={{
              height: 80,
              my: 1,
              display: 'flex',
            }}
          >
            <Image src={LOGO} width={250} alt={"Fitshow"} />
          </Box>
        </Grid>
        <Grid item>
          <h1>ログアウト状態です</h1>
        </Grid>
        <Grid item>
          <Link href="/login" passHref>
            <Button variant='contained'>ログイン画面へ戻る</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignOutView;
