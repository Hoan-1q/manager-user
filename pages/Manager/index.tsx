import { Card, Page } from '@shopify/polaris';
import { observer } from 'mobx-react';
import React from 'react';
import router from 'next/router';
import { StoreContext } from 'stores';
import { ListItem } from './ListItem';

const Manager: React.FC = () => {
  const { listUser, getUsers } = React.useContext(StoreContext);
  const headListRender = ['Name', 'Password', 'Email', 'Operation']
  React.useEffect(() => {
    async function fetchData() {
      await getUsers();
    }
    fetchData();
  }, []);

  console.log(listUser);


  return (
    <Page
      title="List User"
      primaryAction={{content: 'Add user' , onAction: () => {router.push('/user/new');}, primary: 'true' }}
    >
      <Card>
        <div className="Polaris-DataTable">
          <div className="Polaris-DataTable__ScrollContainer">
            <table className="Polaris-DataTable__Table">
                <thead>
                <tr>
                  {headListRender.map((headItem, index) => (
                    <th
                      key={index}
                      data-polaris-header-cell="true"
                      className="Polaris-DataTable__Cell Polaris-DataTable__Cell--header"
                    >
                      {headItem}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listUser.map((user, index) => (
                  <ListItem data={user} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </Page>
  )
}

export default observer(Manager);