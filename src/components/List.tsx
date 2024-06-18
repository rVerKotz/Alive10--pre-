import data from "../assets/Disease.json";

function List(props: {
  input: string;
  text: string;
  onItemClick: (disease: any) => void;
}) {
  const filteredData = data.filter((el) => {
    const searchString = `${el.title} ${el.gejala} ${el.penyebab} ${el.pengobatan}`.toLowerCase();
    return searchString.includes(props.input.toLowerCase());
  });

  const handleClick = (disease: any) => {
    props.onItemClick(disease);
  };

  return (
    <ul className="popup-list">
      {filteredData.map((item) => (
        <li key={item.id} onClick={() => handleClick(item)}>
          <strong>{item.title}</strong>: {item.gejala}
        </li>
      ))}
    </ul>
  );
}

export default List;