import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Button,
  Stack,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Language as LanguageIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';
import { useCompanies } from '../context/CompanyContext';
import Footer from '../components/Footer';

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCompany, loading, error, fetchCompanyById, clearError } = useCompanies();

  useEffect(() => {
  fetchCompanyById(id);
}, [id]);


  const handleRetry = () => {
    clearError();
    fetchCompanyById(id);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Loader type="detail" />
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/companies')}
            sx={{ mb: 3 }}
          >
            Back to Companies
          </Button>
          <ErrorAlert error={error} onRetry={handleRetry} onClose={clearError} />
        </Container>
      </Box>
    );
  }

  if (!selectedCompany) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/companies')}
          sx={{ mb: 3, position: 'sticky', top: '64px', background: 'ghostwhite'}}
        >
          Back to Companies
        </Button>

        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                gap: 6, 
              }}
            >
              
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                  }}
                >
                  {selectedCompany.name}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    icon={<BusinessIcon />}
                    label={selectedCompany.industry}
                    color="primary"
                  />
                </Stack>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.1rem' }}
                >
                  {selectedCompany.description}
                </Typography>
              </Box>

              
              <Box
                sx={{
                  minWidth: "240px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",  
                  gap: 3,
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    {selectedCompany.employees}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Employees
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "left" }}>
                  <CalendarIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                  <Typography variant="h6" fontWeight={600}>
                    {selectedCompany.founded}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Founded
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', width: 300 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Contact Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LanguageIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Website
                      </Typography>
                      <Typography
                        variant="body1"
                        component="a"
                        href={selectedCompany.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {selectedCompany.website}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography
                        variant="body1"
                        component="a"
                        href={`mailto:${selectedCompany.email}`}
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        {selectedCompany.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PhoneIcon color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">{selectedCompany.phone}</Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Company Overview
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Industry
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedCompany.industry}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Location
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedCompany.location}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Specializations
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {selectedCompany.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" color="primary" />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CompanyDetailsPage;
