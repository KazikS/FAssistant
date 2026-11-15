import { Button, Flex, Heading, Text } from '@chakra-ui/react';

type PageHeaderProps = Partial<{
  title: string;
  subtitle: string;
  btnText: string;
  btnAction: () => void;
}>;

export const PageHeader = ({ title, subtitle, btnAction, btnText }: PageHeaderProps) => {
  return (
    <Flex mb="3" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        {title && <Heading>{title}</Heading>}
        {subtitle && <Text textStyle="subtle">{subtitle}</Text>}
      </Flex>
      {btnText && btnAction && (
        <Button
          onClick={() => btnAction()}
          bgColor="accent.primary"
          color="text.onAccent"
          rounded="2xl"
          display={{ base: 'none', md: 'flex' }}
          textStyle="control"
          _hover={{ opacity: '0.9' }}
        >
          {btnText}
        </Button>
      )}
    </Flex>
  );
};
