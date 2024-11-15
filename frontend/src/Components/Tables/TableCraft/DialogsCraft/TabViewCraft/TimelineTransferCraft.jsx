import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { formatDate } from "../../../Functions/Helpers/formatDate";

export const TimelinelTransferCraft = (props) => {
  let { transfers } = props;

  transfers = transfers.map((tr, i) => ({
    ...tr,
    dateFrom: new Date(tr.date),
    dateTo: new Date(transfers[i + 1]?.date).setDate(
      new Date(transfers[i + 1]?.date).getDate() - 1
    ),
  }));

  transfers = transfers
    //Сортировка по дате (сначала последние изменения)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB - dateA;
    })
    //Изменение нумерации (вверху последние)
    .map((tr, i) => ({ ...tr, id: transfers.length - i }));
  console.log(transfers);

  const customizedSubTitle = (item) => {
    return (
      <div>
        <strong>Период использования: </strong>
        <Tag className="text-base" value={formatDate(item.dateFrom)} />
        <i className="pi pi-minus mx-2" />
        <Tag
          className="text-base"
          value={item.dateTo ? formatDate(item.dateTo) : "настояшее время"}
        />
      </div>
    );
  };

  const customizedContent = (item) => {
    console.log(item);

    return (
      <Card
        title={item.name}
        subTitle={customizedSubTitle(item)}
        className="mb-4"
      >
        <div className="mb-2">
          <strong>Основание:</strong>
        </div>
        {item.note}
      </Card>
    );
  };

  const customizedMarker = (item) => {
    return (
      <span className="flex w-2rem h-2rem align-items-center justify-content-center bg-primary text-white font-bold border-circle z-1 shadow-1">
        {item.id}
      </span>
    );
  };

  return (
    <div className="card mt-4">
      {transfers.length === 0 ? (
        "С момента создания записи изменения не вносились"
      ) : (
        <Timeline
          value={transfers}
          className="customized-timeline"
          marker={customizedMarker}
          content={customizedContent}
        />
      )}
    </div>
  );
};
