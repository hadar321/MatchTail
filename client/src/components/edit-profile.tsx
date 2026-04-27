import { Stack, Button, TextInput, Card, Title, FileInput, Text, PasswordInput } from "@mantine/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "@mantine/core";
import { updateUser } from "../services/user-service";
import avatarImg from "../assets/avatar.png";
import { User } from "../types/user";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state as User | undefined;

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [profileImageFile, setProfileImage] = useState<File | null>(null);

  return (
    <Stack justify={"center"} align={"center"} style={{ minHeight: "50vh" }} mt={100}>
      <Card shadow={"sm"} padding="lg" radius="md" w={"24vw"} withBorder>
        <div>
          <Title order={2} align="center" mb="md">Edit Profile</Title>
          
          <Text mt="md">Username:</Text>
          <TextInput 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.currentTarget.value)} 
          />
          
          <Text mt="md">Email:</Text>
          <TextInput 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.currentTarget.value)} 
          />
          
          <Text mt="md">New Password (leave empty to keep current):</Text>
          <PasswordInput 
            placeholder="New Password" 
            value={password} 
            onChange={(e) => setPassword(e.currentTarget.value)} 
          />
          
          <Text mt="md">Profile Image:</Text>
          <Image 
            mt={"sm"} 
            src={profileImageFile ? URL.createObjectURL(profileImageFile) : (user?.profileImage ? `${API_BASE}/${user.profileImage}` : avatarImg)} 
            alt="Profile preview" 
            style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%", alignSelf: "center", marginBottom: 8 }} 
          />
          <FileInput 
            placeholder="Upload new image" 
            onChange={(file) => setProfileImage(file || null)} 
          />
          
          <Button fullWidth mt={30} onClick={async () => {
            if (!user?._id) return;
            try {
              await updateUser(user._id, { 
                username: username !== user.username ? username : undefined, 
                email: email !== user.email ? email : undefined, 
                password: password ? password : undefined, 
                profileImage: profileImageFile || null 
              });
              navigate('/profile');
            } catch (e: unknown) {
              const error = e as { response?: { data?: string; status?: number }; message?: string };
              const msg = error?.response?.data || error?.message || "Failed to update profile";
              alert(msg);
              if (error?.response?.status === 401) navigate('/');
            }
          }}>
            Update Profile
          </Button>
          <Button fullWidth variant="subtle" mt={10} onClick={() => navigate('/profile')}>
            Cancel
          </Button>
        </div>
      </Card>
    </Stack>
  );
};

export { EditProfile };
