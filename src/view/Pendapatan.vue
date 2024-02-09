<template>
  <h5 class="page-title">Laporan Pendapatan</h5>
  <span class="page-subtitle">Laporan pendapatan dan panjak tiap bulan.</span>

  <div class="d-card">
    <div class="income">
      <div class="data-header">
        <h5>Laporan Pendapatan</h5>
        <div class="flex gap-1 tools-group">
          <span class="d-sideicon-set d-input-iconleft filter-item">
            <span class="material-symbols-outlined"> search </span>
            <InputText
              v-model="query"
              placeholder="Cari laporan"
              style="width: 100%"
            />
          </span>
          <span
            class="tool span-nav-button left-labeled"
            role="button"
            @click="filterMenu = true"
          >
            <span>Filter</span>
            <span class="material-symbols-outlined"> filter_alt </span>
          </span>
        </div>
      </div>
      <div class="income-table">
        <div class="table-wrapper">
          <table class="d-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>No Faktur</th>
                <th>Depo</th>
                <th>Sales</th>
                <th>Pelanggan</th>
                <th>Total</th>
                <th>Pajak</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in report">
                <td>
                  <div class="flex flex-column">
                    <span>{{ formatDate(item.date, "date") }}</span>
                    <span>{{ formatDate(item.date, "time") }}</span>
                  </div>
                </td>
                <td>
                  <span class="d-uppercase">{{
                    item.reference.split(/(?=INV)/g)[0]
                  }}</span
                  ><br />
                  <span class="d-uppercase">{{
                    item.reference.split(/(?=INV)/g)[1]
                  }}</span>
                </td>
                <td>
                  <span>{{ item.depo }}</span>
                </td>
                <td>
                  <span>{{ item.sales }}</span>
                </td>
                <td>
                  <span>{{ item.customer_name }}</span>
                </td>
                <td>
                  <span>{{ formatCurrency(item.total_amount) }}</span>
                </td>
                <td>
                  <span>{{ formatCurrency(item.tax_amount) }}</span>
                </td>
                <td>
                  <Button icon="search" />
                </td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td>
                  <span class="summary">Total</span>
                </td>
                <td>
                  <span class="summary">{{
                    formatCurrency(sum ? sum.sum_total_amount : 0)
                  }}</span>
                </td>
                <td>
                  <span class="summary">{{
                    formatCurrency(sum ? sum.sum_tax_amount : 0)
                  }}</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="income-list"></div>
      <div class="income-paginator">
        <Paginator
          v-model:first="page"
          :rows="rpp"
          :total-records="total"
          style="width: 100%"
          :template="{
            '575px':
              'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            default:
              'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
          }"
          @page="onChangePage($event)"
        />
      </div>
    </div>
  </div>

  <div class="d-sidebar from-right" :class="{ 'd-sidebar-active': filterMenu }">
    <div class="d-sidebar-wrapper" @click="filterMenu = false"></div>
    <div class="d-sidebar-content filter-menu">
      <div class="header">
        <h5>Opsi Filter</h5>
        <span
          class="span-nav-button"
          role="button"
          tabindex="0"
          @click="filterMenu = false"
        >
          <span class="material-symbols-outlined"> close </span>
        </span>
      </div>
      <div class="subheader">
        <span>Konfigurasi dan filter pada tabel.</span>
      </div>
      <div class="body">
        <div class="filter-section">
          <Calendar placeholder="Filter Tanggal" />
        </div>
        <div class="filter-section">
          <InputText placeholder="Filter No Faktur" />
        </div>
        <div class="filter-section">
          <InputText placeholder="Filter Depo" />
        </div>
        <div class="filter-section">
          <InputText placeholder="Filter Sales" />
        </div>
        <div class="filter-section">
          <InputText placeholder="Filter Pelanggan" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useReportStore } from "../store/ReportStore";

const reportStore = useReportStore();
const report = computed(() => {
  return reportStore.reportIncome["data"];
});
const sum = computed(() => {
  return reportStore.reportIncome["sum"];
});
const query = ref("");
const rpp = ref(10);
const page = ref();
const total = ref();
const filterMenu = ref(false);

onMounted(async () => {
  await reportStore.GET__REPORT_INCOME(false, rpp.value);
  total.value = reportStore.reportIncome["meta"]["total"];
});

const onChangePage = async (e) => {
  await reportStore.GET__REPORT_INCOME(e["page"] + 1, rpp.value);
  console.log(reportStore.reportIncome);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

const formatDate = (value, type) => {
  // let newDate = new Date(value);
  if (type === "date")
    return `${Intl.DateTimeFormat("id-ID", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(value)}`;
  else
    return `${Intl.DateTimeFormat("id-ID", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    }).format(value)}`;
};

//
</script>

<style scoped lang="scss">
.summary {
  font-weight: 500;
}
.tools-group {
  .tool {
    background-color: var(--primary-a0);
    padding: 1rem 1rem;

    &:hover {
      background-color: var(--primary-a1);
    }

    &:active {
      background-color: var(--primary-a0);
    }
  }
}
.filter-menu {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h5 {
      margin: 0;
    }
  }
  .subheader {
    padding: 0.5rem 0 1rem 0;
    border-bottom: 1px solid var(--surface-input-border);
    color: var(--text-color-secondary);
  }
  .body {
    padding: 1rem 0;
    .filter-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
