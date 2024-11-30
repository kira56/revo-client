import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { RegisterResolver } from "@resolvers/register-resolver.zod";
import clientAxios from "@shared/config/axios-client";
import { RegisterFormType } from "@shared/types/hook.forms";
import { useGlobalStore } from "@store/global.store";
import { useMutation } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const saveUser = useGlobalStore((state) => state.saveUser);

  const registerMethods = useForm<RegisterFormType>({
    mode: "all",
    resolver: RegisterResolver,
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
  } = registerMethods;

  const registerMutation = useMutation({
    mutationFn: async (formData: Omit<RegisterFormType, "confirmPassword">) => {
      const response = await clientAxios.post("/register", {
        email: formData.email,
        password: formData.password,
        name: formData.username,
      });

      return response.data;
    },
  });

  const handleRegisterSubmit = async (formData: RegisterFormType) => {
    await registerMutation.mutateAsync(formData, {
      onSuccess: (data) => {
        if (data) {
          saveUser({
            username: data.content.name,
            email: data.content.email,
            token: data.content.token,
          });

          navigate("/recommendation");
        }
      },
    });
  };

  return (
    <FormProvider {...registerMethods}>
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <Stack>
          <Controller
            name="username"
            render={({ field }) => (
              <TextInput
                {...field}
                label="Username"
                placeholder="John Doe"
                error={errors.username?.message}
                required
              />
            )}
          />
          <Controller
            name="email"
            render={({ field }) => (
              <TextInput
                required
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
                required
                label="Password"
                placeholder="******"
                error={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            render={({ field }) => (
              <PasswordInput
                {...field}
                required
                label="Confirm Password"
                placeholder="*****"
                error={errors.confirmPassword?.message}
              />
            )}
          />
          <Button
            type="submit"
            disabled={!isValid}
            loading={registerMutation.isPending}
          >
            Register
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
