import { octokit } from '@/lib/octokit';
import {
  VStack,
  Text,
  Divider,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Commits from '../components/Commits';
import { useIsScrolledToBottom } from '../hooks/useIsScrolledToBottom';

const Detail = () => {
  const [setBottomRef, isBottom] = useIsScrolledToBottom();
  const toast = useToast();
  const { userName, repo } = useParams<{ userName: string; repo: string }>();
  const { data, isLoading, isError } = useQuery(
    ['repo', repo],
    async () => {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: userName as string,
        repo: repo as string,
      });
      return data;
    },
    {
      onError: (err: { message: string }) =>
        toast({
          title: 'An error occurred',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        }),
    }
  );

  if (isLoading) return null;
  if (isError) return null;

  return (
    <VStack p="6" spacing="1" overflow="auto" height="100vh">
      <Text fontWeight="900" fontSize="3xl" color="primary">
        {data?.name}
      </Text>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Search
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={`/${userName}`}>
            {userName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{repo}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box width="100%">
        <Divider mt="4" color="primary" opacity="1" />
      </Box>
      <Commits userName={userName as string} repo={repo as string} isBottom={isBottom} />
      <div ref={setBottomRef} />
    </VStack>
  );
};

export default Detail;
