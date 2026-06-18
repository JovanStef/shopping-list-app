import { useState, type FormEvent } from "react";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { GroupApiService } from "../services";
import { toaster } from "../../../components/ui/toaster";

const groupApiService = new GroupApiService();

interface CreateGroupModalProps {
  onClose: () => void;
}

export function CreateGroupModal({ onClose }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please provide a name for the group.");
      return;
    }

    setLoading(true);

    try {
      await groupApiService.create({
        name: name.trim(),
        items: [],
      });

      toaster.success({
        title: "Group created",
        duration: 2500,
      });

      onClose();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to create group.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack as="form" gap="4" onSubmit={handleSubmit}>
      <Box>
        <Text fontWeight="semibold" mb="2">
          Name
        </Text>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter group name"
        />
      </Box>

      {error ? <Text color="red.500">{error}</Text> : null}

      <Button type="submit" colorScheme="blue" isLoading={loading}>
        Create group
      </Button>
    </Stack>
  );
}
