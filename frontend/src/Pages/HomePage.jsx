import { Box, Container, Text } from "@chakra-ui/react";

function HomePage() {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize='4xl' fontFamily="Work sans" color='black'>Talk-A-Tive</Text>
      </Box>
      <Box>

      </Box>
    </Container>
  );
}

export default HomePage;
