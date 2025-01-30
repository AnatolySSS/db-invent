import { Calendar } from "primereact/calendar";

export const CalendarFieldComponent = ({ field, form: { touched, errors }, ...props }) => {
  const { title, dialogType, disabled } = props;

  return (
    <div>
      <span>
        <label htmlFor={field.name} className="mb-2 font-bold">
          {title}
        </label>
        <Calendar
          id={field.name}
          {...field}
          dateFormat="dd.mm.yy"
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
