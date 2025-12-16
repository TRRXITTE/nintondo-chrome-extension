import { Text } from 'native-base';

import { useLinks } from '../hooks/useLinks';

export const Footer = ({ ...props }) => {
  const { onLinkClick } = useLinks();

  return (
    <Text textAlign='center' mt='80px' color='gray.400' {...props}>
      Need help using Nintondo?{'\n'}
      <Text
        color='brandYellow.300'
        underline
        fontWeight='medium'
        onClickFAQ
        onPress={() =>
          onLinkClick(
            'https://nintondo.trrxitte.com/faq'
          )
        }
      >
        Frequently Asked Questions
      </Text>
    </Text>
  );
};
