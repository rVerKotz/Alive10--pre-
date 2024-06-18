import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hamburger } from './Hamburger';
import List from './List';
import Footer from './Footer';
import data from '../assets/Disease.json';

function SearchBar(search: string, text: string): string {
    const regex = new RegExp(search, 'gi');
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
}

function Disease() {
  const [search, setSearches] = useState("");
  const [highlighted, setHighlight] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.preventDefault();
    if (!search.trim()) {
      return;
    }

    const concatenatedTexts = data.map(disease => {
        return `${disease.title} ${disease.gejala} ${disease.penyebab} ${disease.pengobatan}`;
    }).join(' ');

    const highlight = SearchBar(search, concatenatedTexts);
    setHighlight(highlight);
    setPopupVisible(true);

    const element = document.querySelector('mark');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearches(event.target.value);
    if (event.target.value === "") {
      setPopupVisible(false);
    } else {
      setPopupVisible(true);
    }
  };

  const handleItemClick = (disease: any) => {
    setHighlight(`
      <h1>${disease.title}</h1>
      <p><strong>Gejala:</strong> ${disease.gejala}</p>
      <p><strong>Penyebab:</strong> ${disease.penyebab}</p>
      <p><strong>Pengobatan:</strong> ${disease.pengobatan}</p>
    `);
    setPopupVisible(false);
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
                onKeyDown={(event) => { if (event.key === "Enter") handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>) }}
                name='search'
                placeholder="Search.."
              />
              <img src="search.svg" onClick={handleSubmit} />&ensp;
            </form>
          </Hamburger>
          {isPopupVisible && <List input={search} text={highlighted} onItemClick={handleItemClick} />}
        </div>
        <div className="left-aside">
          <div className='sidebar'>
            <p>Links</p>
            <ul>
              <li><Link to="/">Home&ensp;</Link></li>
              <li><Link to="/disease">Disease&ensp;</Link></li>
              <li><Link to="/feedback">Feedback&ensp;</Link></li>
            </ul>
          </div>
        </div>
        <div className="banner">
          Banner
        </div>
        <div className="main">
          <div dangerouslySetInnerHTML={{ __html: highlighted || data.map(disease => `
            <h2>${disease.title}</h2>
            <p><strong>Gejala:</strong> ${disease.gejala}</p>
            <p><strong>Penyebab:</strong> ${disease.penyebab}</p>
            <p><strong>Pengobatan:</strong> ${disease.pengobatan}</p>
          `).join('') }}></div>
        </div>
        <div className="right-aside">Right Aside</div>
        <div className="low-content">Low Content</div>
        <div className="footer">
            <Footer />
        </div>
      </div>
    </>
  )
}

export default Disease;