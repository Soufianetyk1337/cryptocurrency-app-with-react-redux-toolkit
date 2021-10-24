  export const isPositive = (value) => {
    if(value ==='undefined') return;
    let temp = "";
    if (typeof value === "string") {
      temp = value;
    }
    if (typeof value !== "string") {
      temp = JSON.stringify(value);
    }
    let characters = temp.split("");
    return characters[0] !== "-";
  };
