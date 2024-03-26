import Minigreeter from "../components/Minigreeter";
import { useNavigate } from "react-router-dom";

function AddMealPage() {
    const navigate = useNavigate();
  return (
    <>
      <Minigreeter label="Add a Meal: "></Minigreeter>
      <div>
        <button onClick={()=>{
            navigate(-1) 
            // Go back to previous page (-1) goes to previous in react app history
        }}>Go Back</button>
      </div>
    </>
  );
}
export default AddMealPage;
