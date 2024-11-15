import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { getItemDialogFooter } from "./Functions/getItemDialogFooter";
import { hideNew } from "./Functions/hideNew";
import { Description } from "./Description";
import styles from "./DialogCraft.module.css";

import { TimelinelHistoryCraft } from "./TabViewCraft/TimelineHistoryCraft";
import { TablelHistoryCraft } from "./TabViewCraft/TableHistoryCraft";
import { TablelHistoryCraft2 } from "./TabViewCraft/TableHistoryCraft2";
import { TimelinelTransferCraft } from "./TabViewCraft/TimelineTransferCraft";

export const DialogCraft = (props) => {
  const {
    name,
    data,
    columns,
    setItemDialog,
    ItemDialog,
    item,
    setItem,
    values,
    addData,
    updateData,
    emptyItem,
    userAuth,
  } = props;

  const [disabled, setDisabled] = useState(true);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabChange = (e) => {
    setActiveTabIndex(e.index);
  };

  return (
    <Dialog
      visible={ItemDialog}
      style={{
        height: "100%",
        width: activeTabIndex !== 0 ? "85rem" : "48rem",
      }}
      headerStyle={{ padding: "0.2rem" }}
      contentStyle={{ padding: 0 }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      closable={false} //для скрытия крестика в header dialog
      modal
      className="p-fluid"
      footer={getItemDialogFooter(
        addData,
        updateData,
        data,
        item,
        setItemDialog,
        setItem,
        emptyItem,
        userAuth,
        disabled,
        setDisabled,
        activeTabIndex
      )}
      onHide={hideNew(setItemDialog, setDisabled)}
    >
      <div className={styles.tabContainer}>
        <TabView activeIndex={activeTabIndex} onTabChange={handleTabChange}>
          <TabPanel
            header="Описание объекта"
            leftIcon="pi pi-objects-column mr-2"
          >
            <div
              className={styles.tabContent}
              style={{ padding: activeTabIndex == 1 ? 0 : "1.25rem" }}
            >
              <Description
                name={name}
                data={data}
                columns={columns}
                setItemDialog={setItemDialog}
                ItemDialog={ItemDialog}
                item={item}
                setItem={setItem}
                values={values}
                addData={addData}
                updateData={updateData}
                emptyItem={emptyItem}
                userAuth={userAuth}
                disabled={disabled}
              />
            </div>
          </TabPanel>
          {/* {item.logs !== undefined && (
            <TabPanel
              header="История изменений (timeline)"
              leftIcon="pi pi-objects-column mr-2"
            >
              <div className={styles.tabContent}>
                <TimelinelHistoryCraft item={item} />
              </div>
            </TabPanel>
          )} */}
          {item.logs !== undefined && (
            <TabPanel
              header="История перемещений"
              leftIcon="pi pi-objects-column mr-2"
            >
              <div className={styles.tabContent}>
                <TimelinelTransferCraft transfers={item.transfers} />
              </div>
            </TabPanel>
          )}
          {item.logs !== undefined && (
            <TabPanel
              header="История изменений 1"
              leftIcon="pi pi-objects-column mr-2"
            >
              <div className={styles.tabContent}>
                <TablelHistoryCraft logs={item.logs} />
              </div>
            </TabPanel>
          )}
          {item.logs !== undefined && (
            <TabPanel
              header="История изменений 2"
              leftIcon="pi pi-objects-column mr-2"
            >
              <div className={styles.tabContent}>
                <TablelHistoryCraft2 columns={columns} logs={item.logs} />
              </div>
            </TabPanel>
          )}
        </TabView>
      </div>
    </Dialog>
  );
};
