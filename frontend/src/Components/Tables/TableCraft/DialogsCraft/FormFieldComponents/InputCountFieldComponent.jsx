import { InputNumber } from "primereact/inputnumber";

export const InputCountFieldComponent = ({ field, form: { setFieldValue, touched, errors }, ...props }) => {
  const { title, dialogType, disabled } = props;

  return (
    <div>
      <span>
        <label htmlFor={field.name} className="mb-2 font-bold">
          {title}
        </label>
        <InputNumber
          id={field.name}
          name={field.name}
          {...field.onBlur}
          value={field.value}
          onValueChange={(e) => setFieldValue(field.name, e.value)}
          aria-describedby={`${field.name}-help`}
          className={touched[field.name] && errors[field.name] && "p-invalid"}
          disabled={dialogType === "edit" && disabled}
          showButtons
          buttonLayout="horizontal"
          step={1}
          min={0}
        />
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
