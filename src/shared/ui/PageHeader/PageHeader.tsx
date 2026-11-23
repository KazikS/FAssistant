import { Flex, Heading, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type PageHeaderProps = {
  title?: string;
  subtitle?: string;
  endContent?: ReactNode;
};

export const PageHeader = ({ title, subtitle, endContent }: PageHeaderProps) => {
  return (
    <Flex mb="3" gap="3" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        {title && <Heading>{title}</Heading>}
        {subtitle && <Text textStyle="subtle">{subtitle}</Text>}
      </Flex>
      {endContent}
    </Flex>
  );
};
