import { MultiSelect } from "primereact/multiselect";

export const MultiSelectFieldComponent = ({ field, form: { touched, errors }, ...props }) => {
  const { title, options, dialogType, disabled } = props;

  return (
    <div>
      <span>
        <label htmlFor={field.name} className="mb-2 font-bold">
          {title}
        </label>
        <MultiSelect
          id={field.name}
          {...field}
          options={options}
          aria-describedby={`${field.name}-help`}
          optionLabel="name"
          maxSelectedLabels={3}
          className={touched[field.name] && errors[field.name] && "p-invalid"}
          display="chip"
          disabled={dialogType === "edit" && disabled}
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
