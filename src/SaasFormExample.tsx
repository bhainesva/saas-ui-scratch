import { forwardRef } from "react";
import {
  createField,
  createForm,
  SubmitButton,
  FormLayout,
} from "@saas-ui/react";
import { CustomInput } from "./CustomInput";

const MyCustomField = createField(
  forwardRef((props, ref) => {
    return <CustomInput ref={ref} {...props} />;
  }),
  { isControlled: true }
);

export const Form = createForm({
  fields: {
    custom: MyCustomField,
  },
});

export const SaasFormExample = () => {
  return (
    <Form
      onSubmit={(vals) => alert(JSON.stringify(vals, null, 2))}
      defaultValues={{ items: [] }}
    >
      {({ Field }) => (
        <FormLayout>
          <Field
            isRequired={true}
            label="Label"
            type="custom"
            name="items"
            rules={{ required: "Required :)" }}
          />

          <SubmitButton>Submit</SubmitButton>
        </FormLayout>
      )}
    </Form>
  );
};
