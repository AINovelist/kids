import { Group } from '@mantine/core';
import { TextInput, Button } from '@mantine/core';

export function HomePage() {
  return (
    <Group>
      <h1>My Mantine Form</h1>
      <TextInput label="Your Name" placeholder="John Doe" />
      <Button mt="md">Submit</Button>
    </Group>
  );
}
