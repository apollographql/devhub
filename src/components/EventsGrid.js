import React from 'react';
import parse, {attributesToProps, domToReact} from 'html-react-parser';
import querystring from 'querystring';
import {
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from '@chakra-ui/core';
import {FaTwitch} from 'react-icons/fa';
import {format, toDate} from 'date-fns-tz';
import {graphql, useStaticQuery} from 'gatsby';

export default function EventsGrid() {
  const data = useStaticQuery(
    graphql`
      query ListCalendarEvents {
        allCalendarEvent(limit: 6) {
          nodes {
            id
            description
            summary
            location
            start {
              dateTime
              timeZone
              startDate: dateTime(formatString: "YYYYMMDDTHHmmSS")
            }
            end {
              dateTime(formatString: "YYYYMMDDTHHmmSS")
            }
          }
        }
      }
    `
  );
  return (
    <Grid
      gap="8"
      templateColumns="repeat(auto-fill, minmax(290px, 1fr))"
      mb="12"
    >
      {data.allCalendarEvent.nodes.map(event => {
        const date = toDate(event.start.dateTime, {
          timeZone: event.start.timeZone
        });
        const match = event.location?.match(/^twitch.tv\/(\w+)$/);
        const query = querystring.stringify({
          action: 'TEMPLATE',
          text: event.summary,
          dates: event.start.startDate + `Z/${event.end.dateTime}Z`,
          details: event.description,
          location: event.location
        });
        return (
          <Flex
            direction="column"
            key={event.id}
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            bg="white"
          >
            <Heading mb="2" textStyle="subheading" fontSize="xs" as="h6">
              {/* March 1, 2021 @ 2pm-5pm */}
              {format(date, 'PP @ p zzz')}
            </Heading>
            <Heading mb="1" fontSize="2xl">
              {event.summary}
            </Heading>
            <Text mb="4">
              {/* TODO: parse twitter usernames and link them */}
              {parse(
                event.description.replace(
                  /@(\w+)/g,
                  '<a href="https://twitter.com/$1">@$1</a>'
                ),
                {
                  replace(domNode) {
                    if (domNode.name === 'a') {
                      const props = attributesToProps(domNode.attribs);
                      return (
                        <Link
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="indigo.500"
                        >
                          {domToReact(domNode.children)}
                        </Link>
                      );
                    }
                  }
                }
              )}
            </Text>
            <ButtonGroup mt="auto" size="sm">
              <Button
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href={'https://calendar.google.com/calendar/render?' + query}
              >
                Add to calendar
              </Button>
              {match && (
                <Button
                  colorScheme="purple"
                  variant="ghost"
                  leftIcon={<FaTwitch />}
                  as="a"
                  href={'https://twitch.tv/' + match[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow
                </Button>
              )}
            </ButtonGroup>
          </Flex>
        );
      })}
    </Grid>
  );
}
