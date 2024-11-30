import {
  Button,
  Checkbox,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { LoginResolver } from "@resolvers/login-resolver.zod";
import clientAxios from "@shared/config/axios-client";
import { LoginFormType } from "@shared/types/hook.forms";
import { useGlobalStore } from "@store/global.store";
import { IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const navigate = useNavigate();
  const saveUser = useGlobalStore((state) => state.saveUser);

  const loginMethods = useForm<LoginFormType>({
    mode: "all",
    resolver: LoginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = loginMethods;

  const loginMutation = useMutation({
    mutationFn: async (formData: LoginFormType) => {
      const response = await clientAxios.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      return response.data;
    },
  });

  const handleLoginSubmit = async (formData: LoginFormType) => {
    await loginMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        if (data) {
          saveUser({
            username: data.name,
            email: data.email,
            token: data.token,
          });

          navigate("/recommendation");
        }
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          throw notifications.show({
            color: "red",
            position: "top-right",
            message: error.response?.data.message,
            icon: <IconX size={14} />,
          });
        }
        throw notifications.show({
          color: "red",
          position: "top-right",
          message: "Something went wrong, Please try again",
          icon: <IconX size={14} />,
        });
      },
    });
  };

  return (
    <FormProvider {...loginMethods}>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <Stack>
          <Controller
            name="email"
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email"
                placeholder="Email"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Password"
                placeholder="Password"
                error={errors.password?.message}
              />
            )}
          />
          <Checkbox label="Remember me" />
          <Button
            type="submit"
            disabled={!isValid}
            loading={loginMutation.isPending}
          >
            Login
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
