import DynamicList from "../components/DynamicList";
import Minigreeter from "../components/Minigreeter";

const testList = ["Carrots - 100g", "Veal - 200g"];
const testList2 = ["Apples - 100g", "Burrito - 200g","Corn Bread - 400g"];


function Home(){
    return(
        <>
        <Minigreeter label="Home Dashboard: "></Minigreeter>
        <DynamicList listProper={testList} listTitle="Morning Meal"></DynamicList>
        <DynamicList listProper={testList2} listTitle="Afternoon Meal"></DynamicList>

        </>
    );
}
export default Home;