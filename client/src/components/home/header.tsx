import { Card, Flex, Image } from "@mantine/core";
import { AppTitle } from "./title";

const Header: React.FC = () => {
    return (
      <Flex h={"100%"} mt={200} align={'center'}>
      <Flex h={"100%"} w={'50%'}>
        <Card shadow="sm" padding="lg" radius="md" withBorder></Card>
      </Flex>
      <Flex direction={"column"} h={"100%"} justify={"flex-end"}>
        <Flex align={"center"}>
          <AppTitle />
          <Image
            h={170}
            src={"/logo.jpg"}
            style={{ transform: "rotate(15deg)" }}
          ></Image>
        </Flex>
      </Flex>
    </Flex>
  );
};

export { Header };