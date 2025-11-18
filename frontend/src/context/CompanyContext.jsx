import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import companyService from "../services/companyService";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    industry: "All",
    status: "All",
    country: "All",
    employeeSize: "All",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAllCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const full = await companyService.fetchAllCompanies();
      setAllCompanies(full);
      setCompanies(full);
      setLoading(false);
    } catch {
      setError("Failed to load companies");
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(() => {
    if (allCompanies.length === 0) return;
    const filtered = companyService.getFilteredCompanies(allCompanies, filters);
    setCompanies(filtered);
  }, [allCompanies, filters]);

  useEffect(() => {
    loadAllCompanies();
  }, [loadAllCompanies]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearError = () => setError(null);

  const fetchCompanyById = useCallback(async (id) => {
  setLoading(true);
  try {
    const local = allCompanies.find((c) => c.id == id);

    if (local) {
      setSelectedCompany(local);
      setLoading(false);
      return;
    }

    const apiCompany = await companyService.getCompanyById(id);
    setSelectedCompany(apiCompany);
    setLoading(false);
  } catch {
    setError("Company not found");
    setLoading(false);
  }
}, [allCompanies]);


  const getFilterOptions = useCallback(() => {
    return {
      industries: companyService.getIndustries(allCompanies),
      statuses: companyService.getStatuses(allCompanies),
      countries: companyService.getCountries(allCompanies),
    };
  }, [allCompanies]);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        allCompanies,
        selectedCompany,
        filters,
        updateFilters,
        loading,
        error,
        clearError,
        fetchCompanyById,
        getFilterOptions,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => useContext(CompanyContext);
