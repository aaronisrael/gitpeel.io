import { octokit } from '@/lib/octokit';
import { VStack, Text, LinkBox, Box, HStack, Divider, useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface Props {
  userName: string;
}
const Repos = ({ userName }: Props) => {
  const toast = useToast();
  const { data, isLoading, isError } = useQuery(
    ['user', userName],
    async () => {
      const { data } = await octokit.request('GET /users/{username}/repos', {
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

  const sortOnDate = (a: string, b: string) => {
    return new Date(b).getTime() - new Date(a).getTime();
  };

  if (isLoading) return null;
  if (isError) return null;

  return (
    <VStack as="ul" w="100%" pt="4">
      {data
        ?.sort((a, b) => {
          if (a.updated_at && b.updated_at) return sortOnDate(a.updated_at, b.updated_at);
          return 0;
        })
        ?.map(({ name, updated_at, language, id }) => (
          <LinkBox
            as={Link}
            to={name}
            key={id}
            p="4"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            w="100%"
            _hover={{ boxShadow: '0px 0px 12px 2px #379ad857' }}
          >
            <HStack
              divider={
                <Box height="10px">
                  <Divider dir="vertical" orientation="vertical" opacity="1" borderColor="black" />
                </Box>
              }
              color="gray.600"
              spacing="2"
            >
              {updated_at && (
                <Text fontSize="sm">
                  last updated: {formatDistanceToNow(new Date(updated_at), { addSuffix: true })}
                </Text>
              )}
              {language && <Text fontSize="sm">main language: {language}</Text>}
            </HStack>
            <Text fontWeight="900" fontSize="xl" color="primary">
              {name}
            </Text>
          </LinkBox>
        ))}
    </VStack>
  );
};

export default Repos;
