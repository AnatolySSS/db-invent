import { InputNumber } from "primereact/inputnumber";

export const InputPriceFieldComponent = ({ field, form: { setFieldValue, touched, errors }, ...props }) => {
  const { title, dialogType, disabled } = props;

  return (
    <div>
      <span>
        <label htmlFor={field.name} className="mb-2 font-bold">
          {title}
        </label>
        <div className="p-inputgroup flex-1">
          <InputNumber
            id={field.name}
            name={field.name}
            {...field.onBlur}
            value={field.value}
            onValueChange={(e) => setFieldValue(field.name, e.value)}
            aria-describedby={`${field.name}-help`}
            className={touched[field.name] && errors[field.name] && "p-invalid"}
            disabled={dialogType === "edit" && disabled}
            mode="currency"
            currency="RUB"
            locale="ru-RU"
          />
          <span
            className={`p-inputgroup-addon bg-primary p-1 text-lg ${dialogType === "edit" && disabled && "opacity-60"}`}
          >
            ₽
          </span>
        </div>
      </span>
      <div className="mt-1">
        {touched[field.name] && errors[field.name] && (
          <div className="text-right">
            <small id={`${field.name}-help`} style={{ color: "red" }}>
              {errors[field.name]}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};
