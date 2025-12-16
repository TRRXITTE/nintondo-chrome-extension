import { Link, Modal, Text, VStack } from 'native-base';

import { useLinks } from '../../hooks/useLinks';

export const AboutModal = ({ showModal, onClose }) => {
  const { onLinkClick } = useLinks();
  const manifestVersion =
    typeof chrome !== 'undefined' && chrome?.runtime?.getManifest
      ? chrome.runtime.getManifest().version
      : 'dev';

  return (
    <Modal isOpen={showModal} onClose={onClose} size='xl'>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>About</Modal.Header>
        <Modal.Body pt='20px' pb='36px'>
          <VStack>
            <Text fontWeight='bold' fontSize='md'>
              Nintondo Version
            </Text>
            <Text color='gray.500'>{manifestVersion}</Text>
          </VStack>
          <VStack space='6px' mt='20px'>
            <Link
              _text={{
                fontSize: 'md',
                color: 'blue.500',
                fontWeight: 'semibold',
              }}
              href='https://nintondo.trrxitte.com/terms'
              onPress={() => onLinkClick('https://nintondo.trrxitte.com/terms')}
            >
              Terms of Use
            </Link>
            <Link
              fontSize='md'
              href='https://nintondo.trrxitte.com/privacy'
              _text={{
                fontSize: 'md',
                color: 'blue.500',
                fontWeight: 'semibold',
              }}
              onPress={() =>
                onLinkClick('https://nintondo.trrxitte.com/privacy')
              }
            >
              Privacy Policy
            </Link>
            <Link
              fontSize='md'
              href='https://nintondo.trrxitte.com'
              _text={{
                fontSize: 'md',
                color: 'blue.500',
                fontWeight: 'semibold',
              }}
              onPress={() => onLinkClick('https://nintondo.trrxitte.com')}
            >
              Visit our website
            </Link>
            <Link
              fontSize='md'
              href='mailto:support@nintondo.trrxitte.com'
              _text={{
                fontSize: 'md',
                color: 'blue.500',
                fontWeight: 'semibold',
              }}
              onPress={() => onLinkClick('mailto:support@nintondo.trrxitte.com')}
            >
              Contact us
            </Link>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
