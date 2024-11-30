import { Button, Container } from "@mantine/core";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <Container size="lg" mt={50}>
      <Button onClick={() => navigate("/recommendation")}>Redirect</Button>
    </Container>
  );
}

export default App;
