import { useState } from "react";
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
  LoadingOverlay,
  Tooltip,
  ActionIcon,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dots } from "./Dots";
import classes from "./HeroText.module.css";
import Markdown from "react-markdown";
import { IconInfoCircle } from "@tabler/icons-react";

interface FormValues {
  childName: string;
  age: number;
  environmentalTopic: string;
  livingEnvironment: string;
  academicApproaches: {
    piaget: boolean;
    activeLearning: boolean;
    roleModeling: boolean;
    multipleIntelligences: boolean;
    vygotsky: boolean;
    personalMotivation: boolean;
  };
}

export function HomePage() {
  const [response, setResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (content: string) => {
    {/* @ts-ignore */}
    setModalContent(content);
    setModalOpen(true);
  };

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

  const environmentalTopicsMap = {
    "حفاظت از حیوانات": "Animal Protection",
    "کاهش زباله": "Waste Reduction",
    "صرفه‌جویی در آب": "Water Conservation",
    "حفاظت از درختان": "Tree Preservation",
    "کاهش آلودگی هوا": "Air Pollution Reduction",
  };

  const livingEnvironmentsMap = {
    شهر: "City",
    روستا: "Village",
    "حومه شهر": "Suburbs",
    ساحل: "Coast",
    کوهستان: "Mountainous Area",
  };

  const academicApproachesData = [
    {
      id: "piaget",
      label: "نظریه رشد شناختی پیاژه",
      description: "تطبیق پیام و زبان داستان با سطح شناختی کودک",
      fullDescription:
        "نظریه رشد شناختی پیاژه بر اساس مراحل رشد شناختی کودکان بنا شده است. این نظریه تأکید می‌کند که باید محتوای آموزشی و داستان‌ها با سطح رشد شناختی کودک مطابقت داشته باشد تا بیشترین تأثیر را داشته باشد.",
    },
    {
      id: "activeLearning",
      label: "نظریه یادگیری فعال",
      description: "درگیر کردن کودک در تصمیم‌گیری و حل چالش",
      fullDescription:
        "یادگیری فعال رویکردی است که کودکان را به شرکت در فرآیند یادگیری، حل مسائل، و تصمیم‌گیری دعوت می‌کند. این روش به افزایش مهارت‌های تفکر انتقادی و خلاقیت کمک می‌کند.",
    },
    {
      id: "roleModeling",
      label: "نقش‌پذیری",
      description: "ارائه الگوی مثبت برای کودک",
      fullDescription:
        "نقش‌پذیری یکی از مؤثرترین روش‌های یادگیری است که کودکان با مشاهده رفتارها و اعمال الگوهای مثبت، یادگیری و رشد می‌کنند.",
    },
    {
      id: "multipleIntelligences",
      label: "هوش‌های چندگانه گاردنر",
      description: "استفاده از انواع مختلف هوش در داستان",
      fullDescription:
        "نظریه هوش‌های چندگانه گاردنر بیان می‌کند که افراد انواع مختلفی از هوش دارند، مانند هوش کلامی، منطقی، موسیقیایی، و فضایی. در داستان‌نویسی برای کودکان، استفاده از این تنوع هوش می‌تواند محتوای غنی‌تر و جذابتری ایجاد کند.",
    },
    {
      id: "vygotsky",
      label: "نظریه منطقه تقریبی رشد ویگوتسکی",
      description: "وجود شخصیت راهنما در داستان",
      fullDescription:
        "این نظریه تأکید می‌کند که کودکان می‌توانند از طریق کمک گرفتن از یک راهنما (مانند والدین یا معلم) به سطوح بالاتری از یادگیری دست یابند. در داستان‌ها، وجود شخصیت راهنما می‌تواند این نقش را ایفا کند.",
    },
    {
      id: "personalMotivation",
      label: "تقویت انگیزه شخصی",
      description: "تقویت حس استقلال و تاثیرگذاری کودک",
      fullDescription:
        "این رویکرد به اهمیت ایجاد حس مسئولیت‌پذیری، اعتماد به نفس، و استقلال در کودکان اشاره دارد. داستان‌ها می‌توانند با تأکید بر موفقیت‌ها و انتخاب‌های شخصیت‌ها، این حس را تقویت کنند.",
    },
  ];

  const transformFormData = (data: FormValues) => ({
    ...data,
    environmentalTopic:
      environmentalTopicsMap[
        data.environmentalTopic as keyof typeof environmentalTopicsMap
      ],
    livingEnvironment:
      livingEnvironmentsMap[
        data.livingEnvironment as keyof typeof livingEnvironmentsMap
      ],
  });

  const handleSubmit = async (values: FormValues) => {
    const transformedValues = transformFormData(values);
    setIsGenerating(true);

    try {
      const response = await fetch(
        "https://aibots.kharcoin.info/ai-story/build",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedValues),
        }
      );

      const data = await response.json();
      setResponse(data);
      setShowForm(false);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse("متاسفانه در ارسال فرم خطایی رخ داد");
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
            قصه‌گوی{" "}
            <Text component="span" className={classes.highlight} inherit>
              هوش مصنوعی{" "}
            </Text>
            برای کودکان
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" c="dimmed" className={classes.description}>
              تا حالا تلاش کردید با کمک هوش مصنوعی برای کودکان قصه بسازید؟
              احتمالا تجربه خوبی نداشتید و نتیجه عجیب و غریبی تحویل گرفتید!
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
              <LoadingOverlay
                visible={isGenerating}
                overlayProps={{ blur: 2 }}
              />
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
                      { value: 2, label: "2" },
                      { value: 6, label: "6" },
                      { value: 11, label: "11" },
                    ]}
                    {...form.getInputProps("age")}
                  />
                </Stack>

                <Grid>
                  <Grid.Col span={6}>
                    <Select
                      label="موضوع زیست‌محیطی"
                      placeholder="انتخاب کنید"
                      data={Object.keys(environmentalTopicsMap)}
                      {...form.getInputProps("environmentalTopic")}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="محیط زندگی"
                      placeholder="انتخاب کنید"
                      data={Object.keys(livingEnvironmentsMap)}
                      {...form.getInputProps("livingEnvironment")}
                    />
                  </Grid.Col>
                </Grid>

                <Text size="sm">رویکردهای آکادمیک</Text>
                <Grid>
                  {academicApproachesData.map((approach) => (
                    <Grid.Col span={6} key={approach.id}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          label={approach.label}
                          description={approach.description}
                          {...form.getInputProps(
                            `academicApproaches.${approach.id}`,
                            {
                              type: "checkbox",
                            }
                          )}
                        />
                        <Tooltip label="اطلاعات بیشتر" withArrow>
                          <ActionIcon
                            onClick={() => openModal(approach.fullDescription)}
                            style={{ marginRight: "20px" }}
                          >
                            <IconInfoCircle size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </div>
                    </Grid.Col>
                  ))}
                </Grid>

                <Modal
                  opened={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="توضیحات بیشتر"
                >
                  <Text>{modalContent}</Text>
                </Modal>

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
                داستان {form.values.childName} در{" "}
                {form.values.livingEnvironment} برای{" "}
                {form.values.environmentalTopic}
              </Text>
              <Text>
                <Markdown>
                  {/* @ts-ignore */}
                  {response.aiResponse}
                </Markdown>
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
