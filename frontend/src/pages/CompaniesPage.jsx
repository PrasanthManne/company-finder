import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Alert,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  IconButton
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  SwapVert as SwapVertIcon
} from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../components/Navbar";
import CompanyCard from "../components/CompanyCard";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import Footer from "../components/Footer";
import { useCompanies } from "../context/CompanyContext";

const CompaniesPage = () => {
  const {
    companies,
    allCompanies,
    filters,
    updateFilters,
    loading,
    error,
    clearError,
    getFilterOptions
  } = useCompanies();

  const [showFilters, setShowFilters] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    industries: [],
    statuses: [],
    countries: []
  });

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    if (allCompanies.length > 0) {
      setFilterOptions(getFilterOptions());
    }
  }, [allCompanies, getFilterOptions]);

  const safe = (v) => (v ?? "").toString();

  const sortedList = [...companies].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? safe(a.name).localeCompare(safe(b.name))
        : safe(b.name).localeCompare(safe(a.name));
    }
    if (sortBy === "industry") {
      return sortOrder === "asc"
        ? safe(a.industry).localeCompare(safe(b.industry))
        : safe(b.industry).localeCompare(safe(a.industry));
    }
    if (sortBy === "employees") {
      return sortOrder === "asc"
        ? Number(a.employees) - Number(b.employees)
        : Number(b.employees) - Number(a.employees);
    }
    return 0;
  });

  const visibleCompanies = sortedList.slice(0, visibleCount);
  const hasMore = visibleCompanies.length < sortedList.length;

  const loadMore = () => {
    setTimeout(() => setVisibleCount((p) => p + 9), 500);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ flex: 1, py: 6 }}>
        <Typography variant="h2" fontWeight={700} mb={1}>
          Company Finder
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Browse and search through our company database
        </Typography>

        <TextField
          fullWidth
          placeholder="Search companies..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <Box
          sx={{
            position: "sticky",
            top: 64,
            zIndex: 999,
            background: "ghostwhite",
            py: 2,
            px: 1,
            mb: 3,

            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "flex-start", md: "space-between" },
            alignItems: "center",
            gap: 2,

            borderBottom: "1px solid #e0e0e0",
          }}
        >

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              width: { xs: "100%", md: "auto" }
            }}
          >
            <Box onClick={() => setShowFilters((prev) => !prev)} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FilterListIcon color="action" />
              <Typography fontWeight={600}>Filters:</Typography>
            </Box>

            <Box sx={{
              display: {
                xs: showFilters ? "flex" : "none", 
                md: "flex"                         
              },
              flexWrap: "wrap",
              gap: 2
            }}>
              <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 140 }, mr: 2, ml: 2 }}>
              <Select value={filters.status} onChange={(e) => updateFilters({ status: e.target.value })} displayEmpty>
                <MenuItem value="All">Status</MenuItem>
                {filterOptions.statuses.map((x) => (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 140 }, mr: 2, ml: 2  }}>
                <Select value={filters.industry} onChange={(e) => updateFilters({ industry: e.target.value })} displayEmpty>
                  <MenuItem value="All">All Industries</MenuItem>
                  {filterOptions.industries.map((x) => (
                    <MenuItem key={x} value={x}>
                      {x}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 140 }, mr: 2, ml: 2  }}>
                <Select
                  value={filters.employeeSize}
                  onChange={(e) => updateFilters({ employeeSize: e.target.value })}
                  displayEmpty
                >
                  <MenuItem value="All">All Sizes</MenuItem>
                  <MenuItem value="Small">Small</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Large">Large</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 140 }, mr: 2, ml: 2  }}>
                <Select value={filters.country} onChange={(e) => updateFilters({ country: e.target.value })} displayEmpty>
                  <MenuItem value="All">All Countries</MenuItem>
                  {filterOptions.countries.map((x) => (
                    <MenuItem key={x} value={x}>
                      {x}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
               display: {
                xs: showFilters ? "flex" : "none", 
                md: "flex"                         
              },
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              width: { xs: "100%", md: "auto" }
            }}
          >
            <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 140 } }}>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="industry">Industry</MenuItem>
                <MenuItem value="employees">Employees</MenuItem>
              </Select>
            </FormControl>

            <IconButton onClick={() => setSortOrder((p) => (p === "asc" ? "desc" : "asc"))}>
              <SwapVertIcon />
            </IconButton>

            <Button
              variant="outlined"
              color="error"
              
              sx={{ fontWeight: 600, textTransform: "none",  width: { xs: "100%", md: "auto" } }}
              onClick={() =>
                updateFilters({
                  search: "",
                  industry: "All",
                  status: "All",
                  country: "All",
                  employeeSize: "All"
                })
              }
            >
              Clear Filters
            </Button>
          </Box>
        </Box>

        <Typography mb={2} color="text.secondary">
          Found {companies.length} companies
        </Typography>

        {error && <ErrorAlert error={error} onRetry={clearError} onClose={clearError} />}

        <InfiniteScroll
          dataLength={visibleCompanies.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<Loader />}
          style={{ overflow: "visible" }}
        >
          <Grid container spacing={3} justifyContent={"center"}>
            {visibleCompanies.map((c) => (
              <Grid item xs={12} sm={6} md={4} key={c.id}>
                <CompanyCard company={c} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>

        {visibleCompanies.length === 0 && !loading && <Alert severity="info">No companies found.</Alert>}
      </Container>

      <Footer />
    </Box>
  );
};

export default CompaniesPage;
