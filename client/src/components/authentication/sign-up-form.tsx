import { useForm } from "@mantine/form";
import { Button, Card, FileInput, Stack, TextInput ,Title } from "@mantine/core";
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
      avatar: null as File | null,
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

  const handleSubmit = async (values: { email: string; password: string; username: string; avatar: File | null }) => {
    try {
      await apiRegister(values.username, values.email, values.password, values.avatar ? URL.createObjectURL(values.avatar) : undefined);
      alert("Registration successful. Please log in.");
      navigate("/");
    } catch (err: unknown) {
      console.log("Registration failed", err);
      const msg = "Registration failed" + (err instanceof Error ? `: ${err.message} ${err.stack} ${err instanceof Error && err.cause ? ` Caused by: ${err.cause}` : ""
      }` : "") ;
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
            <FileInput
              label="Avatar"
              placeholder="Choose your avatar"
              key={form.key("avatar")}
              {...form.getInputProps("avatar")}
              accept="image/*"
              error={form.errors.avatar}
            />
            <img
              src={form.getValues().avatar ? URL.createObjectURL(form.getValues().avatar as File) : avatarImg}
              alt="Avatar preview"
              style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" ,alignSelf: "center"}}
            />
            <Button type="submit">Sign Up</Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
};

export { SignUpForm };