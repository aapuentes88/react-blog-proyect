import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

interface FeaturedPostProps {
  post: {
    date: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
  };
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          {/* <CardContent sx={{ flex: 1 }}> */}
          <CardContent sx={{ flex: '1 1 auto', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          <div style={{ flex: '1 1 auto' }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="body2" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle2" color="primary">
              Continue reading...
            </Typography>
            </div>
            <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}