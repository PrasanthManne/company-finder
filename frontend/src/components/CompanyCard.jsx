import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Stack,
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const getCompanySize = (employees) => {
  
  if (employees < 2000) return 'small';
  if (employees < 6000) return 'medium';
  return 'large';
};

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  const size = getCompanySize(company.employees);

  const handleViewDetails = () => {
    navigate(`/companies/${company.id}`);
  };

  return (
    <Card
      sx={{
        height: 350,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
        position: 'relative',
      }}
      onClick={handleViewDetails}
    >
      {/* Status Badge */}
      <Chip
        label={company.status}
        size="small"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: company.status === 'Closed' ? '#e65100' : company.status === 'Startup' ? '#1976d2' : '#2e7d32',
          fontWeight: 600,
          fontSize: '0.75rem',
          height: '24px',
          textTransform: 'lowercase',
        }}
      />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <BusinessIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h2" fontWeight={600} sx={{ mb: 0.5 }}>
              {company.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {company.industry}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.6,
          }}
        >
          {company.description}
        </Typography>

        {/* Location, Employees, Size */}
        <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {company.location.split(',')[0]}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PeopleIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {company.employees} employees
            </Typography>
          </Box>
          <Chip
            label={size}
            size="small"
            sx={{
              bgcolor: 'grey.100',
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '0.75rem',
              height: '22px',
            }}
          />
        </Stack>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, minHeight: '32px' }}>
          {company.tags.slice(0, 3).map((tag, index) => (
            <Chip
              key={index}
              label={tag.toLowerCase()}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 1,
                fontSize: '0.75rem',
                height: '26px',
                borderColor: 'divider',
              }}
            />
          ))}
          {company.tags.length > 3 && (
            <Chip
              label={`+${company.tags.length - 3}`}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 1,
                fontSize: '0.75rem',
                height: '26px',
                borderColor: 'divider',
              }}
            />
          )}
        </Box>

        {/* Visit Button */}
        <Button
          variant="outlined"
          fullWidth
          endIcon={<OpenInNewIcon fontSize="small" />}
          onClick={handleViewDetails}
          sx={{
            mt: 'auto',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Visit
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
