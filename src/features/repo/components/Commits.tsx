import { octokit } from '@/lib/octokit';
import { Text, HStack, List, ListItem, Button } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import { formatDistanceToNow } from 'date-fns';
import { Fragment, useEffect } from 'react';

interface Props {
  userName: string;
  repo: string;
  isBottom: boolean;
}
const Commits = ({ userName, repo, isBottom }: Props) => {
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    ['commits', repo, userName],
    async ({ pageParam = 1 }) => {
      const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: userName as string,
        repo: repo as string,
        page: pageParam,
      });
      return data;
    },

    {
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );

  useEffect(() => {
    if (isBottom) fetchNextPage();
  }, [isBottom, fetchNextPage]);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <>
      <Button></Button>
      <List as="ul" w="100%" pt="4" spacing="1">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.map(({ sha, commit }) => (
              <ListItem
                key={sha}
                w="100%"
                p="4"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
              >
                <Text fontWeight="700" color="primary">
                  {commit.message}
                </Text>
                <HStack>
                  <Text fontWeight="700" fontSize="xs">
                    {commit.author?.name}
                  </Text>
                  {commit.author?.date && (
                    <Text fontSize="xs">
                      commited{' '}
                      {formatDistanceToNow(new Date(commit.author.date), { addSuffix: true })}
                    </Text>
                  )}
                </HStack>
              </ListItem>
            ))}
          </Fragment>
        ))}
      </List>
    </>
  );
};

export default Commits;
