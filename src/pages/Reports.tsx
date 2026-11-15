import { Flex } from '@chakra-ui/react';

import { usePageTitle } from '@/shared/hooks';
import { PageHeader } from '@/shared/ui/PageHeader';

export default function ReportsPage() {
  const title = usePageTitle();
  return (
    <Flex>
      <PageHeader title={title} />
    </Flex>
  );
}
