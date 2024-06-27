import axios from "axios";

// const mode = "dev";
const mode = "prod";

const baseValues = {
  baseprotocal: {
    dev: "http://",
    prod: "https://",
  },
  basehost: {
    dev: "127.0.0.1:4000/",
    prod :"expense-tracker-backend-silk.vercel.app/"
  },
};

const baseProtocal = baseValues.baseprotocal[mode];
const baseHost = baseValues.basehost[mode];
const baseURL = baseProtocal + baseHost;

const HTTP = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export {HTTP}