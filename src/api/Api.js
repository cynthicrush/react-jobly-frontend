import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001'

class JoblyApi {
    static token

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    static async signup(data) {
        let response = await this.request('auth/register', data, 'post')
        return response.token
    }

    static async login(data) {
        let response = await this.request('auth/token', data, 'post')
        return response.token
    }

    static async getCompanies(name) {
        let response = await this.request('companies', {name})
        return response.companies
    }

    static async getAllCompanies() {
        let response = await this.request('companies')
        return response.companies
    }

    static async getCompany(handle) {
        let response = await this.request(`companies/${handle}`)
        return response.company
    }

    static async getJobs(title) {
        let response = await this.request('jobs', {title})
        return response.jobs
    }

    static async getAllJobs() {
        let response = await this.request('jobs')
        return response.jobs
    }

    static async getCurrentUser(username) {
        let response = await this.request(`users/${username}`)
        return response.user
    }

    static async applyToJob(username, id) {
        await this.request(`users/${username}/jobs/${id}`, {}, 'post')
    }

    static async saveProfile(username, data) {
        let response = await this.request(`users/${username}`, data, 'patch')
        return response.user
    }
}

export default JoblyApi
