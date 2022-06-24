import { useState } from 'react';
import { Container, Flex, Text, HStack, Avatar } from '@chakra-ui/react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { octokit } from '@/lib/octokit';
import Header from '@/features/landing/components/Header';
import { Link, useNavigate } from 'react-router-dom';

interface SearchItem {
  avatar_url: string;
  id: number;
  login: string;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<SearchItem[]>([]);

  const handleOnSearch = async (string: string) => {
    const { data } = await octokit.request('GET /search/users', { q: string });
    if (!data) return [];
    setItems(data.items.map(({ avatar_url, id, login }) => ({ avatar_url, id, login })));
  };

  const handleOnSelect = (item: SearchItem) => {
    navigate(`/${item.id}`);
  };

  const formatResult = (item: SearchItem) => {
    return (
      <>
        {/* Link doesn't work here bc the autocomplete uses prevent default */}
        <HStack as={Link} to={`/${item.id}`} _hover={{ cursor: 'pointer' }}>
          <Avatar src={item.avatar_url} size="sm" />
          <Text>{item.login}</Text>
        </HStack>
      </>
    );
  };

  return (
    <Flex h="100vh" alignItems="center">
      <Container maxW="2xl">
        <Header />
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          formatResult={formatResult}
          fuseOptions={{ keys: ['login'] }}
          resultStringKeyName="login"
          onSelect={handleOnSelect}
          styling={{
            zIndex: 9,
            '.sc-hKMtZM': { backgroundColor: 'red' },
          }}
          placeholder="Search for a github username"
          inputDebounce="250"
        />
      </Container>
    </Flex>
  );
};

export default LandingPage;
