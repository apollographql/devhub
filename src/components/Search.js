import React, {useEffect, useMemo, useRef, useState} from 'react';
import striptags from 'striptags';
import {
  Box,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useEventListener
} from '@chakra-ui/core';
import {Link as GatsbyLink, graphql, navigate, useStaticQuery} from 'gatsby';
import {IconArrowLeft} from '@apollo/space-kit/icons/IconArrowLeft';
import {IconSearch} from '@apollo/space-kit/icons/IconSearch';
import {Index} from 'elasticlunr';

export default function Search() {
  const data = useStaticQuery(
    graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `
  );

  const inputRef = useRef();
  const [inputFocus, setInputFocus] = useState(false);
  const [inputShown, setInputShown] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function showInput() {
    setInputShown(true);
    setInputValue('');
    inputRef.current.focus();
  }

  function hideInput() {
    setInputShown(false);
    inputRef.current.blur();
  }

  useEventListener('keydown', event => {
    if (event.key === '/' && !inputShown) {
      event.preventDefault();
      showInput();
    }
  });

  // create elasticlunr index and memoize results
  const index = useRef(Index.load(data.siteSearchIndex.index));
  const results = useMemo(
    () =>
      index.current
        .search(inputValue, {expand: true})
        .map(({ref}) => index.current.documentStore.getDoc(ref)),
    [inputValue]
  );

  const [selectedIndex, setSelectedIndex] = useState(null);
  useEffect(() => {
    // zero-out selected index if we have results
    setSelectedIndex(results.length ? 0 : null);
  }, [results]);

  function handleInputKeyDown(event) {
    if (event.key === 'Escape') {
      hideInput();
    } else {
      const hasSelection = Number.isInteger(selectedIndex);
      const isArrowDown = event.key === 'ArrowDown';
      if (isArrowDown || event.key === 'ArrowUp') {
        if (hasSelection) {
          // if we have a selection, increment/decrement it
          setSelectedIndex(prevSelectedIndex => {
            const nextSelectedIndex =
              prevSelectedIndex + (isArrowDown ? 1 : -1);
            return Math.min(Math.max(0, nextSelectedIndex), results.length - 1);
          });
        } else {
          // otherwise, set it to index 0
          setSelectedIndex(0);
        }
      } else if (hasSelection && event.key === 'Enter') {
        // if return key is pressed on a selected result, navigate to that page
        const {slug} = results[selectedIndex];
        navigate('/collection/' + slug);
      }
    }
  }

  return (
    <>
      <IconButton
        ml={{
          base: 2,
          md: 5
        }}
        variant="ghost"
        borderRadius="full"
        isDisabled={inputShown}
        pointerEvents={inputShown && 'none'}
        icon={<Box as={IconSearch} h="1em" />}
        onClick={showInput}
      />
      <Box
        w="0"
        mr={{
          base: 2,
          md: 5
        }}
        position="relative"
        transition="all 250ms"
        style={{flexGrow: Number(inputShown)}}
      >
        <InputGroup size="sm" variant="flushed" overflow="hidden">
          <Input
            _focus={{borderColor: 'indigo.300'}}
            ref={inputRef}
            fontSize="md"
            placeholder="Search collections"
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            onKeyDown={handleInputKeyDown}
          />
          <InputRightElement>
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="indigo"
              icon={<Box as={IconArrowLeft} h="1em" />}
              onClick={hideInput}
            />
          </InputRightElement>
        </InputGroup>
        {inputValue && inputFocus && (
          <Box
            w="full"
            mt="2"
            boxShadow="lg"
            borderRadius="lg"
            position="absolute"
            top="100%"
            left="0"
            bg="white"
            overflow="hidden"
            onMouseDown={event => event.preventDefault()}
          >
            {results.length > 0 ? (
              results.map((result, index) => (
                <Box
                  display="block"
                  as={GatsbyLink}
                  to={'/collection/' + result.slug}
                  p="4"
                  key={result.id}
                  bg={selectedIndex === index && 'gray.50'}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseLeave={() => setSelectedIndex(null)}
                >
                  <Heading as="h4" fontSize="xl">
                    {result.title}
                  </Heading>
                  <Text
                    textStyle="clamped"
                    css={{WebkitLineClamp: 2}}
                    color="gray.500"
                  >
                    {striptags(result.excerpt)}
                  </Text>
                </Box>
              ))
            ) : (
              <Box px="4" py="3">
                No results found
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
