<template>
  <v-row class="fill-height" align="center">
    <v-col class="d-flex justify-center">
      <v-card max-width="900">
        <v-card-title>
          Cryptocurrencies
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :loading="isLoading"
          :headers="headers"
          :items="cryptoData"
          :search="search"
        >
          <template v-slot:item.usd_24h_change="{ item }">
            <div
              :class="{
                'green--text': item.usd_24h_change >= 0,
                'red--text': item.usd_24h_change < 0,
              }"
            >
              {{ item.usd_24h_change.toFixed(2) }} %
            </div>
          </template>
          <template v-slot:item.usd="{ item }">
            <div
              :class="{
                'green--text': item.usd_24h_change >= 0,
                'red--text': item.usd_24h_change < 0,
              }"
            >
              {{ item.usd }}
            </div>
          </template>
          <template v-slot:item.name="{ item }">
            <router-link
              :to="{ name: 'chart', params: { coin: item.name } }"
              target="_blank"
            >
              <v-btn text>
                <v-icon left>mdi-{{ item.name }} </v-icon>
                <span>{{ item.name }} </span>
              </v-btn>
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  /**
 * Dashboard View
 * Main page to show table of cryptocurrencies
 *
 * @author Shahrokh elmi
 */

export default {
  name: "DashboardView",
  created() {
    this.fetchTableData();
  },
  methods: {
    
    // fetch data from backend
    fetchTableData() {
      this.$store
        .dispatch("fetchTableData")
        .then(() => {
          this.readyDataToShow();
          this.isLoading = false;
        })
        .catch((e) => {
          if (e.code === "ERR_NETWORK")
            this.$router.push({ name: "networkError" });
          else this.$router.push({ name: { name: "notFound" } });
        });
      },
      readyDataToShow(){
        this.rawData = this.$store.state.cryptoData;
        for (let i in this.rawData) {
            this.cryptoData.push({
              name: i,
              usd: this.rawData[i].usd,
              usd_24h_change: this.rawData[i].usd_24h_change,
              usd_24h_vol: (this.rawData[i].usd_24h_vol / 1000000).toFixed(2),
            });
          }
      }
  },

  data() {
    return {
      search: "",
      isLoading: true,
      rawData: null,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Last Price", value: "usd" },
        { text: "Changes in the last 24 hours", value: "usd_24h_change" },
        { text: "The volume in the last 24 hours(m)", value: "usd_24h_vol" },
      ],
      cryptoData: [],
    };
  },
};
</script>

<style></style>
