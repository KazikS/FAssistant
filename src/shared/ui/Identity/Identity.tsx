import { Flex, Heading, Text } from '@chakra-ui/react';

import { avatarLetters } from './lib/avatarLetters';

type IdentityProps = {
  title: string;
  subtitle: string;
  bgColor?: string;
  px?: string;
};

export const Identity = ({ title, subtitle, bgColor, px }: IdentityProps) => {
  const letters = avatarLetters(title);
  return (
    <Flex gap="16px" alignItems="center" py="2" px={px} bgColor={bgColor} rounded="xl" as="article">
      <Flex
        w="46px"
        h="46px"
        fontWeight="700"
        bgColor="accent.primary"
        rounded="xl"
        color="accent.contrast"
        alignItems="center"
        justifyContent="center"
      >
        {letters.join('')}
      </Flex>
      <Flex flexDirection="column">
        <Heading fontSize="xl" color="text.onBrand">
          {title}
        </Heading>
        <Text color="text.onBrandSubtle">{subtitle}</Text>
      </Flex>
    </Flex>
  );
};
