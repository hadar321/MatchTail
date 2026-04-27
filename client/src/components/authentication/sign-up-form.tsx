import { useForm } from "@mantine/form";
import { Button, Card, FileInput, Stack, TextInput, Title, Container, Text, Group, Avatar } from "@mantine/core";
import { register as apiRegister } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/avatar.png";

const SignUpForm: React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      profileImage: null as File | null,
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

  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string; username: string; profileImage: File | null }) => {
    try {
      await apiRegister(values.username, values.email, values.password, values.profileImage ? values.profileImage : undefined);
      alert("Registration successful. Please log in.");
      navigate("/");
    } catch (err: unknown) {
      const error = err as { response?: { data?: any }; message?: string };
      const resp = error?.response?.data;
      let msg: string;
      if (typeof resp === 'string') msg = resp;
      else if (resp && typeof resp === 'object') msg = resp.message ?? JSON.stringify(resp);
      else msg = error?.message ?? 'Registration failed';
      alert(msg);
    }
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
    <Container size="sm" mt={80} mb={80}>
      <Card shadow="md" padding="xl" radius="lg" withBorder>
        <Title order={2} align="center" fw={700} c="blue.7" mb="lg">Create an Account</Title>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack gap="md">
            <Group grow align="flex-start">
              <TextInput
                label="Email"
                placeholder="your@email.com"
                radius="md"
                key={form.key("email")}
                {...form.getInputProps("email")}
                error={form.errors.email}
              />
              <TextInput
                label="Username"
                placeholder="user_name"
                radius="md"
                key={form.key("username")}
                {...form.getInputProps("username")}
                error={form.errors.username}
              />
            </Group>
            
            <Group grow align="flex-start">
              <TextInput
                type="password"
                label="Password"
                placeholder="password"
                radius="md"
                key={form.key("password")}
                {...form.getInputProps("password")}
                error={form.errors.password}
              />
              <TextInput
                type="password"
                label="Confirm password"
                placeholder="confirm password"
                radius="md"
                key={form.key("confirmPassword")}
                {...form.getInputProps("confirmPassword")}
                error={createConfirmPasswordError()}
              />
            </Group>
            
            <Group align="center" mt="sm">
              <Avatar
                src={form.getValues().profileImage ? URL.createObjectURL(form.getValues().profileImage as File) : avatarImg}
                size={60}
                radius={60}
              />
              <FileInput
                style={{ flex: 1 }}
                label="Profile Image"
                placeholder="Choose your profile image"
                radius="md"
                key={form.key("profileImage")}
                {...form.getInputProps("profileImage")}
                accept="image/*"
                error={form.errors.profileImage}
              />
            </Group>
            
            <Button type="submit" radius="md" mt="xl" fullWidth>Sign Up</Button>
            
            <Text c="dimmed" size="sm" align="center" mt="sm">
              Already have an account?{" "}
              <Text 
                component="span" 
                c="blue" 
                style={{ cursor: "pointer" }} 
                onClick={() => navigate("/")}
              >
                Log In
              </Text>
            </Text>
          </Stack>
        </form>
      </Card>
    </Container>
  );
};

export { SignUpForm };