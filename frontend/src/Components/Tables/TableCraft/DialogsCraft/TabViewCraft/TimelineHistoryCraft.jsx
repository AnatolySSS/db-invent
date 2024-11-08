import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { formatDate } from "../../../Functions/Helpers/formatDate";

export const TimelinelHistoryCraft = (props) => {
  const { item } = props;

  const customizedContent = (item) => {
    return (
      <Card
        title={item.changedFiled}
        subTitle={item.changedEmployeeName}
        className="mb-4"
      >
        <h4>Старое значение:</h4>
        {item.oldValue}
        <h4>Новое значение:</h4>
        {item.newValue}
      </Card>
    );
  };

  return (
    <div className="card">
      {item.logs.length === 0 ? (
        "С момента создания записи изменения не вносились"
      ) : (
        <Timeline
          value={item.logs}
          align="alternate"
          className="customized-timeline"
          content={customizedContent}
          opposite={(item) => (
            <Tag value={formatDate(item.changedDateTime, "updatedAt")} />
          )}
        />
      )}
    </div>
  );
};
