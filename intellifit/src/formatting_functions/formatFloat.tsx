function formatFloat(num : number){
    const originalVal = num;
    const formattedVal = parseFloat(originalVal.toFixed(2));
    return formattedVal;
}
export default formatFloat;