'use client';
import axios from 'axios';
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {signIn} from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues:{
      name: '',
      email: '',
      password: ''
    },
  });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(()=>{
                toast.success('Registered!');
                registerModal.onClose();
            })
            .catch((error)=>{
                toast.error('something wrong');
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

  // @ts-ignore
  const bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
            title="Welcome to Airbnb"
            subtitle="Create an account!"
        />
        <Input
            id="email"
            label="Email"
            disable={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="name"
            label="Name"
            disable={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="password"
            type="password"
            label="Password"
            disable={isLoading}
            register={register}
            errors={errors}
            required
        />
      </div>
  )

    const footerContent=(
        <div className="flex flex-col gap-4 ">
            <hr/>
            <Button
                outline
                label="Continue With Google"
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Button
                outline
                label="Continue With Github"
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div className=" justify-center flex flex-row items-center gap-2">
                <div>
                    Already have an account?
                </div>
                <div
                    onClick={registerModal.onClose}
                    className="
                    text-neutral-800
                    cursor-pointer
                    hover:underline
                ">
                    Log in
                </div>
            </div>
        </div>
    )

  return(
      <Modal
          disable={isLoading}
          isOpen={registerModal.isOpen}
          title="Register"
          actionLabel="Continue"
          onClose={registerModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
      />
  );
}

export default RegisterModal;