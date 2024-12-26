import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
              
              <Link to={'/'} className="btn font-bold text-2xl btn-ghost ">Car rent</Link>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a className="text-2xl" href="https://github.com/rabiulkhan7224"><FaGithub></FaGithub></a>
          
        </nav>
      </footer>
    );
};

export default Footer;