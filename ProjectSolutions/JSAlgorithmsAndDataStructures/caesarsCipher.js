function rot13(str) {
  let strArray = [...str];
  let rot13Array = [];

  for (let i = 0; i < strArray.length; i++) {
    if (strArray[i].charCodeAt(0) >= 65 && strArray[i].charCodeAt(0) <= 90) {
      rot13Array.push(
        String.fromCharCode((strArray[i].charCodeAt(0) % 26) + 65)
      );
    } else {
      rot13Array.push(strArray[i]);
    }
  }

  return rot13Array.join("");
}

rot13("SERR PBQR PNZC");