import React, { useState } from 'react';
import {
  Card,
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  Button,
  Text,
  Container,
  Stack,
  Grid,
  Paper,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import axios from "axios";

export function HomePage() {
  const [response, setResponse] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);
  
    try {
      const response = await axios.post('https://aibots.kharcoin.info/ai-story/build', form.values);
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to submit form');
    } finally {
      setIsGenerating(false);
    }
  };


// @ts-ignore
  const [story, setStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm({
    initialValues: {
      childName: "",
      age: "",
      environmentalTopic: "",
      livingEnvironment: "",
      academicApproaches: {
        piaget: false,
        activeLearning: false,
        roleModeling: false,
        multipleIntelligences: false,
        vygotsky: false,
        personalMotivation: false,
      },
    },
    validate: {
      childName: (value) =>
        value.trim().length === 0 ? "لطفاً نام کودک را وارد کنید" : null,
      age: (value: string): string | null => {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) {
          return "لطفاً سن معتبر بین 2 تا 11 سال وارد کنید";
        }
        return numValue < 2 || numValue > 11
          ? "لطفاً سن معتبر بین 2 تا 11 سال وارد کنید"
          : null;
      },
      environmentalTopic: (value) =>
        !value ? "لطفاً یک موضوع زیست‌محیطی انتخاب کنید" : null,
    },
  });
// @ts-ignore
  const [formData] = useState({
    childName: "",
    age: "",
    environmentalTopic: "",
    livingEnvironment: "",
    academicApproaches: {
      piaget: false,
      activeLearning: false,
      roleModeling: false,
      multipleIntelligences: false,
      vygotsky: false,
      personalMotivation: false,
    },
  });

  const environmentalTopics = [
    "حفاظت از حیوانات",
    "کاهش زباله",
    "صرفه‌جویی در آب",
    "حفاظت از درختان",
    "کاهش آلودگی هوا",
  ];

  const livingEnvironments = ["شهر", "روستا", "حومه شهر", "ساحل", "کوهستان"];

  const academicApproachesData = [
    {
      id: "piaget",
      label: "نظریه رشد شناختی پیاژه",
      description: "تطبیق پیام و زبان داستان با سطح شناختی کودک",
    },
    {
      id: "activeLearning",
      label: "نظریه یادگیری فعال",
      description: "درگیر کردن کودک در تصمیم‌گیری و حل چالش",
    },
    {
      id: "roleModeling",
      label: "نقش‌پذیری",
      description: "ارائه الگوی مثبت برای کودک",
    },
    {
      id: "multipleIntelligences",
      label: "هوش‌های چندگانه گاردنر",
      description: "استفاده از انواع مختلف هوش در داستان",
    },
    {
      id: "vygotsky",
      label: "نظریه منطقه تقریبی رشد ویگوتسکی",
      description: "وجود شخصیت راهنما در داستان",
    },
    {
      id: "personalMotivation",
      label: "تقویت انگیزه شخصی",
      description: "تقویت حس استقلال و تاثیرگذاری کودک",
    },
  ];
// @ts-ignore
  const generateStory = () => {
    // @ts-ignore
    handleSubmit(event);
  };

  return (<>
  <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          قصه‌گوی 
          <Text component="span" className={classes.highlight} inherit> هوش مصنوعی </Text>
          برای کودکان
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            تا حالا تلاش کردید با کمک هوش مصنوعی برای کودکان قصه بسازید؟ احتمالا تجربه خوبی نداشتید و نتیجه عجیب و غریبی تحویل گرفتید! 
            <br />یا حتا اگر نتیجه خوبی در بر داشته، در مورد کیفیت آکادمیک آن که بر رشد و شناخت کودک چه تاثیری میگذارد شک کردید،
            <br />با این قصه گوی ما، قصه متفاوتی را تجربه کنید
          </Text>
        </Container>
      </div>
    </Container>
    <Container size="lg" dir="rtl">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <form onSubmit={handleSubmit} 
        // onSubmit={form.onSubmit(generateStory)}
        >
          <Stack>
            <TextInput
              label="نام کودک"
              placeholder="نام کودک را وارد کنید"
              {...form.getInputProps("childName")}
            />

            <NumberInput
              label="سن کودک"
              placeholder="سن کودک را وارد کنید"
              min={2}
              max={11}
              {...form.getInputProps("age")}
            />

            <Select
              label="موضوع زیست‌محیطی"
              placeholder="انتخاب کنید"
              data={environmentalTopics}
              {...form.getInputProps("environmentalTopic")}
            />

            <Select
              label="محیط زندگی"
              placeholder="انتخاب کنید"
              data={livingEnvironments}
              {...form.getInputProps("livingEnvironment")}
            />

            <Text size="sm">
              رویکردهای آکادمیک
            </Text>
            <Grid>
              {academicApproachesData.map((approach) => (
                <Grid.Col span={6} key={approach.id}>
                  <Checkbox
                    label={approach.label}
                    description={approach.description}
                    {...form.getInputProps(
                      `academicApproaches.${approach.id}`,
                      { type: "checkbox" }
                    )}
                  />
                </Grid.Col>
              ))}
            </Grid>

            <Button type="submit" loading={isGenerating}>
              {isGenerating ? "در حال ساخت داستان..." : "ساخت داستان"}
            </Button>
          </Stack>
        </form>
      </Card>

      {story && (
        <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
          <Text size="xl" mb="md">
            داستان {form.values.childName}
          </Text>
          <Text>
            {story.split("\n").map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <Text key={index} mb="md">
                    {paragraph}
                  </Text>
                )
            )}
          </Text>
        </Paper>
      )}

      {response && (
        <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
          <Text size="xl" mb="md"> قصه:</Text>
          <Text>{response}</Text>
        </Paper>
      )}

    </Container>
    </>
  );
}
