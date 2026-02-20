import { useForm } from "@mantine/form";
import { Button, Card, Stack, TextInput } from "@mantine/core";

const LoginForm: React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
          ? null
          : "Password must contain at least 8 characters, upper and lower case letters, numbers and special characters",
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log(form.errors);
    console.log(values);
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
        </Stack>
      </form>
    </Card>
  );
};

export { LoginForm };