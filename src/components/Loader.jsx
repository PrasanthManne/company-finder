import React from 'react';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

const CompanyCardSkeleton = () => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ pt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        <Skeleton variant="rounded" width={48} height={48} animation="wave" />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" height={28} width="70%" animation="wave" />
          <Skeleton variant="text" height={20} width="50%" animation="wave" />
        </Box>
      </Box>
      <Skeleton variant="text" height={20} animation="wave" />
      <Skeleton variant="text" height={20} animation="wave" />
      <Skeleton variant="text" height={20} width="60%" animation="wave" sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Skeleton variant="text" width={100} height={20} animation="wave" />
        <Skeleton variant="text" width={120} height={20} animation="wave" />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Skeleton variant="rounded" width={80} height={26} animation="wave" />
        <Skeleton variant="rounded" width={80} height={26} animation="wave" />
        <Skeleton variant="rounded" width={80} height={26} animation="wave" />
      </Box>
      <Skeleton variant="rounded" height={36} animation="wave" />
    </CardContent>
  </Card>
);

const Loader = ({ count = 6, type = 'card' }) => {
  if (type === 'detail') {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
          <Skeleton variant="rectangular" width={300} height={300} animation="wave" />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" height={60} width="70%" animation="wave" />
            <Skeleton variant="text" height={30} width="40%" animation="wave" sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Skeleton variant="rounded" width={100} height={32} animation="wave" />
              <Skeleton variant="rounded" width={100} height={32} animation="wave" />
              <Skeleton variant="rounded" width={100} height={32} animation="wave" />
            </Box>
            <Skeleton variant="text" height={24} animation="wave" />
            <Skeleton variant="text" height={24} animation="wave" />
            <Skeleton variant="text" height={24} width="80%" animation="wave" />
          </Box>
        </Box>
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Skeleton variant="rounded" height={120} animation="wave" />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {[...Array(count)].map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <CompanyCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default Loader;
