import { AutoComplete } from "primereact/autocomplete";

export const AutoCompleteFieldComponent = ({ field, form: { touched, errors }, ...props }) => {
  const { title, options, suggestions, onSelect, completeMethod, dialogType, disabled } = props;

  return (
    <div>
      <span>
        <label htmlFor={field.name} className="mb-2 font-bold">
          {title}
        </label>
        <AutoComplete
          id={field.name}
          {...field}
          options={options}
          suggestions={suggestions}
          completeMethod={completeMethod}
          onSelect={onSelect}
          forceSelection
          aria-describedby={`${field.name}-help`}
          className={touched[field.name] && errors[field.name] && "p-invalid"}
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
