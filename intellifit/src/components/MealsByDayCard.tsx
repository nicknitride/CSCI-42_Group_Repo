import "../css/MealsByDayCard.css";
import formatFloat from "../formatting_functions/formatFloat";
import "../css/animations_transitions.css";
interface props {
  title: string;
  content: string;
  infolabel: string;
  deleteHandler: (date: string) => void;
  editHandler: (msg: string) => void;
}

function MealsByDayCard(
  {
    title = "Err. No Title",
    content = "Err. No Content",
    infolabel,
    deleteHandler,
    editHandler,
  }: props,
  passedKey?: React.Key
) {
  return (
    <>
      <div className="one-item-card short-fade-in">
        <h1>{title}</h1>
        <p key={passedKey}>
          {infolabel && <span>{infolabel}</span>}
          {formatFloat(parseFloat(content))}
        </p>
        <div className="two-button-flex">
          <button
            onClick={() => {
              editHandler("edit clicked");
            }}
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => {
              deleteHandler(infolabel);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default MealsByDayCard;
