import "../css/colors.css";
import "../css/DynamicList.css";
interface props {
  listProper: string[];
  listTitle: string;
}
function DynamicList({ listProper = ["Err. No Content Provided"], listTitle = "Err. No Title Provided" }: props) {
  return (
    <>
      <div className="list-card">
        <h1>{listTitle}</h1>
        <ul>
        {listProper.map((item) => (
          <li className="card-li-flex" key={item}>{item} <span className="card-button-flex"><button>Edit</button> <button>Delete</button></span></li>
        ))}
        </ul>
        
      </div>
    </>
  );
}
export default DynamicList;
