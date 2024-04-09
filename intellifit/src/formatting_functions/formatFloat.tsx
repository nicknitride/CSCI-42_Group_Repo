function formatFloat(num : number){
    const originalVal = num;
    const formattedVal = parseFloat(originalVal.toFixed(2));
    return formattedVal;
}

export function multiplyFormatTwoFloats(num:number, num2:number){
    const product = num*num2;
    const formattedVal = parseFloat(product.toFixed(2));
    return formattedVal
}

export function specifyDecimalPlaces(num:number, decPlaces: number){
    const val = num;
    const formattedVal = parseFloat(val.toFixed(decPlaces))
    return formattedVal;
}
export default formatFloat; 