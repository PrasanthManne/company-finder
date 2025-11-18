import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const simulateDelay = (ms = 300) => new Promise(res => setTimeout(res, ms));

const getEmployeeSize = (count) => {
  if (!count || isNaN(count)) return "Small";
  if (count < 2000) return "Small";
  if (count < 6000) return "Medium";
  return "Large";
};

const getCountryFromLocation = (location = "") => {
  if (!location) return "";
  const parts = location.split(",");
  return parts[parts.length - 1].trim();
};

const companyService = {
  async fetchAllCompanies() {
    await simulateDelay();
    const res = await axios.get(`${API_BASE_URL}/companies`);
    return res.data || [];
  },

  getFilteredCompanies(allCompanies, filters) {
    let list = [...allCompanies];

    if (filters.search?.trim()) {
      const s = filters.search.toLowerCase();
      list = list.filter((c) =>
        (c.name?.toLowerCase() ?? "").includes(s) ||
        (c.industry?.toLowerCase() ?? "").includes(s) ||
        (c.location?.toLowerCase() ?? "").includes(s) ||
        (c.tags ?? []).some((t) => (t?.toLowerCase() ?? "").includes(s))
      );
    }

    if (filters.status !== "All") {
      list = list.filter((c) => (c.status ?? "") === filters.status);
    }

    if (filters.industry !== "All") {
      list = list.filter((c) => (c.industry ?? "") === filters.industry);
    }

    if (filters.employeeSize !== "All") {
      list = list.filter((c) => getEmployeeSize(c.employees) === filters.employeeSize);
    }

    if (filters.country !== "All") {
      list = list.filter((c) => getCountryFromLocation(c.location) === filters.country);
    }

    return list;
  },

  getIndustries(all) {
    return [...new Set(all.map((c) => c.industry).filter(Boolean))].sort();
  },

  getStatuses(all) {
    return [...new Set(all.map((c) => c.status).filter(Boolean))].sort();
  },

  getCountries(all) {
    return [...new Set(all.map((c) => getCountryFromLocation(c.location)).filter(Boolean))].sort();
  },

  async getCompanyById(id) {
    const res = await axios.get(`${API_BASE_URL}/companies/${id}`);
    return res.data;
  }

};

export default companyService;
