import React, { useState } from 'react';
import {
  Card,
  TextInput,
  Select,
  Checkbox,
  Button,
  Text,
  Container,
  Stack,
  Grid,
  Paper,
  Title,
  Slider,
  Progress,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dots } from './Dots';
import classes from './HeroText.module.css';

export function HomePage() {
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(true);
  
  const form = useForm({
    initialValues: {
      childName: "",
      age: 6,
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
      age: (value) =>
        value < 2 || value > 11
          ? "لطفاً سن معتبر بین 2 تا 11 سال وارد کنید"
          : null,
      environmentalTopic: (value) =>
        !value ? "لطفاً یک موضوع زیست‌محیطی انتخاب کنید" : null,
      livingEnvironment: (value) =>
        !value ? "لطفاً محیط زندگی را انتخاب کنید" : null,
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

  const handleSubmit = async (values) => {
    setIsGenerating(true);
  
    try {
      const response = await fetch('https://aibots.kharcoin.info/ai-story/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      setResponse(data);
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
      setResponse('متاسفانه در ارسال فرم خطایی رخ داد');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            قصه‌گوی
            <Text component="span" className={classes.highlight} inherit>
              {" "}
              هوش مصنوعی{" "}
            </Text>
            برای کودکان
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" c="dimmed" className={classes.description}>
              تا حالا تلاش کردید با کمک هوش مصنوعی برای کودکان قصه بسازید؟ احتمالا
              تجربه خوبی نداشتید و نتیجه عجیب و غریبی تحویل گرفتید!
              <br />
              یا حتا اگر نتیجه خوبی در بر داشته، در مورد کیفیت آکادمیک آن که بر
              رشد و شناخت کودک چه تاثیری میگذارد شک کردید،
              <br />
              با این قصه گوی ما، قصه متفاوتی را تجربه کنید
            </Text>
          </Container>
        </div>
      </Container>

      <Container size="lg" dir="rtl">
        {showForm ? (
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <LoadingOverlay visible={isGenerating} overlayProps={{ blur: 2 }} />
              <Stack>
                <TextInput
                  label="نام کودک"
                  placeholder="نام کودک را وارد کنید"
                  {...form.getInputProps("childName")}
                />

                <Stack>
                  <Text size="sm">سن کودک: {form.values.age} سال</Text>
                  <Slider
                    min={2}
                    max={11}
                    step={1}
                    marks={[
                      { value: 2, label: '2' },
                      { value: 6, label: '6' },
                      { value: 11, label: '11' },
                    ]}
                    {...form.getInputProps("age")}
                  />
                </Stack>

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

                <Text size="sm">رویکردهای آکادمیک</Text>
                <Grid>
                  {academicApproachesData.map((approach) => (
                    <Grid.Col span={6} key={approach.id}>
                      <Checkbox
                        label={approach.label}
                        description={approach.description}
                        {...form.getInputProps(`academicApproaches.${approach.id}`, {
                          type: "checkbox",
                        })}
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
        ) : (
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Stack>
              <Text size="xl" mb="md">
                داستان {form.values.childName} در  {form.values.livingEnvironment} برای {form.values.environmentalTopic}
              </Text>
              <Text>
                {response.message}
                {response.toString()}                
              </Text>
              <Button variant="light" onClick={() => setShowForm(true)}>
                ساخت داستان جدید
              </Button>
            </Stack>
          </Paper>
        )}
      </Container>
    </>
  );
}