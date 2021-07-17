import React from 'react';
import { observer } from 'mobx-react';
import { IUserModelOut } from 'stores/model/User';
import { ButtonGroup, Icon } from '@shopify/polaris';
// import { Button, ButtonGroup } from '@shopify/polaris';
import {
  DeleteMajor, EditMajor
} from '@shopify/polaris-icons';
import Link from 'next/link';

type Props = {
  data: IUserModelOut,
  index: number
};

const ListItem: React.FC<Props> = observer(({ data, index }) => {

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
            <Icon
              source={DeleteMajor}
              color="base"
            />
          </ButtonGroup>
        </td>
        {/* <TableTd
          style={{ width: '30%' }}
        >
          <ButtonGroup>
            <Link
              href="/upsell/[id]"
              as={`/upsell/${_id}`}
            >
              <a className={styles.upselltitle}>
                <Button
                  outline
                  size="slim"
                >
                  Edit
                </Button>
              </a>
            </Link>
            <Button
              destructive
              outline
              size="slim"
              onClick={openDeleteModal}
            >
              Delete
            </Button>
          </ButtonGroup>
        </TableTd> */}
      </tr>
    </>
  );
});

export { ListItem };
