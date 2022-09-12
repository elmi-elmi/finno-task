<template>
  <v-row class="fill-height" align='center'>
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
        <v-data-table :headers="headers" :items="desserts" :search="search">
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
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
  created() {
    console.log("created");
    this.fetchTableData();
  },
  methods: {
    fetchTableData() {
      this.$store.dispatch("fetchTableData").then(() => {
        this.rawData = this.$store.state.cryptoData;
        for (let i in this.rawData) {
          console.log(i);
          this.desserts.push({
            name: i,
            usd: this.rawData[i].usd,
            usd_24h_change: this.rawData[i].usd_24h_change,
            usd_24h_vol: (this.rawData[i].usd_24h_vol / 1000000).toFixed(2),
          });
        }
      });
    },
  },

  data() {
    return {
      search: "",
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
      desserts: [],
    };
  },
};
</script>

<style></style>
