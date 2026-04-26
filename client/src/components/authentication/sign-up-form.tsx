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
              type="password"
              label="Password"
              placeholder="password"
              key={form.key("password")}
              {...form.getInputProps("password")}
              error={form.errors.password}
            />
            <TextInput
              type="password"
              label="Confirm password"
              placeholder="confirm password"
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
              error={createConfirmPasswordError()}
            />
            <FileInput
              label="Profile Image"
              placeholder="Choose your profile image"
              key={form.key("profileImage")}
              {...form.getInputProps("profileImage")}
              accept="image/*"
              error={form.errors.profileImage}
            />
            <img
              src={form.getValues().profileImage ? URL.createObjectURL(form.getValues().profileImage as File) : avatarImg}
              alt="Profile Image preview"
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