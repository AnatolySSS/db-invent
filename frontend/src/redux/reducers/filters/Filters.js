import { FilterMatchMode, FilterOperator } from "primereact/api";

export const Filters = {
  data: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    inventary_number: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    qr_code: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    serial: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    type: { value: null, matchMode: FilterMatchMode.IN },
    purchase_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    purchase_price: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    incoming_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    employee_setup_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    ad_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    employee: { value: null, matchMode: FilterMatchMode.IN },
    financially_responsible_person: { value: null, matchMode: FilterMatchMode.IN },
    city_name: { value: null, matchMode: FilterMatchMode.IN },
    set_with: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    workplace_type: { value: null, matchMode: FilterMatchMode.IN },
    serviceable: { value: null, matchMode: FilterMatchMode.IN },
    note: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    is_workplace: { value: null, matchMode: FilterMatchMode.EQUALS },
    location: { value: null, matchMode: FilterMatchMode.IN },
    was_deleted: { value: null, matchMode: FilterMatchMode.EQUALS },
    deleted_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    deleted_grounds: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    release_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    updatedAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    count: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    measurement: { value: null, matchMode: FilterMatchMode.IN },
    checked: { value: null, matchMode: FilterMatchMode.EQUALS },
    scan_date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    inv_user: { value: null, matchMode: FilterMatchMode.IN },
    invent_note: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  },

  employees: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name: { value: null, matchMode: FilterMatchMode.IN },
    department: { value: null, matchMode: FilterMatchMode.IN },
    title: { value: null, matchMode: FilterMatchMode.IN },
    city_name: { value: null, matchMode: FilterMatchMode.IN },
    login: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    mail: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    phone: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    dn: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    employee_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    is_present: { value: null, matchMode: FilterMatchMode.EQUALS },
  },

  users: {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    full_name: { value: null, matchMode: FilterMatchMode.IN },
    department: { value: null, matchMode: FilterMatchMode.IN },
    title: { value: null, matchMode: FilterMatchMode.IN },
    city_name: { value: null, matchMode: FilterMatchMode.IN },
    login: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    mail: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    phone: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    role: { value: null, matchMode: FilterMatchMode.IN },
    access_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    data_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    updatedAt: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  },
};
