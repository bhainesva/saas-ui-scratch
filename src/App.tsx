import { useMemo } from "react";
import {
  useDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FiltersProvider, FiltersAddButton, ActiveFiltersList, FilterType } from "@saas-ui-pro/react";
import "./App.css";

function App() {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const filters = useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        type: 'enum' as FilterType,
        items: [
          {
            id: 'new',
            label: 'New',
          },
          {
            id: 'active',
            label: 'Active',
          },
        ],
      },
    ],
    []
  )

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FiltersProvider filters={filters}>
              <FiltersAddButton listProps={{zIndex: "popover"}} />
                <ActiveFiltersList />
            </FiltersProvider>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
