import dynamic from 'next/dynamic';
import Image from 'next/image';
import styled from 'styled-components';
import { Typography } from '@arco-design/web-react';
import { IRandomName } from '@/lib/store/sagas/rootSaga';

const DynamicList = dynamic(() => import('@arco-design/web-react').then((mod) => mod.List));

const DynamicListItem = dynamic(() => import('@arco-design/web-react').then((mod) => mod.List.Item));

const DynamicListItemMeta = dynamic(() => import('@arco-design/web-react').then((mod) => mod.List.Item.Meta));

const DynamicAvatar = dynamic(() => import('@arco-design/web-react').then((mod) => mod.Avatar));

const ItemMetaWrapper = styled(DynamicListItemMeta)`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const NameListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function NameList ({ userList }: { userList: IRandomName[] }) {
  return (
    <NameListWrapper>
      <Typography.Title>參與抽獎名單</Typography.Title>
      <DynamicList
        dataSource={userList?.map(({ name, picture }) => ({
          title: name.first + name.last,
          avatar: (
            <DynamicAvatar style={{ backgroundColor: 'transparent' }} shape="circle" size={40}>
              <Image
                alt="avatar"
                src={picture.thumbnail}
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
            </DynamicAvatar>
          ),
        }))}
        render={(item, i) => (
          <DynamicListItem key={i}>
            <ItemMetaWrapper
              description={item.title}
              avatar={item.avatar}
            />
          </DynamicListItem>
        )}
        style={{ maxHeight: 400, overflowY: 'scroll' }}
        loading={userList.length === 0}
        noDataElement="No data"
      />
    </NameListWrapper>
  );
}
