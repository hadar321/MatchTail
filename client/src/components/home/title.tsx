import { Title } from "@mantine/core";

import { orange , orangeDark } from "../../consts";

const AppTitle: React.FC = () => {
  return (
    <Title
      order={1}
      style={{
        color: "#ffffff",
        fontSize: "100px",
        fontWeight: 900, // מראה "שמנמן" וידידותי יותר
        padding: "10px 20px",
        display: "inline-block",
        fontFamily: "'Fredoka', sans-serif", // גופן מעוגל מומלץ (אם מותקן)
        letterSpacing: "-2px",
        textShadow: `
          2px 2px 0px ${orange},
          4px 4px 0px ${orangeDark},
          6px 6px 15px rgba(0, 0, 0, 0.1)
        `,
      }}
    >
      Match<span style={{ color: orange }}>Tail</span>
    </Title>
  );
};

export { AppTitle };