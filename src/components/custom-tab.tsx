import {Box, Drawer, Tab, Tabs} from "@mui/material";
import React, {useState} from "react";
import {BloggerInfo} from "~src/components/blogger-info";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  tabValue: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const {children, tabValue, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabValue === index && <Box>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function TabList(props: { value: number, onChange: (event: React.SyntheticEvent, newValue: number) => void }) {
  return <Box sx={{borderBottom: 1, borderColor: "divider"}}>
    <Tabs value={props.value} onChange={props.onChange} aria-label="basic tabs example">
      <Tab label="博主信息" {...a11yProps(0)} />
      <Tab label="笔记数据" {...a11yProps(1)} />
      <Tab label="Item Three" {...a11yProps(2)} />
    </Tabs>
  </Box>;
}

export const CustomTab = (props: { open: boolean, onClose: () => void }) => {
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return <Drawer
    anchor="bottom"
    open={props.open}
    onClose={props.onClose}
    PaperProps={{
      sx: {width: "100%", height: "80%"}
    }}
  >
    <TabList value={tabValue} onChange={handleChange}/>
    <CustomTabPanel tabValue={tabValue} index={0}>
      <BloggerInfo/>
    </CustomTabPanel>
    <CustomTabPanel tabValue={tabValue} index={1}>
      Item Two
    </CustomTabPanel>
    <CustomTabPanel tabValue={tabValue} index={2}>
      Item Three
    </CustomTabPanel>
  </Drawer>
}