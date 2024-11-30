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
import { Rating } from "react-simple-star-rating";

interface CardUserProps {
  user: UserRecommendationType;
  index: number;
}

export const CardUser = ({ user }: CardUserProps) => {
  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/assets/sample.pdf";
    link.download = `${user.name}-CV.pdf`;
    link.click();
  };

  const getInterpolatedColor = () => {
    if (user.availability < 0 || user.availability > 180) {
      throw new Error("Value must be between 0 and 180.");
    }

    if (user.availability < 0 || user.availability > 180) {
      throw new Error("Value must be between 0 and 180.");
    }

    if (user.availability <= 60) {
      return "#00C000";
    } else if (user.availability <= 120) {
      return "#FFA500";
    } else {
      return "#FF0000";
    }
  };

  return (
    <Card withBorder>
      <Stack>
        <Group justify="space-between">
          <Group gap={8}>
            <IconCircle
              size={14}
              color={getInterpolatedColor()}
              fill={getInterpolatedColor()}
            />
            <Text fw={600}>{user.name}</Text>
          </Group>
          <ActionIcon variant="default" onClick={handleDownloadPDF}>
            <IconDownload size={14} />
          </ActionIcon>
        </Group>
        <Card.Section>
          <Image
            src={`https://i.pravatar.cc/300?img=${user.weekly_available_hours}`}
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
            <Text>Days Until Availability: </Text>
            <Text c="violet">{user.availability} days</Text>
          </Group>
          <Group justify="space-between">
            <Text>Priority</Text>
            <Rating size={16} initialValue={(user.importance / 100) * 5} />
          </Group>
          <Group align="start">
            <Text>Tech Skills:</Text>
            <Group gap={6}>
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
