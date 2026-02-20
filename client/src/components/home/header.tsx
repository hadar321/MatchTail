import { Flex, Image } from "@mantine/core";
import { AppTitle } from "./title";

const Header: React.FC = () => {
    return (
      <Flex h={"100%"} mt={100} align={'center'}>
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