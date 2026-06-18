import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Box,
  Button,
  Input,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CategoryApiService } from "../../category/services";
import { GroupApiService } from "../../group/services";
import { ShoppingItemApiService } from "../services";
import { modalService } from "../../shared/services/modal.service";
import { toaster } from "../../../components/ui/toaster";
import type { ICategory } from "../../category/models";
import type { IGroup } from "../../group/models";

const categoryApiService = new CategoryApiService();
const groupApiService = new GroupApiService();
const shoppingItemApiService = new ShoppingItemApiService();

interface CreateShoppingItemModalProps {
  onClose: () => void;
}

export function CreateShoppingItemModal({
  onClose,
}: CreateShoppingItemModalProps) {
  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevStackLengthRef = useRef(modalService.getState().stack.length);

  const loadOptions = async () => {
    try {
      setLoading(true);
      const [fetchedCategories, fetchedGroups] = await Promise.all([
        categoryApiService.getAll(),
        groupApiService.getAll(),
      ]);
      setCategories(fetchedCategories);
      setGroups(fetchedGroups);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load group or category options.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  useEffect(() => {
    const unsubscribe = modalService.subscribe((state) => {
      const previousStackLength = prevStackLengthRef.current;
      const currentStackLength = state.stack.length;

      if (
        previousStackLength > currentStackLength &&
        state.view === "shopping-item"
      ) {
        loadOptions();
      }

      prevStackLengthRef.current = currentStackLength;
    });

    return unsubscribe;
  }, []);

  const groupOptions = useMemo(
    () => [{ id: "new", name: "Add new" }, ...groups],
    [groups],
  );
  const categoryOptions = useMemo(
    () => [{ id: "new", name: "Add new" }, ...categories],
    [categories],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please provide a name for the shopping item.");
      return;
    }

    if (groupId === "new" || categoryId === "new") {
      setError(
        "Please select an existing group and category, or create one first.",
      );
      return;
    }

    setSaving(true);

    try {
      await shoppingItemApiService.create({
        name: name.trim(),
        active: false,
        id: 0,
      });

      toaster.success({
        title: "Shopping item created",
        duration: 2500,
      });

      onClose();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to create shopping item.",
      );
    } finally {
      setSaving(false);
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
          placeholder="Enter item name"
        />
      </Box>

      <Box>
        <Text fontWeight="semibold" mb="2">
          Group
        </Text>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={groupId}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "new") {
                modalService.open("group");
                return;
              }
              setGroupId(Number(value));
            }}
            disabled={loading}
            placeholder="Select group"
          >
            {groupOptions.map((group) => (
              <option
                key={group.id}
                value={group.id === "new" ? "new" : group.id}
              >
                {group.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>

      <Box>
        <Text fontWeight="semibold" mb="2">
          Category
        </Text>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={categoryId}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "new") {
                modalService.open("category");
                return;
              }
              setCategoryId(Number(value));
            }}
            disabled={loading}
            placeholder="Select category"
          >
            {categoryOptions.map((category) => (
              <option
                key={category.id}
                value={category.id === "new" ? "new" : category.id}
              >
                {category.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>

      {error ? <Text color="red.500">{error}</Text> : null}

      <Button type="submit" colorScheme="blue" isLoading={saving}>
        Create shopping item
      </Button>
    </Stack>
  );
}
