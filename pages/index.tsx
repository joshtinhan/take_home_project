import { useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Card, Typography } from '@arco-design/web-react';
import { getUserList, setIsShowModal } from '@/lib/store/slices/appSlice';
import { IRandomName } from '@/lib/store/sagas/rootSaga';
import { useAppSelector, useAppDispatch } from '@/lib/store/hook';
import { CounterWidget } from '@/components/CounterWidget';
import NameList from '@/components/NameList';
import { DefaultTemplate } from '@/components/DefaultTemplate';

const ModalDynamic = dynamic(() => import('@arco-design/web-react').then((mod) => mod.Modal));

const ModalContentWrapper = styled(ModalDynamic)`
  .arco-modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function ModalContent ({ user }: { user: IRandomName }) {
  return (
    <Card
      className="card-with-icon-hover"
      style={{ width: 360 }}
      cover={
        <div style={{ height: 204, overflow: 'hidden' }}>
          <Image
            style={{ width: '100%', transform: 'translateY(-20px)' }}
            alt="user"
            src={user.picture.large}
            width={360}
            height={204}
          />
        </div>
      }
    >
      <Card.Meta
        title={<Typography.Text>{`${user.name.first} ${user.name.last}`}</Typography.Text>}
      />
    </Card>

  );
}

export default function Home () {
  const userList = useAppSelector((state) => state.app.userList);
  const isShowModal = useAppSelector((state) => state.app.isShowModal);
  const drawResult = useAppSelector((state) => state.app.drawResult);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserList());
  }, []);

  return (
    <>
      <ModalContentWrapper
        title="Basic Modal"
        visible={isShowModal}
        onOk={() => {
          dispatch(setIsShowModal(false));
        }}
        onCancel={() => {
          dispatch(setIsShowModal(false));
        }}
      >
        {drawResult !== null && <ModalContent user={userList[drawResult]} />}
      </ModalContentWrapper>
      <DefaultTemplate>
        <div>
          <Typography.Title>抽獎時間</Typography.Title>
          <CounterWidget userList={userList} />
        </div>
        <NameList userList={userList} />
      </DefaultTemplate>
    </>
  );
}
