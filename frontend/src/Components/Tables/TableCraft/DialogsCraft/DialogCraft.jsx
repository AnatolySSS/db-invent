import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { getItemDialogFooter } from "./Functions/getItemDialogFooter";
import { hideNew } from "./Functions/hideNew";
import { Description } from "./Description";
import styles from "./DialogCraft.module.css";

import { TimelinelHistoryCraft } from "./TabViewCraft/TimelineHistoryCraft";
import { TableHistoryCraftOld } from "./TabViewCraft/TableHistoryCraftOld";
import { TablelHistoryCraft } from "./TabViewCraft/TableHistoryCraft";
import { TimelinelTransferCraft } from "./TabViewCraft/TimelineTransferCraft";
import { TreeTablelHistoryCraft } from "./TabViewCraft/TreeTableHistoryCraft";

export const DialogCraft = (props) => {
  const {
    type,
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
    dialogType,
    employees,
    toast,
  } = props;

  const [disabled, setDisabled] = useState(true);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const formButtonRef = useRef();

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
        setItemDialog,
        userAuth,
        disabled,
        setDisabled,
        activeTabIndex,
        setActiveTabIndex,
        dialogType,
        formButtonRef
      )}
      onHide={hideNew(setItemDialog, setDisabled)}
    >
      <div className={styles.tabContainer}>
        <TabView activeIndex={activeTabIndex} onTabChange={handleTabChange} scrollable>
          <TabPanel header="Описание объекта" leftIcon="pi pi-objects-column mr-2">
            <div className={styles.tabContent} style={{ padding: activeTabIndex == 1 ? 0 : "1.25rem" }}>
              <Description
                type={type}
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
                employees={employees}
                dialogType={dialogType}
                formButtonRef={formButtonRef}
                setDisabled={setDisabled}
                toast={toast}
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
            <TabPanel header="История перемещений" leftIcon="pi pi-objects-column mr-2">
              <div className={styles.tabContent}>
                <TimelinelTransferCraft trans={item.trans} />
              </div>
            </TabPanel>
          )}
          {/* {item.logs !== undefined && (
            <TabPanel
              header="История изменений 1"
              leftIcon="pi pi-objects-column mr-2"
            >
              <div className={styles.tabContent}>
                <TablelHistoryCraft logs={item.logs} />
              </div>
            </TabPanel>
          )} */}
          {item.logs !== undefined && (
            <TabPanel header="История изменений" leftIcon="pi pi-objects-column mr-2">
              <div className={styles.tabContent}>
                <TablelHistoryCraft columns={columns} logs={item.logs} />
              </div>
            </TabPanel>
          )}
          {/* {item.logs !== undefined && (
            <TabPanel
              header="История изменений 3"
              leftIcon="pi pi-objects-column mr-2"
            >
              <div className={styles.tabContent}>
                <TreeTablelHistoryCraft columns={columns} logs={item.logs} />
              </div>
            </TabPanel>
          )} */}
        </TabView>
      </div>
    </Dialog>
  );
};
