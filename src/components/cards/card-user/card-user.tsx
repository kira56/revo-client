import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Pill,
  Stack,
  Text,
} from "@mantine/core";
import { UserRecommendationType } from "@shared/types/hook.forms";
import {
  mappingEnglishLevel,
  mappingSeniorityLevel,
} from "@shared/utils/mapping-levels.util";
import { IconCircle, IconDownload } from "@tabler/icons-react";

interface CardUserProps {
  user: UserRecommendationType;
  index: number;
}

export const CardUser = ({ user, index }: CardUserProps) => {
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/assets/sample.pdf";
    link.download = `${user.name}-CV.pdf`;
    link.click();
  };

  return (
    <Card withBorder>
      <Stack>
        <Group justify="space-between">
          <Group gap={8}>
            <IconCircle size={14} color="#00C000" fill="#00C000" />
            <Text fw={600}>{user.name}</Text>
          </Group>
          <ActionIcon variant="default" onClick={handleDownloadPDF}>
            <IconDownload size={14} />
          </ActionIcon>
        </Group>
        <Card.Section>
          <Image
            src={`https://i.pravatar.cc/300?img=${index + 7}`}
            alt="User Avatar"
            h={250}
          />
        </Card.Section>
        <Stack gap={8}>
          <Group justify="space-between">
            <Text>Seniority:</Text>
            <Badge>{mappingSeniorityLevel[user.seniority_level]}</Badge>
          </Group>
          <Group justify="space-between">
            <Text>English Level:</Text>
            <Text c="violet">{mappingEnglishLevel[user.english_level]}</Text>
          </Group>
          <Group justify="space-between">
            <Text>Available Hours:</Text>
            <Text c="violet">{user.weekly_available_hours}h</Text>
          </Group>
          <Group justify="space-between">
            <Text>Days:</Text>
            <Text c="violet">{user.availability} days</Text>
          </Group>
          <Group align="start">
            <Text>Tech Skills:</Text>
            <Group>
              {Object.entries(user.tech_skills).map(([tech, level]) => (
                <Pill key={tech}>
                  {tech} - {mappingSeniorityLevel[level]}
                </Pill>
              ))}
            </Group>
          </Group>
        </Stack>
        <Group justify="flex-end">
          <Button bg="dark">Nominate</Button>
          <Button variant="default">Decline</Button>
        </Group>
      </Stack>
    </Card>
  );
};
