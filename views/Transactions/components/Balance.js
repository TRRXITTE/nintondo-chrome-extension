import { HStack, Image, Pressable, Spinner, Text, VStack } from 'native-base';
import { useCallback, useState } from 'react';

import { useInterval } from '../../../hooks/useInterval';
import { MESSAGE_TYPES } from '../../../scripts/helpers/constants';
import { sendMessage } from '../../../scripts/helpers/message';
import { logError } from '../../../utils/error';
import { formatSatoshisAsDoge } from '../../../utils/formatters';

const EyeDisabled = 'assets/eye-disabled.svg';
const EyeEnabled = 'assets/eye-enabled.svg';
const CoinIcon = 'assets/nintondo.png';
const DollarBillBg =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='120'>
      <rect width='200' height='120' fill='#2e3b30'/>
      <rect x='10' y='10' width='180' height='100' rx='12' fill='#365742' stroke='#77a07a' stroke-width='2'/>
      <circle cx='100' cy='60' r='24' fill='none' stroke='#99c0a0' stroke-width='4'/>
      <text x='100' y='68' font-size='18' font-family='Arial' text-anchor='middle' fill='#99c0a0'>$</text>
    </svg>`
  );

const QUERY_INTERVAL = 10000;

export function Balance({ walletAddress }) {
  const [balance, setBalance] = useState(null);
  const getAddressBalance = useCallback(() => {
    sendMessage(
      {
        message: MESSAGE_TYPES.GET_ADDRESS_BALANCE,
        data: { address: walletAddress },
      },
      (walletBalance) => {
        if (walletBalance !== undefined && walletBalance !== null) {
          setBalance(Number(walletBalance));
          return;
        }
        logError(new Error('Failed to get wallet balance'));
      }
    );
  }, [walletAddress]);

  useInterval(
    () => {
      if (!walletAddress) {
        return;
      }
      getAddressBalance();
    },
    QUERY_INTERVAL,
    true
  );

  const [balanceVisible, setBalanceVisible] = useState(false);
  const toggleBalanceVisibility = () => setBalanceVisible((v) => !v);
  return (
    <VStack px='16px' bg='#191919'>
      <VStack
        bg='./assets/dollar-bill-bg.png'
        borderRadius={20}
        pb='14px'
        alignItems='center'
        justifyContent={balance === null ? 'center' : 'flex-start'}
        mt={36}
        pt='30px'
        h='120px'
        style={{
          backgroundImage: `url(${DollarBillBg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 120px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
        }}
      >
        {balance === null ? (
          <Spinner alignSelf='center' />
        ) : (
          <>
            <HStack alignItems='center' space='8px'>
              <Image source={CoinIcon} width='28px' height='28px' alt='nintondo' />
              <Text secondary fontWeight='700' color='white' fontSize='35px'>
                {!balanceVisible
                  ? typeof balance === 'number'
                    ? Number(balance) === 0
                      ? 'Nzero'
                      : `N${formatSatoshisAsDoge(balance, 3)}`
                    : ' '
                  : 'N******'}
              </Text>
            </HStack>
            {balance === null ? null : (
              <Pressable
                onPress={toggleBalanceVisibility}
                p='8px'
                position='absolute'
                bottom='4px'
                right='8px'
              >
                <VStack justifyContent='center'>
                  {balanceVisible ? (
                    <Image
                      source={EyeEnabled}
                      width='16px'
                      height='12px'
                      alt='show balance'
                    />
                  ) : null}
                  {!balanceVisible ? (
                    <Image
                      source={EyeDisabled}
                      width='16px'
                      height='16px'
                      alt='hide balance'
                    />
                  ) : null}
                </VStack>
              </Pressable>
            )}
          </>
        )}
      </VStack>
    </VStack>
  );
}
