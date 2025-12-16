import { HStack, Image, Pressable, Text, VStack } from 'native-base';

export const ActionButton = ({ icon, onPress, label, ...props }) => {
  return (
    <VStack alignItems='center' space='8px'>
      <Pressable onPress={onPress} {...props}>
        <HStack
          height='56px'
          width='56px'
          bg='gray.100'
          alignItems='center'
          justifyContent='center'
          borderRadius='18px'
        >
          <Image src={icon} width='28px' height='28px' alt={label} />
        </HStack>
      </Pressable>
      <Text fontSize={13} fontWeight='500'>
        {label}
      </Text>
    </VStack>
  );
};
