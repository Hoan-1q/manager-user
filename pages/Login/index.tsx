import React from 'react';
import { Button, FormLayout, Frame, TextField, Toast } from '@shopify/polaris';
import { useRouter } from 'next/router';
import { StoreContext } from 'stores';
import styles from './login.module.css';

const Login: React.FC = () => {
  const { onLogin } = React.useContext(StoreContext);
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openToast, setOpenToast] = React.useState(false);

  const handleLogin = async () => {
    const res = onLogin(username, password);
    if (res === 'done') {
      router.push('/Manager');
    } else {
      setOpenToast(true);
    }
  }


  return (
    <div className={styles.login} >
      <FormLayout>
        <TextField label="" value={username} placeholder="Username" onChange={setUsername} />
        <TextField type="password" value={password} placeholder="Password" label="" onChange={setPassword} />
        <Button primary onClick={handleLogin} >Login</Button>
      </FormLayout>
      <Frame>
        {openToast ? (
          <Toast content="Invalid username or password" onDismiss={() => setOpenToast(false)} />
        ) : null}
      </Frame>
    </div>
  )
}

export { Login }