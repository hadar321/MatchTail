import { Flex, Image, Box } from "@mantine/core";
import { AppTitle } from "./title";

const Header: React.FC = () => {
    return (
      <Box mt={60} mb={20}>
        <Flex align="center" justify="center" gap="md">
          <AppTitle />
          <Image
            h={120}
            src={"/logo.png"}
            style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" }}
          />
        </Flex>
      </Box>
  );
};

export { Header };