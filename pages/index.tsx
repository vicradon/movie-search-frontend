import { Fragment, useEffect, useState } from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Input,
  Skeleton,
  SkeletonText,
  Box,
  Flex,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { searchByTitle } from "../api/movies";
import { useErrorHandler } from "../src/utils/hooks";

function Index() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [queryTime, setQueryTime] = useState(null);
  const [fetchCached, setFetchCached] = useState(false);
  const handleError = useErrorHandler();

  useEffect(() => {
    if (query) {
      setLoading(true);
      setMovies([]);

      searchByTitle({ title: query, fetchCached })
        .then(({ data }) => {
          setLoading(false);
          setMovies(data.movies);
          setQueryTime(data.duration_in_milliseconds);
        })
        .catch((error) => {
          handleError(error);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <Box
      backgroundImage="linear-gradient(to bottom, rgba(6, 7, 7, 0.8), rgba(22, 20, 22, 0.73)), url(/images/cover.png)"
      minHeight="100vh"
      pb="2rem"
    >
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 15, md: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color="white"
          >
            Find movies{" "}
            <Text as={"span"} color={"teal.400"}>
              from 2006
            </Text>
          </Heading>

          <Input
            size="lg"
            placeholder="Search by title, e.g. Bird"
            mb="1rem"
            name="query"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            type="search"
            width={{ base: "90vw", md: "600px" }}
            bg="white"
          />
        </Stack>

        <Flex justify="flex-end">
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme="blue" rightIcon={<FaFilter />}>
              Filters
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                onChange={(activeItems) => {
                  setFetchCached(activeItems.includes("fetchCached"));
                }}
                title="Query Options"
                type="checkbox"
              >
                <MenuItemOption value="fetchCached">
                  Fetch Cached
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>

        {!query && !loading && (
          <Text color="white" textAlign="center" mb="1rem">
            Search results will appear here
          </Text>
        )}

        {query && (
          <Text mb="1rem" color="white">
            {movies.length} results in {queryTime} milliseconds
          </Text>
        )}

        {loading && (
          <Fragment>
            {[1, 2, 3].map((num) => {
              return (
                <Box key={num} mb="3rem">
                  <Skeleton height="20px" />
                  <SkeletonText mt="4" noOfLines={2} spacing="4" />
                </Box>
              );
            })}
          </Fragment>
        )}

        {movies.map((movie) => {
          return (
            <Box bg="white" mb="1.5rem" p="1.5rem" shadow="sm" key={movie.id}>
              <Heading mb=".5rem" size="md">
                {movie.title}
              </Heading>
              <Text>{movie.description}</Text>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}

export default Index;
