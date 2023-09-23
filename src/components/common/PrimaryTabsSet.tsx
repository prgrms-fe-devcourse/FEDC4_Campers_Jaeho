import { ReactNode } from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  TypographyProps,
  LayoutProps,
} from '@chakra-ui/react';

type PrimaryTabsSetProps = {
  tabIndex: number;
  handleTabsChange: (index: number) => void;
  tabTexts: string[];
  tabPanelChildrens: ReactNode[];
  tabsMinH?: LayoutProps['minH'];
  tabTextFontWeight?: TypographyProps['fontWeight'];
  tabTextFontSize?: TypographyProps['fontSize'];
};

const PrimaryTabsSet = ({
  tabIndex,
  handleTabsChange,
  tabTexts,
  tabPanelChildrens,
  tabsMinH,
  tabTextFontWeight = 550,
  tabTextFontSize = 'lg',
}: PrimaryTabsSetProps) => {
  return (
    <Tabs minH={tabsMinH} index={tabIndex} onChange={handleTabsChange}>
      <TabList borderBottom="none" justifyContent="center">
        {tabTexts.map((tabText, index) => (
          <Tab key={index} color="green.400">
            <Text
              fontSize={tabTextFontSize}
              fontWeight={tabTextFontWeight}
              color={tabIndex === index ? 'green.400' : 'blackAlpha.600'}
            >
              {tabText}
            </Text>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabPanelChildrens.map((tabPanelChildren, index) => (
          <TabPanel key={index}>{tabPanelChildren}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default PrimaryTabsSet;
