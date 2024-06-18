import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hamburger } from './Hamburger';
import List from './List';
import Footer from './Footer';

let links = ["/Introduction.txt"];

function SearchBar(search: string, texts: string): string {
  const regex = new RegExp(search, 'gi');
  return texts.replace(regex, (match) => `<mark>${match}</mark>`);
}

function Home() {
  const [texts, setTexts] = useState("");
  const [search, setSearches] = useState("");
  const [highlighted, setHighlight] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<any>(null);

  useEffect(() => {
    async function main() {
      const files = await Promise.all(
        links.map((link) => fetch(link).then((res) => res.text()))
      );
      setTexts(files.join('\n'));
    }
    main();
  }, []);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!search.trim()) {
      return;
    }
    const highlight = SearchBar(search, texts);
    setHighlight(highlight);
    setPopupVisible(true);
    const element = document.querySelector('mark');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (event: { target: { value: string; }; }) => {
    setSearches(event.target.value);
    if (event.target.value === "") {
      setPopupVisible(false);
    } else {
      setPopupVisible(true);
    }
  };

  const handleItemClick = (disease: any) => {
    setSelectedDisease(disease);
    setPopupVisible(false);
  };

  const renderMainContent = () => {
    if (selectedDisease) {
      return (
        <>
          <h2>{selectedDisease.title}</h2>
          <p><strong>Gejala:</strong> {selectedDisease.gejala}</p>
          <p><strong>Penyebab:</strong> {selectedDisease.penyebab}</p>
          <p><strong>Pengobatan:</strong> {selectedDisease.pengobatan}</p>
        </>
      );
    }
    return <pre dangerouslySetInnerHTML={{ __html: highlighted || texts }}></pre>;
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <img src='logo.png' alt='UMN Medic' height={"80px"} />
          <Hamburger onClick={() => {}}>
            <form onSubmit={handleSubmit} className="search-form">
              <input
                type="text"
                value={search}
                onChange={handleInputChange}
                onKeyDown={(event) => { if (event.key === "Enter") handleSubmit(event) }}
                name='search'
                placeholder="Search.."
              />
              <img src="search.svg" onClick={handleSubmit} />&ensp;
            </form>
          </Hamburger>
          {isPopupVisible && <List input={search} text={texts} onItemClick={handleItemClick} />}
        </div>
        <div className="left-aside">
          <div className='sidebar'>
            <p>Links</p>
            <ul>
              <li><Link to="/">Home&ensp;</Link></li>
              <li><Link to="/Disease">Disease&ensp;</Link></li>
              <li><Link to="/feedback">Feedback&ensp;</Link></li>
            </ul>
          </div>
        </div>
        <div className="banner">
          Banner
        </div>
        <div className="main">
          {renderMainContent()}
        </div>
        <div className="right-aside">Right Aside</div>
        <div className="low-content">Low Content</div>
        <div className="footer">
            <Footer/>
        </div>
      </div>
    </>
  )
}

export default Home;
