import { Avatar, HStack, Pressable, Text, VStack } from 'native-base';
import { Fragment } from 'react';
import TimeAgo from 'timeago-react';

import { InscriptionIndicator } from '../../../components/InscriptionIndicator';
import { useAppContext } from '../../../hooks/useAppContext';
import { formatSatoshisAsDoge, is69, is420 } from '../../../utils/formatters';

export const Transaction = ({
  transaction: { address, id, blockTime, type, amount, confirmations },
  transaction,
  cachedInscription,
}) => {
  const { navigate } = useAppContext();

  const selectTx = () => {
    if (!transaction) return;
    const encoded = encodeURIComponent(JSON.stringify(transaction));
    navigate(`/Transactions/tokens?selectedTx=${encoded}`);
  };

  const satAmount = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  const formattedAmount = formatSatoshisAsDoge(satAmount, 3);
  const signedAmount = `${type === 'outgoing' ? '-' : '+'} Ɖ${formattedAmount}`;

  return (
    <Fragment key={id}>
      <Pressable onPress={selectTx} paddingTop='10px'>
        <HStack
          p='12px'
          bg='white'
          rounded='16px'
          borderWidth='1px'
          borderColor='gray.100'
          shadow='1'
        >
          <VStack mr='12px'>
            <Avatar
              size='sm'
              bg='brandYellow.500'
              _text={{ color: 'gray.800' }}
            >
              {address?.substring(0, 2)}
            </Avatar>
          </VStack>
          <VStack flex={1}>
            <Text fontSize='xs' fontWeight='medium'>
              {address || 'Unknown'}
            </Text>

            <HStack space='6px'>
              <Text
                fontSize='12px'
                fontWeight='semibold'
                _light={{ color: 'gray.400' }}
                _dark={{ color: 'gray.500' }}
              >
                {confirmations === 0 ? (
                  'PENDING'
                ) : (
                  <TimeAgo datetime={blockTime * 1000} />
                )}
              </Text>
              <InscriptionIndicator cachedInscription={cachedInscription} />
            </HStack>
          </VStack>
          <VStack flexDirection='row' alignItems='flex-start' ml='8px'>
            <HStack
              _light={{
                bg: type === 'outgoing' ? '#EAF3FF' : '#E8F8EF',
              }}
              px='12px'
              py='3px'
              rounded='2xl'
            >
              <Text
                fontSize='12px'
                fontWeight='bold'
                _light={{
                  color: is420(formatSatoshisAsDoge(amount, 3))
                    ? 'green.600'
                    : type === 'outgoing'
                    ? 'blue.500'
                    : 'green.500',
                }}
                _dark={{
                  color: is420(formatSatoshisAsDoge(amount, 3))
                    ? 'green.300'
                    : type === 'outgoing'
                    ? 'blue.400'
                    : 'green.500',
                }}
              >
                {signedAmount}
              </Text>
              <Text fontSize='sm' fontWeight='bold'>
                {is69(formattedAmount) && ' 😏'}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Pressable>
    </Fragment>
  );
};
