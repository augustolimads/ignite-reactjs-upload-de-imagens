import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type PageParam = number;
type FetchPage = {
  pageParam?: PageParam;
};
type DataItem = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};
type DataParams = {
  data: DataItem[];
  after: any;
};

export default function Home(): JSX.Element {
  const fetchPage = async ({
    pageParam = null,
  }: FetchPage): Promise<DataParams> => {
    return (
      await api.get(`/api/images`, {
        params: {
          after: pageParam,
        },
      })
    ).data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchPage, {
    getNextPageParam: lastPage => {
      if (lastPage.after) {
        return lastPage.after;
      }
      return null;
    },
  });

  const formattedData = useMemo(() => {
    return (
      data?.pages.reduce((acc, curr) => {
        return [...acc, ...curr?.data];
      }, []) || []
    );
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
