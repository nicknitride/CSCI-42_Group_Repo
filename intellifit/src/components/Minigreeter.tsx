import "../css/colors.css"
import "../css/Minigreeter.css"
interface props{
    label: string;
}
function Minigreeter({label}: props){
    return(
        <>
        <h1 className="greeter">{label}</h1>
        </>
    );
}
export default Minigreeter;