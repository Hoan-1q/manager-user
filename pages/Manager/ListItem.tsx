import React from 'react';
import { observer } from 'mobx-react';
import { IUserModelOut } from 'stores/model/User';
import { ButtonGroup, Icon, Modal, TextContainer } from '@shopify/polaris';
// import { Button, ButtonGroup } from '@shopify/polaris';
import {
  DeleteMajor, EditMajor
} from '@shopify/polaris-icons';
import Link from 'next/link';
import { StoreContext } from 'stores';

type Props = {
  data: IUserModelOut,
  index: number
};

const ListItem: React.FC<Props> = observer(({ data, index }) => {
  const [onDelete, setOnDelete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { deleteUser } = React.useContext(StoreContext);
  const handleDelete = () => {
    setOnDelete(!onDelete)
  }
  const handleAcceptDelete = async() => {
    setIsLoading(true);
    await deleteUser(data._id);
    setOnDelete(false)
    setIsLoading(false)
  }
  return (
    <>
     <tr className="Polaris-DataTable__TableRow" key={index}>
        <td className="Polaris-DataTable__Cell"
          style={{ width: '10%' }}
        >
          <div>
            {data.displayName}
          </div>
        </td>
        <td className="Polaris-DataTable__Cell"
          style={{ width: '10%' }}
        >
          <div>
            {data.password}
          </div>
        </td>
        <td className="Polaris-DataTable__Cell"
          style={{ width: '10%' }}
        >
          <div>
            {data.email}
          </div>
        </td>
        <td className="Polaris-DataTable__Cell"
          style={{ width: '10%' }}
        >
          <ButtonGroup>
            <Link
              href="/user/[id]"
              as={`/user/${data._id}`}
            >
              <a>
                <Icon
                  source={EditMajor}
                  color="base"
                />
              </a>
            </Link>
            <div
              onClick={handleDelete}
            >
              <Icon
                source={DeleteMajor}
                color="base"
              />
            </div>
          </ButtonGroup>
        </td>
      </tr>
      <Modal
        open={onDelete}
        onClose={() => setOnDelete(false)}
        title="Warning"
        primaryAction={{
          content: 'Accept',
          loading: isLoading,
          onAction: handleAcceptDelete,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setOnDelete(false),
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p> Are you sure you want to delete this account? </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
});

export { ListItem };
