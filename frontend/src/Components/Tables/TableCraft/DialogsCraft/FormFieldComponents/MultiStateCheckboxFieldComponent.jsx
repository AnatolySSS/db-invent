import { MultiStateCheckbox } from "primereact/multistatecheckbox";

export const MultiStateCheckboxFieldComponent = ({ field, form: { setFieldValue, touched, errors }, ...props }) => {
  const { title, options, setDeletedFieldsVisible, dialogType, disabled } = props;

  return (
    <div className="flex align-items-center">
      <span className="flex align-items-center">
        <MultiStateCheckbox
          id={field.name}
          inputid={field.name}
          name={field.name}
          {...field.onBlur}
          // {...field}
          value={field.value}
          onChange={(e) => {
            if (field.name === "was_deleted") {
              if (e.value === "true") {
                setDeletedFieldsVisible(true);
              } else {
                setDeletedFieldsVisible(false);
                setFieldValue("deleted_date", null);
                setFieldValue("deleted_grounds", null);
              }
            }
            setFieldValue(field.name, e.value);
          }}
          aria-describedby={`${field.name}-help`}
          options={options}
          optionValue="value"
          className={touched[field.name] && errors[field.name] && "p-invalid"}
          disabled={dialogType === "edit" && disabled}
        />
        <label htmlFor={field.name} className="font-bold mb-0 ml-2">
          {title}
        </label>
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
