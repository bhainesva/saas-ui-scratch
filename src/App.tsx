import React, { useEffect, useMemo, useRef, useState } from "react";
import { LoremIpsum } from "lorem-ipsum";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  CloseButton,
} from "@chakra-ui/react";
import {
  AppShell,
  StructuredListHeader,
  EmptyState,
  StructuredList,
  StructuredListItem,
  StructuredListCell,
  PersonaAvatar,
  SaasProvider,
  NavItem,
  Sidebar,
  SidebarSection,
  Navbar,
} from "@saas-ui/react";
import {
  SplitPage,
  Toolbar,
  Page,
  PageHeader,
  PageBody,
  theme,
  DataGrid,
  DataGridPagination,
} from "@saas-ui-pro/react";
import { FiHome, FiUsers } from "react-icons/fi";
import "./App.css";
import { usePanels } from "./Panel";
import { LuRemoveFormatting } from "react-icons/lu";

interface Email {
  id: number;
  subject: string;
  from: string;
  content: string;
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const emails: Email[] = [
  {
    id: 1,
    subject: "A bug is never just a mistake.",
    from: "Elliot",
    content: lorem.generateParagraphs(3),
  },
  {
    id: 2,
    subject: "Sign up for our newsletter",
    from: "Ben",
    content: lorem.generateParagraphs(3),
  },
  {
    id: 3,
    subject: "Call the pest exterminator",
    from: "Albert",
    content: lorem.generateParagraphs(3),
  },
  {
    id: 4,
    subject: "We have great deals for you",
    from: "Cameron",
    content: lorem.generateParagraphs(3),
  },
  {
    id: 5,
    subject: "Checking in!",
    from: "David",
    content: lorem.generateParagraphs(3),
  },
];

function App() {
  const ctx = usePanels({
    names: ["Inbox", "Detail"],
    initialState: { Inbox: true, Detail: false },
  });
  const [activeEmail, setActiveEmail] = useState<Email>(emails[0]);

  return (
    <SaasProvider theme={theme}>
      <AppShell>
        <Box display="flex" h="full">
          <Page flexBasis="50%" flexGrow="1">
            <PageHeader title="Email" />
            <StructuredList>
              {emails.map((email) => {
                const onClick = () => {
                  if (email === activeEmail) {
                    ctx.togglePanel("Detail");
                  } else {
                    ctx.openPanel("Detail");
                  }
                  setActiveEmail(email);
                };

                const onKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
                  if (e.key === "Enter") {
                    onClick();
                  }
                };
                return (
                  <StructuredListItem
                    key={email.id}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    bg={email === activeEmail ? "lavender" : undefined}
                  >
                    <StructuredListCell display="flex" width="fit-content">
                      <Text
                        textAlign={"start"}
                        fontWeight={"bold"}
                        color="text.neutralDominant"
                        width="100px"
                      >
                        {email.from}
                      </Text>
                      <Text
                        ms={4}
                        width="200px"
                        textAlign={"start"}
                        fontWeight="bold"
                        color="text.neutralSoft"
                      >
                        {email.subject}
                      </Text>
                    </StructuredListCell>
                    <StructuredListCell flexGrow="1">
                      <Text
                        me="auto"
                        textAlign={"start"}
                        textStyle="md"
                        color="text.neutralSoft"
                      >
                        {email.content.substring(
                          0,
                          ctx.state["Detail"] ? 50 : 200
                        )}
                        ...
                      </Text>
                    </StructuredListCell>
                  </StructuredListItem>
                );
              })}
            </StructuredList>
          </Page>
          {ctx.state["Detail"] && (
            <Page flexBasis="50%">
              <PageHeader
                title="Content"
                toolbar={
                  <Box w="full" display="flex" justifyContent="flex-end">
                    <CloseButton onClick={() => ctx.closePanel("Detail")} />
                  </Box>
                }
              />
              <PageBody bg="lightgray">
                <Card>
                  <CardHeader textAlign={"start"} fontWeight={"bold"}>
                    {activeEmail.subject} - {activeEmail.from}
                  </CardHeader>
                  <CardBody textAlign={"start"}>{activeEmail.content}</CardBody>
                </Card>
              </PageBody>
            </Page>
          )}
        </Box>
      </AppShell>
    </SaasProvider>
  );
}

function PageWithToolbarLayout() {
  return (
    <AppShell>
      <Page>
        <PageHeader
          title="Page with toolbar"
          toolbar={
            <Toolbar>
              <Button>Reset</Button>
              <Button variant="primary">Save</Button>
            </Toolbar>
          }
        />
        <PageBody></PageBody>
      </Page>
    </AppShell>
  );
}

function FullPage() {
  return (
    <AppShell
      sidebar={
        <Sidebar width="30%" toggleBreakpoint="sm">
          <SidebarSection direction="row">
            <Box width="100px" bg="blue" />
            <Spacer />
            <Menu>
              <MenuButton
                as={IconButton}
                icon={
                  <PersonaAvatar
                    presence="online"
                    size="xs"
                    src="/showcase-avatar.jpg"
                  />
                }
                variant="ghost"
              />
              <MenuList>
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto">
            <NavItem icon={<FiHome size="1.2em" />}>Home</NavItem>
            <NavItem icon={<FiUsers size="1.2em" />}>Contacts</NavItem>
          </SidebarSection>
        </Sidebar>
      }
      navbar={<Navbar>Navbar Contents</Navbar>}
    >
      <Page>
        <PageHeader title="Users" />
        <PageBody p="0">
          <DataGrid
            isHoverable
            isSelectable
            isSortable
            columns={[
              { id: "name", header: "Name" },
              { id: "role", header: "Role" },
              {
                id: "actions",
                cell: () => <Button>Edit</Button>,
              },
            ]}
            data={[{ name: "Renata Alink", role: "Founder" }]}
          >
            <DataGridPagination />
          </DataGrid>
        </PageBody>
      </Page>
    </AppShell>
  );
}

function SplitPageLayout() {
  return (
    <AppShell>
      <SplitPage breakpoint="sm">
        <Page borderRightWidth="1px" width="30%" maxW="300px">
          <PageHeader title="Inbox" />
          <PageBody p="0"></PageBody>
        </Page>
        <EmptyState title="Inbox zero" description="Time for some coffee" />
      </SplitPage>
    </AppShell>
  );
}

export default App;
