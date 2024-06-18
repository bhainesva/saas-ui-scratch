import { useForm } from "react-hook-form";
import { CustomInput } from "./CustomInput";
import { Controller } from "@saas-ui/react";

export function ReactHookFormExample() {
  const onSubmit = (data) => alert(JSON.stringify(data, null, 2));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [] as string[],
    },
  });
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="items"
        rules={{
          required: "Required :)",
        }}
        required={true}
        render={({ field }) => {
          return <CustomInput {...field} />;
        }}
      />
      {errors.items && (
        <div style={{ color: "red" }}>{errors.items.message}</div>
      )}

      <input type="submit" value="Submit" />
    </form>
  );
}
