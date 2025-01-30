import React from "react";
import { classNames } from "primereact/utils";
import { formatDate } from "../../../Functions/Helpers/formatDate";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";

export const ItemTemplate = ({ product, index }) => {
  return (
    <div className="col-12" key={product.id}>
      <Tooltip target=".tag-item" />
      <div
        className={classNames("flex flex-column xl:flex-row xl:align-items-start p-4 gap-4", {
          "border-top-1 surface-border": index !== 0,
        })}
      >
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3 w-full">
            <div className="text-base font-bold text-500">{product.type}</div>
            <div className="text-base font-bold">{product.name}</div>
            <div className="flex justify-content-between w-full">
              <div className="flex flex-row gap-3">
                {product.inventary_number && (
                  <div>
                    <Tag
                      className="tag-item text-base cursor-pointer"
                      value={product.inventary_number}
                      data-pr-tooltip="Инвентарный №"
                      data-pr-position="bottom"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                )}
                {product.qr_code && (
                  <div>
                    <Tag
                      className="tag-item text-base cursor-pointer"
                      value={product.qr_code}
                      data-pr-tooltip="QR-CODE"
                      data-pr-position="bottom"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                )}
                {product.serial && (
                  <div>
                    <Tag
                      className="tag-item text-base cursor-pointer"
                      value={product.serial}
                      data-pr-tooltip="Серийный №"
                      data-pr-position="bottom"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                )}
                {product.employee_setup_date && (
                  <div>
                    <Tag
                      className="tag-item text-base cursor-pointer"
                      value={formatDate(product.employee_setup_date)}
                      data-pr-tooltip="Дата передачи сотруднику"
                      data-pr-position="bottom"
                      style={{ fontSize: "2rem" }}
                    />
                  </div>
                )}
              </div>
              {product.location && (
                <div>
                  <Tag
                    className="tag-item text-base cursor-pointer"
                    value={product.location}
                    data-pr-tooltip="Место установки"
                    data-pr-position="bottom"
                    style={{ fontSize: "2rem" }}
                  />
                </div>
              )}
            </div>
            {/* <div className="flex flex-row gap-3">
                {product.employee_setup_date && (
                  <div>
                    Дата передачи <Tag className="text-base" value={formatDate(product.employee_setup_date)} />
                  </div>
                )}
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
