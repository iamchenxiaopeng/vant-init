import HttpRequest from './_axios'
const axios = new HttpRequest(process.env.BASE_URL)
export default axios