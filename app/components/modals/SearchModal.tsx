'use client';
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import { FieldValues, useForm } from 'react-hook-form'; // Importing useForm from react-hook-form
import useSearchModal from "@/app/hooks/useSearchModal";
import Input from "../inputs/Input";

enum STEPS {
  TITLE = 0,
  CATEGORY = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.TITLE);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    setValue,
    watch,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      volume: 1,
      chapter: 1,
      schoolItem: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const [chapter, setChapter] = useState(1); // Corrected the function name to setChapter
  const category = watch('category');
  const [volume, setVolume] = useState(1); // Corrected the function name to setVolume
  const [schoolItem, setSchoolItem] = useState(1); // Corrected the function name to setSchoolItem

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      chapter,
      volume,
      schoolItem
    };


    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.TITLE);
    searchModal.onClose();
    router.push(url);
  }, 
  [
    step, 
    searchModal,  
    router, 
    chapter, 
    volume,
    onNext,
    schoolItem,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
        <Heading
          title="What is it that you desire?"
          subtitle="Make it short and precise!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
    

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes it?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          subtitle="Find your perfect place!"
        />
        <Counter 
          onChange={(value) => setChapter(value)} // Corrected the function name to setChapter
          value={chapter}
          title="Chapter" 
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter 
          onChange={(value) => setVolume(value)} // Corrected the function name to setVolume
          value={volume}
          title="Volume" 
          subtitle="How many rooms do you need?"
        />        
        <hr />
        <Counter 
          onChange={(value) => {
            setSchoolItem(value) // Corrected the function name to setSchoolItem
          }}
          value={schoolItem}
          title="Items"
          subtitle="How many bathrooms do you need?" // Corrected the subtitle
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;
