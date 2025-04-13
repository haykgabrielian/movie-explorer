import { Link } from '@tanstack/react-router';

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/about">Go to About</Link>
        </div>
    );
};

export default Home;