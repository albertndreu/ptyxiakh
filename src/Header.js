import logo from './logo.png';

const Header = () => {
    const title = "BlockTrace";

    return (
        <div className="header">
        <h1>{title}</h1>
        <img src={logo} alt="Logo" className="logo"/>
        <nav className="Navbar">     
            <div className="links">
                
                <a href="/">Home</a>
                <a href="/RegisterDocument">Submit Documents</a>
                <a href="/AllDocuments">All Documents</a>
                <a href="/MyDocuments">My Documents</a>
                <a href="/Profile">Profile</a>
                <a href="/LogIn">Login</a>
                <a href="/RegisterCandidate">RegisterCandidate</a>
            </div>
        </nav>
        </div>
    );
}

export default Header;