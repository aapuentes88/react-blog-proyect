import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

interface MainProps {
  posts: ReadonlyArray<string>;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;
  console.log('Main');
  console.log(posts.length)
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {
      posts.map((post, index) => {
        console.log('---------------------')
        console.log(post)
        console.log('----------------------')
        return (
        <Markdown className="markdown" key={index}>
          {post}
        </Markdown>
      )})
    }
    </Grid>
  );
}