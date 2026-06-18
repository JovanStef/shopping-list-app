import { useState, type FormEvent } from "react";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { CategoryApiService } from "../services";
import { toaster } from "../../../components/ui/toaster";

const categoryApiService = new CategoryApiService();

interface CreateCategoryModalProps {
  onClose: () => void;
}

export function CreateCategoryModal({ onClose }: CreateCategoryModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please provide a name for the category.");
      return;
    }

    setLoading(true);

    try {
      await categoryApiService.create({
        name: name.trim(),
        items: [],
      });

      toaster.success({
        title: "Category created",
        duration: 2500,
      });

      onClose();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to create category.",
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
          placeholder="Enter category name"
        />
      </Box>

      {error ? <Text color="red.500">{error}</Text> : null}

      <Button type="submit" colorScheme="blue" isLoading={loading}>
        Create category
      </Button>
    </Stack>
  );
}
