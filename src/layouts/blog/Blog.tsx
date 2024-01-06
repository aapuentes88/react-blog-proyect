import React, { useEffect, useState } /*, { useEffect, useState }*/ from 'react'

import Header from 'components/Header';
import MainFeaturedPost from 'components/MainFeaturedPost';
import FeaturedPost from 'components/FeaturedPost';
import Main from 'components/Main';
import Sidebar from 'components/SideBar';
import Footer from 'components/Footer';

import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
// import { ThemeProvider } from '@emotion/react';
import { Container/*, createTheme, CssBaseline*/, Grid } from '@mui/material';
import PageLayout from 'layouts/containers/PageLayout'
import { API_URL, ENDPOINT_MAINPOST } from 'constants/api';
import { sections } from 'constants/objects';


// eslint-disable-next-line import/no-webpack-loader-syntax
// import markDown from '!!raw-loader!content/blogpost.md' 

//Alternativa al uso del loader de webpack ya que el raw-loader es una carga
// bruta talcual esta en el archivo  sin procesamiento o transformacion alguna
//como es un archivo estatico debe colocarse en la carpeta public
//* en este caso cargare los archivos desde el servidor y no local x eso comento el .md de public
async function loadMarkdown()   {
  try {
    // const response = await fetch('blogpost.md');
    // const content = await response.text()
    const response = await fetch(`${API_URL}${ENDPOINT_MAINPOST}`);
    const content = await response.text()    
    return content;
    // Aquí puedes realizar cualquier otra operación con el contenido del archivo Markdown
  } catch (error) {
    console.error('Error al cargar el archivo:', error);
  }
}

const mainFeaturedPost = {
  title: 'The Impact of Artificial Intelligence in Modern Technology',
  description:
    "Discover how Artificial Intelligence (AI) is revolutionizing technology today. From advancements in machine learning and computer vision to virtual assistants and automation",
  image: 'ai_pub.jpeg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Future of Mobile',
    date: 'Nov 12',
    description:
      'Dive into the dynamic world of mobile technology and discover the latest innovations.',
    image: 'mobile.jpeg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Power of Cloud Computing',
    date: 'Nov 11',
    description:
      'From improved scalability and cost-efficiency to increased storage and seamless collaboration.',
    image: 'cloud1.jpeg',
    imageLabel: 'Image Text',
  },
];

// I aim to empower and assist others by providing informative posts, engaging forums, and discussions on cutting-edge technological advancements, programming tips, and more. Join me as we explore the exciting world of technology together and discover how it can positively impact our lives.
const sidebar = {
  title: 'About',
  description:
    "Welcome to TechBlog! I'm Albert, an engineer with a passion for all things related to technology and computer science. This blog is dedicated to sharing my knowledge and insights on various technological topics.  Feel free to leave comments and participate in the forums; let's learn, grow, and help each other thrive in this ever-evolving tech landscape.",
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};


// const posts = [markDown];

// const defaultTheme = createTheme();

export default function Blog() {
  
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const content = await loadMarkdown();
      if (content !== undefined)
          setPosts([content]);
      // Aquí puedes realizar cualquier otra operación con los posts obtenidos
    }
    fetchData();
  }, []);

  return (
    // <ThemeProvider theme={defaultTheme}>
    // <CssBaseline />
    // <AuthProvider>
    <PageLayout>
    <Container /*fixed*/ maxWidth="lg">
      <Header title="Blog" sections={sections} />
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
          </Grid> 
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Main title="Introduction to Algorithms:" posts={posts} />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
        </Grid>
      </main>
    </Container>
    <Footer
      title="Footer"
      description="Something here to give the footer a purpose!"
    />
    </PageLayout> 
    // </AuthProvider>
   // </ThemeProvider>
  )
}
