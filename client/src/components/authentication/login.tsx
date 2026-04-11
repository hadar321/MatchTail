import { useForm } from "@mantine/form";
import { Button, Card, Stack, TextInput } from "@mantine/core";
import { orange } from "../../consts"; 
import { Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      },
    validate: {
      email: (value) => (value.trim() ? null : "Email is required"),
      password: (value) => (value.trim() ? null : "Password is required"),
    },
  });
    
    const handleSubmit = (values: { email: string; password: string }) => {
        console.log(form.errors);
        console.log(values);
        navigate("/postsList");
    };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
            error={form.errors.email}
          />
          <TextInput
            label="Password"
            placeholder="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
            error={form.errors.password}
          />
          <Button type="submit">Log In</Button>
           <Card.Section withBorder inheritPadding>
            <Group justify="center" mt={"sm"} mb={"sm"}>
              <Button type="button" color={orange} onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </Group>
          </Card.Section>
        </Stack>
      </form>
    </Card>
  );
};

export { LoginForm };