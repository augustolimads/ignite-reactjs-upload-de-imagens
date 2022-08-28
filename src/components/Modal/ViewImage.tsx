import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        width="max-content"
        height="max-content"
        backgroundColor="pGray.800"
      >
        <ModalBody padding={0}>
          <Image src={imgUrl} />
        </ModalBody>
        <ModalFooter
          maxW="900px"
          maxH="600px"
          display="flex"
          justifyContent="flex-start"
        >
          <Link target="_blank" href={imgUrl}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
