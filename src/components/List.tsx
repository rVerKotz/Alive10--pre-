import data from "../assets/Disease.json";

interface Disease {
  id: number;
  title: string;
  gejala: string;
  penyebab: string;
  pengobatan: string;
}

function List(props: {
  input: string;
  text: string;
  onItemClick: (disease: Disease) => void;
}) {
  const filteredData = data.filter((el: Disease) => {
    const searchString = `${el.title} ${el.gejala}`.toLowerCase();
    return searchString.includes(props.input.toLowerCase());
  });

  const handleClick = (disease: Disease) => {
    props.onItemClick(disease);
  };

  const renderTextMatches = () => {
    const { input, text } = props;
    const lowerInput = input.toLowerCase();
    const lowerText = text.toLowerCase();

    let items: JSX.Element[] = [];
    let startIndex = lowerText.indexOf(lowerInput);

    while (startIndex !== -1) {
      while (startIndex > 0 && lowerText[startIndex - 1] !== '\n'){
        startIndex--;
      }
      let endIndex = startIndex + 50;
      if (endIndex >= lowerText.length) {
        endIndex = lowerText.length;
      } else {
        while (endIndex < lowerText.length && lowerText[endIndex] !== '.') {
          endIndex++;
        }
      }

      const displayText = text[startIndex].toUpperCase() + text.substring(startIndex + 1, endIndex);
      items.push(
        <li key={`text-item-${startIndex}`}>
          <strong>Text Match:</strong> {displayText}
        </li>
      );

      startIndex = lowerText.indexOf(lowerInput, endIndex);
    }

    return items;
  };

  const renderListItems = () => {
    let items: JSX.Element[] = [];

    filteredData.forEach((item: Disease) => {
      items.push(
        <li key={item.id} onClick={() => handleClick(item)}>
          <strong>{item.title}</strong>: {item.gejala}
        </li>
      );
    });

    items.push(...renderTextMatches());

    return items;
  };

  return <ul className="popup-list">{renderListItems()}</ul>;
}

export default List;