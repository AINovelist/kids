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
  Alert,
  Paper,
  AppShell,
  Burger
} from '@mantine/core';
import { useForm } from '@mantine/form';

export function HomePage() {
  const [story, setStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm({
    initialValues: {
      childName: '',
      age: '',
      environmentalTopic: '',
      livingEnvironment: '',
      academicApproaches: {
        piaget: false,
        activeLearning: false,
        roleModeling: false,
        multipleIntelligences: false,
        vygotsky: false,
        personalMotivation: false
      }
    },
    validate: {
      childName: (value) => value.trim().length === 0 ? 'لطفاً نام کودک را وارد کنید' : null,
      age: (value) => (value < 2 || value > 11) ? 'لطفاً سن معتبر بین 2 تا 11 سال وارد کنید' : null,
      environmentalTopic: (value) => !value ? 'لطفاً یک موضوع زیست‌محیطی انتخاب کنید' : null,
    }
  });

  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    environmentalTopic: '',
    livingEnvironment: '',
    academicApproaches: {
      piaget: false,
      activeLearning: false,
      roleModeling: false,
      multipleIntelligences: false,
      vygotsky: false,
      personalMotivation: false
    }
  });

  const environmentalTopics = [
    'حفاظت از حیوانات',
    'کاهش زباله',
    'صرفه‌جویی در آب',
    'حفاظت از درختان',
    'کاهش آلودگی هوا'
  ];

  const livingEnvironments = [
    'شهر',
    'روستا',
    'حومه شهر',
    'ساحل',
    'کوهستان'
  ];

  const academicApproachesData = [
    {
      id: 'piaget',
      label: 'نظریه رشد شناختی پیاژه',
      description: 'تطبیق پیام و زبان داستان با سطح شناختی کودک'
    },
    {
      id: 'activeLearning',
      label: 'نظریه یادگیری فعال',
      description: 'درگیر کردن کودک در تصمیم‌گیری و حل چالش'
    },
    {
      id: 'roleModeling',
      label: 'نقش‌پذیری',
      description: 'ارائه الگوی مثبت برای کودک'
    },
    {
      id: 'multipleIntelligences',
      label: 'هوش‌های چندگانه گاردنر',
      description: 'استفاده از انواع مختلف هوش در داستان'
    },
    {
      id: 'vygotsky',
      label: 'نظریه منطقه تقریبی رشد ویگوتسکی',
      description: 'وجود شخصیت راهنما در داستان'
    },
    {
      id: 'personalMotivation',
      label: 'تقویت انگیزه شخصی',
      description: 'تقویت حس استقلال و تاثیرگذاری کودک'
    }
  ];

  const validateForm = () => {
    if (!formData.childName.trim()) {
      setError('لطفاً نام کودک را وارد کنید');
      return false;
    }
    if (!formData.age || formData.age < 2 || formData.age > 11) {
      setError('لطفاً سن معتبر بین 2 تا 11 سال وارد کنید');
      return false;
    }
    if (!formData.environmentalTopic) {
      setError('لطفاً یک موضوع زیست‌محیطی انتخاب کنید');
      return false;
    }
    setError('');
    return true;
  };

  const generateStory = () => {
    if (!validateForm()) return;
    setIsGenerating(true);

    // Create story based on selected academic approaches
    const ageGroup = formData.age <= 7 ? 'young' : 'older';
    let storyElements = [];

    // Add story elements based on selected approaches
    if (formData.academicApproaches.piaget) {
      // Adapt language and concepts based on age
      storyElements.push(ageGroup === 'young' 
        ? 'با زبانی ساده و تصویری'
        : 'با مفاهیم پیچیده‌تر و منطقی');
    }

    if (formData.academicApproaches.activeLearning) {
      storyElements.push('در طول داستان چند تصمیم مهم برای گرفتن وجود دارد');
    }

    if (formData.academicApproaches.roleModeling) {
      storyElements.push(`${formData.childName} به عنوان یک الگو برای دیگران عمل می‌کند`);
    }

    if (formData.academicApproaches.multipleIntelligences) {
      storyElements.push('از ترکیب هنر، منطق، و ارتباط با طبیعت استفاده می‌شود');
    }

    if (formData.academicApproaches.vygotsky) {
      storyElements.push('یک راهنمای دانا در داستان حضور دارد');
    }

    if (formData.academicApproaches.personalMotivation) {
      storyElements.push('تاکید بر توانایی‌های شخصی و استقلال در تصمیم‌گیری');
    }

    let generatedStory = '';

    if (ageGroup === 'young') {
      generatedStory = `
        یک روز قشنگ، ${formData.childName} کوچولوی ${formData.age} ساله که در ${formData.livingEnvironment} زندگی می‌کرد،
        تصمیم گرفت به طبیعت کمک کند. موضوعی که خیلی براش مهم بود ${formData.environmentalTopic} بود.
        
        ${storyElements.map(element => `\n${element}`).join('')}
        
        ${formData.childName} با کمک دوست جدیدش، یک سنجاب دانا به نام دانا، یاد گرفت که چطور می‌تونه به حفظ محیط زیست کمک کنه.
        
        اونها با هم تصمیم گرفتن...
      `;
    } else {
      generatedStory = `
        ${formData.childName} ${formData.age} ساله، که در ${formData.livingEnvironment} زندگی می‌کرد،
        یک روز متوجه مشکل مهمی در محیط زیست شد. اون تصمیم گرفت درباره ${formData.environmentalTopic} کاری انجام بده.
        
        ${storyElements.map(element => `\n${element}`).join('')}
        
        با کمک دوستاش و راهنمایی معلمش، ${formData.childName} یک برنامه عملی طراحی کرد...
      `;
    }

    setStory(generatedStory);
    setIsGenerating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (approachId) => {
    setFormData(prev => ({
      ...prev,
      academicApproaches: {
        ...prev.academicApproaches,
        [approachId]: !prev.academicApproaches[approachId]
      }
    }));
  };

  return (
      <Container size="lg" dir="rtl">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Text size="xl" weight={700} align="center" mb="md">
          سازنده داستان کودک
        </Text>
        
        <form onSubmit={form.onSubmit(generateStory)}>
          <Stack spacing="md">
            <TextInput
              label="نام کودک"
              placeholder="نام کودک را وارد کنید"
              {...form.getInputProps('childName')}
            />

            <NumberInput
              label="سن کودک"
              placeholder="سن کودک را وارد کنید"
              min={2}
              max={11}
              {...form.getInputProps('age')}
            />

            <Select
              label="موضوع زیست‌محیطی"
              placeholder="انتخاب کنید"
              data={environmentalTopics}
              {...form.getInputProps('environmentalTopic')}
            />

            <Select
              label="محیط زندگی"
              placeholder="انتخاب کنید"
              data={livingEnvironments}
              {...form.getInputProps('livingEnvironment')}
            />

            <Text weight={500} size="sm">رویکردهای آکادمیک</Text>
            <Grid>
              {academicApproachesData.map((approach) => (
                <Grid.Col span={6} key={approach.id}>
                  <Checkbox
                    label={approach.label}
                    description={approach.description}
                    {...form.getInputProps(`academicApproaches.${approach.id}`, { type: 'checkbox' })}
                  />
                </Grid.Col>
              ))}
            </Grid>

            <Button
              type="submit"
              loading={isGenerating}
            >
              {isGenerating ? 'در حال ساخت داستان...' : 'ساخت داستان'}
            </Button>
          </Stack>
        </form>
      </Card>

      {story && (
        <Paper shadow="sm" p="lg" radius="md" withBorder mt="xl">
          <Text size="xl" weight={700} mb="md">
            داستان {form.values.childName}
          </Text>
          <Text>
            {story.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <Text key={index} mb="md">
                  {paragraph}
                </Text>
              )
            ))}
          </Text>
        </Paper>
      )}
    </Container>
  );
}
