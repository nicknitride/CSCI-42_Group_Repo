import "../css/MealsByDayCard.css";
interface props {
  title: string;
  content: string;
  infolabel: string;
  deleteHandler: (date : string) => void;
}

function MealsByDayCard({
  title = "Err. No Title",
  content = "Err. No Content",
  infolabel, deleteHandler
}: props, passedKey? :React.Key) {
  return (
    <>
      <div className="one-item-card">
        <h1>{title}</h1>
        <p key={passedKey}>
          {infolabel && <span>{infolabel}</span>}
          {content}
        </p> <button onClick={()=>{
          deleteHandler(infolabel)
        }}>Delete</button>
      </div>
    </>
  );
}

export default MealsByDayCard;
