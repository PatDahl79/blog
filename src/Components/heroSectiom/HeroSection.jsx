import { Typography } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/myContext';
import Banner from '../../assets/Anima1.png';
import { useNavigate } from "react-router";

const tags = [
  { id: 'general', name: 'General ADHD', path: 'general' },
  { id: 'men', name: 'Men ADHD', path: 'men' },
  { id: 'women', name: 'Women ADHD', path: 'women' },
  { id: 'kids', name: 'Kids ADHD', path: 'kids' },
  { id: 'author', name: 'Author', path: 'author' },
  { id: 'blogs', name: 'All Blogs', path: 'blogs' },
];

function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;
    const navigate = useNavigate();


    return (
        <section
            style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#30336b' }}>

            {/* Hero Section */}
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                {/* Main Content */}
                <main>
                    <div className="text-center">
                        <div className="mb-2">
                            {/* Image */}
                            <div className="flex justify-center">
                                <img src={Banner} alt="Banner" />
                            </div>

                            {/* Text */}
                            <Typography
                                variant="h1"
                                color="white"
                                className="text-3xl font-bold"
                            >
                                Bloggi
                            </Typography>
                        </div>

                        {/* Paragraph */}
                        <Typography
                            variant="lead"
                            color="white"
                            className="sm:text-3xl text-xl font-extralight sm:mx-auto"
                        >
                            Here are some ADHD blogs by Bloggi.
                        </Typography>
                    </div>
                </main>
            </div>

            {/* Tags Menu Section */}
            <div className="container mx-auto py-8">
                <nav>
                    <ul className="flex flex-wrap justify-center gap-4">
                        {tags.map(tag => (
                            <li key={tag.id}>
                                <Link 
                                    to={`/category/${tag.path}`}
                                    className="text-white hover:underline"
                                >
                                    {tag.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default HeroSection;
