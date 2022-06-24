import { octokit } from '@/lib/octokit';
import {
  Avatar,
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
import Repos from '@/features/user/components/Repos';

const Detail = () => {
  const { userName } = useParams<{ userName: string }>();
  const toast = useToast();
  const { data, isLoading, isError } = useQuery(
    ['repos', userName],
    async () => {
      const { data } = await octokit.request('GET /users/{username}', {
        username: userName as string,
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
    <VStack p="6" spacing="1">
      <Avatar src={data?.avatar_url} name={userName} size="2xl" />
      <Text fontWeight="900" fontSize="3xl" color="primary">
        {data?.name}
      </Text>
      {data?.bio && <Text color="gray.600">{data?.bio}</Text>}
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Search
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{userName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box width="100%">
        <Divider mt="4" color="primary" opacity="1" />
      </Box>
      <Repos userName={userName as string} />
    </VStack>
  );
};

export default Detail;
