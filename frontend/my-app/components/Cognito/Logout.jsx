import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const SignOutView = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={0} alignItems='center' direction="column">
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
