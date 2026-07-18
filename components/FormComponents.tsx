import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateAndEditJobType } from "@/utils/types";
import { Controller, type Control } from "react-hook-form";

type TextFieldName = "position" | "company" | "location";
type SelectFieldName = "status" | "mode";

type CustomFormFieldProps = {
  name: TextFieldName;
  control: Control<CreateAndEditJobType>;
  placeholder?: string;
};

export function CustomFormField({
  name,
  control,
  placeholder,
}: CustomFormFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <FieldLabel htmlFor={name} className="font-medium capitalize">
            {name}
          </FieldLabel>

          <Input
            {...field}
            id={name}
            placeholder={placeholder ?? `Enter ${name}`}
            aria-invalid={fieldState.invalid}
            className="h-11 rounded-xl bg-background shadow-xs"
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

type CustomFormSelectProps = {
  name: SelectFieldName;
  control: Control<CreateAndEditJobType>;
  items: readonly string[];
  labelText?: string;
  placeholder?: string;
};

export function CustomFormSelect({
  name,
  control,
  items,
  labelText,
  placeholder,
}: CustomFormSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <FieldLabel htmlFor={name} className="font-medium capitalize">
            {labelText ?? name}
          </FieldLabel>

          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              id={name}
              aria-invalid={fieldState.invalid}
              className="h-11 w-full rounded-xl bg-background capitalize shadow-xs"
            >
              <SelectValue
                placeholder={placeholder ?? `Select ${labelText ?? name}`}
              />
            </SelectTrigger>

            <SelectContent className="rounded-xl p-0.5">
              {items.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="capitalize rounded-xl p-2.5"
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
