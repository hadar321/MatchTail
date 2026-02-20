import { useForm } from "@mantine/form";
import { Button, Card, FileInput, Stack, TextInput ,Title } from "@mantine/core";

const SignUpForm: React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        /^[a-zA-Z0-9._-]{3,20}$/.test(value) ? null : "Invalid username",
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
    
  const createConfirmPasswordError = () => {
    if (form.getValues().password) {
      return form.getValues().confirmPassword === form.getValues().password
        ? null
        : "Password was not confirmed";
    } else {
      return null;
    }
  };

  return (
    <Stack align={"center"} justify={"center"} mt={100}>
      <Title>Sign Up</Title>
      <Card shadow={"sm"} padding="lg" radius="md" w={"24vw"} withBorder>
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
              label="Username"
              placeholder="user_name"
              key={form.key("username")}
              {...form.getInputProps("username")}
              error={form.errors.username}
            />
            <FileInput label="Avatar" placeholder="Choose your avatar" />
            <TextInput
              label="Password"
              placeholder="password"
              key={form.key("password")}
              {...form.getInputProps("password")}
              error={form.errors.password}
            />
            <TextInput
              label="Confirm password"
              placeholder="confirm password"
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
              error={createConfirmPasswordError()}
            />
            <Button type="submit">Sign Up</Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
};

export { SignUpForm };