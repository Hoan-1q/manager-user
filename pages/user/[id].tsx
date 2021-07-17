import React from 'react';
import { PageActions, Page, Card, TextField, Checkbox } from '@shopify/polaris';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { StoreContext } from 'stores';

const EditUser: React.FC = () => {
  const { user, getUserByID, addUser } = React.useContext(StoreContext);
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    displayName, setName,
    email, setEmail,
    disable, toggleDisable,
    password, setPassword
  } = user;
  const router = useRouter();
  const isReadyRouter = router.isReady;
  const { id } = router.query;
  console.log(id);

  React.useEffect(() => {
    if (isReadyRouter) {
      (async () => {
        try {
          if (id !== 'new') {
            await getUserByID(id);
          }
          return;
        } catch {
          // setContent("Can't fetch upsell!", true);
        }
      })();
    }
    // return () => resetStoreUpsell();
  }, [isReadyRouter]);

  const handleSaveUpsell = async () => {
    setIsLoading(true);
    await addUser(id !== 'new' ? id as string : 'new');
    setIsLoading(false);
    router.push('/Manager');
  };

  return (
    <Page
      title={id === 'new' ? 'New upsell' : `Edit `}
      breadcrumbs={[{content: 'Manager', url: '/Manager'}]}
    >
      <Card>
        <Card.Section>
          <TextField
            label="Name"
            value={displayName}
            onChange={setName}
          />
          <br />
          <TextField
            label="Email"
            value={email}
            type="email"
            onChange={setEmail}
          />
          <br />
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={setPassword}
          />
          <br />
          <Checkbox
            label="Disnable account"
            checked={disable}
            onChange={toggleDisable}
          />
        </Card.Section>
      </Card>
      <PageActions
        primaryAction={{
          content: 'Save',
          loading: isLoading,
          onAction: () => { handleSaveUpsell()},
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => { router.push('/Manager'); },
          },
        ]}
      />
    </Page>
  );
};

export default observer(EditUser);
